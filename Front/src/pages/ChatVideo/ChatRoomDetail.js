import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp, CompatClient } from "@stomp/stompjs";
import axios from "axios"; // axios 불러오기
import styled from "styled-components";

function ChatRoomDetail() {
  const accessToken = localStorage.getItem("accessToken");
  const [roomInfo, setRoomInfo] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const { roomId } = useParams();
  const [stompClient, setStompClient] = useState(null);

  const [myNickName, setMyNickName] = useState("");
  const [yourNickName, setYourNickName] = useState("");

  const [isConnected, setIsConnected] = useState(false); // 웹소켓 연결 상태를 관리

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL
  const REACT_APP_CHAT_URL = process.env.REACT_APP_CHAT_URL

  const messageListRef = useRef(null);
  const messageInputRef = useRef(null);
  useEffect(() => {
    // messages가 변경될 때마다 실행되는 useEffect
    if (messageListRef.current) {
      const element = messageListRef.current;
      element.scrollTop = element.scrollHeight; // 스크롤을 맨 아래로 이동
    }
  }, [messages]); // messages 배열이 변경될 때마다 실행



  useEffect(() => {
    loadRoomInfo();
    loadMessages();
    setupWebSocket();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  // createdDate에서 시간 부분을 추출하여 "오전/오후 시:분" 형식으로 반환
const formatMessageTime = (createdDate) => {
  const date = new Date(createdDate);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  if (hours < 12) {
    return `오전 ${hours}:${formattedMinutes}`;
  } else if (hours === 12) {
    return `오후 12:${formattedMinutes}`;
  } else {
    return `오후 ${hours - 12}:${formattedMinutes}`;
  }
};

  const loadRoomInfo = () => {
    axios
      .get(`${REACT_APP_API_URL}/chat/room/` + roomId, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        const data = response.data;
        setMyNickName(data.myNickName);
        setYourNickName(data.yourNickName);
        setRoomInfo(
          data.roomName
        );
      })
      .catch((error) => {
        console.log("Error loading room info", error);
      });
  };

  // 토큰에서 payload 추출
  const decodedPayload = JSON.parse(atob(accessToken.split(".")[1]));

  // 사용자의 id를 반환
  const currentUserId = decodedPayload.userId;

  const loadMessages = () => {
    axios
      .get(`${REACT_APP_API_URL}/chat/room/` + roomId + "/messages", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log("Error loading messages", error);
      });
  };

  const setupWebSocket = () => {
    if (stompClient && stompClient.connected) { // 이미 연결된 경우 연결하지 않기
      return;
    }
    // 웹소켓 연결 설정
    const socket = new SockJS(
      `${REACT_APP_CHAT_URL}/ws/chat?token=` + accessToken,
      null,
      { headers: { Authorization: "Bearer " + accessToken } }
    );
    const client = Stomp.over(socket);
    client.connect(
      {},
      function () {
        console.log("WebSocket connected.");
        setIsConnected(true);
        client.subscribe("/topic/messages", function (message) {
          //loadMessages();
          try {
            const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        } catch (error) {
            console.error("Failed to parse message:", error);
        }
        
        });        
      },
      function (error) {
        console.error("WebSocket connection failed:", error);
        setIsConnected(false);
        setTimeout(setupWebSocket, 5000);
      }
    );

    setStompClient(client);
  };

  const sendMessage = () => {
    const message = messageInput;
    const chatMessage = {
      message: message,
      chatRoom: { id: roomId },
    };

    if (!stompClient || !stompClient.connected) {
      // 소켓 연결이 없거나 연결되어 있지 않다면 재연결
      if (!isConnected) {
        console.log("Socket is not connected. Reconnecting...");
        setupWebSocket();
      }
    }

    if (stompClient.connected) {
      stompClient.publish({
        destination: "/app/message",
        body: JSON.stringify(chatMessage),
        headers: { Authorization: "Bearer " + accessToken },
      });
    }
    setMessageInput("");
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && messageInput.trim() !== '') {
      sendMessage();
      e.preventDefault(); // Enter 키로 인한 form 제출 방지
    }
  };


  return (
    <div className="d-flex flex-column justify-content-between">
      <div>
      <div id="roomInfo">{roomInfo}</div>
      <RoomInfo>
        <div>{yourNickName}</div>
        <div>{myNickName}</div>
      </RoomInfo>

      {messages.length > 0 ? (
        <MessageList ref={messageListRef}> {/* ref 속성 추가 */}
        {messages.map((message, index) => {
          const showTime =
            index === messages.length - 1 ||
            formatMessageTime(message.createdDate) !==
              formatMessageTime(messages[index + 1]?.createdDate);
      
          return (
            <MessageItem
              key={index}
              rightAlign={message.userId === currentUserId}
            >
              <MessageContent
                key={index}
                rightAlign={message.userId === currentUserId}
              >
                <MessageText>{" " + message.message}</MessageText>
                
              </MessageContent>
              {showTime && (
                  <MessageTime rightAlign={message.userId === currentUserId}>
                    {formatMessageTime(message.createdDate)}
                  </MessageTime>
                )}
            </MessageItem>
          );
        })}
      </MessageList>
      ) : (
        <p>No messages yet.</p>
      )}
      </div>
      <div>
        <div className="d-flex justify-content-around">
      <MessageInput
  type="text"
  value={messageInput}
  onChange={(e) => setMessageInput(e.target.value)}
  onKeyPress={handleKeyPress} // 여기에 추가
  placeholder="Type your message..."
/>
      <SendButton onClick={sendMessage}>Send</SendButton>
      </div>
    </div>
  </div>
  );
}

export default ChatRoomDetail;

const MessageList = styled.ul`
  height: 73vh; // 원하는 높이 설정
  overflow-y: auto; // 내용이 높이를 초과할 경우 스크롤 생성
  list-style: none;
  padding: 0;
`;

const MessageItem = styled.li`
  text-align: ${(props) => (props.rightAlign ? "right" : "left")};
  display: flex;
  flex-direction: ${(props) => (props.rightAlign ? "row-reverse" : "row")}; // 추가
  border-radius: 30px;
  padding: 0.5vh;
  word-wrap: break-word;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid;
  border-radius: 30px;
  padding: 0.5vh;
  color: gray;
  word-wrap: break-word;
  background-color: ${(props) =>
    props.rightAlign ? "#e6f7ff" : "#f9e0e0"};
`;

const NickName = styled.span`
  font-weight: bold;
  color: black; // 원하는 색상
`;

const MessageText = styled.span`
  color: gray;
`;

const MessageTime = styled.small`
  color: gray;
  align-self: flex-end;
  margin-left: ${(props) => (props.rightAlign ? "0" : "1rem")};
  margin-right: ${(props) => (props.rightAlign ? "1rem" : "0")};
`;

const MessageInput = styled.input`
  width: 80%;
  padding: 5px;
`;

const SendButton = styled.button`
  padding: 5px 10px;
`;

const RoomInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
