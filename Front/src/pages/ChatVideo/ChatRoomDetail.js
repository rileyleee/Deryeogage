import React, { useState, useEffect } from "react";
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

  const loadRoomInfo = () => {
    axios
      .get("http://localhost:8080/api/chat/room/" + roomId, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        const data = response.data;
        setRoomInfo(
          data.roomName +
            " (" +
            data.createdDate +
            " - " +
            data.updatedDate +
            ")"
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
      .get("http://localhost:8080/api/chat/room/" + roomId + "/messages", {
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
    // 웹소켓 연결 설정
    const socket = new SockJS(
      "http://localhost:8080/ws/chat?token=" + accessToken,
      null,
      { headers: { Authorization: "Bearer " + accessToken } }
    );
    const client = Stomp.over(socket);
    client.connect(
      {},
      function () {
        console.log("WebSocket connected.");
        client.subscribe("/topic/messages", function (message) {
          loadMessages();
          console.log("Received message:", message.body); // 메시지를 콘솔에 출력
          try {
            //const body = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, message.body]);
          } catch (error) {
            console.error("Failed to parse message:", error);
          }
        });
      },
      function (error) {
        console.error("WebSocket connection failed:", error);
        // 연결 실패 시 재연결
        setTimeout(setupWebSocket, 5000); // 5초 후에 재시도
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
      console.log("Socket is not connected. Reconnecting...");
      setupWebSocket();
    }

    if (stompClient.connected) {
      stompClient.publish({
        destination: "/app/message",
        body: JSON.stringify(chatMessage),
        headers: { Authorization: "Bearer " + accessToken },
      });
    }

    setMessageInput("");
  };

  return (
    <div>
      <div id="roomInfo">{roomInfo}</div>

      {messages.length > 0 ? (
        <MessageList>
          {messages.map((message, index) => (
            <MessageItem
              key={index}
              rightAlign={message.userId === currentUserId}
            >
              <NickName>{message.nickName}</NickName>
              <MessageText>{" " + message.message}</MessageText>
              <MessageTime rightAlign={message.userId === currentUserId}>
              {message.createdDate}
              </MessageTime>
            </MessageItem>
          ))}
        </MessageList>
      ) : (
        <p>No messages yet.</p>
      )}
      <MessageInput
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type your message..."
      />
      <SendButton onClick={sendMessage}>Send</SendButton>
    </div>
  );
}

export default ChatRoomDetail;

const MessageList = styled.ul`
  max-height: 73vh; // 원하는 높이 설정
  overflow-y: auto; // 내용이 높이를 초과할 경우 스크롤 생성
  list-style: none;
  padding: 0;
`;

const MessageItem = styled.li`
  text-align: ${(props) => (props.rightAlign ? "right" : "left")};
  display: block;
  border: 1px solid;
  border-radius: 30px;
  margin: 1vh;
  padding: 1vh;
  color: gray;
  word-wrap: break-word;
  max-width: 70%;
  margin-left: ${(props) => (props.rightAlign ? "auto" : "0")};
  margin-right: ${(props) => (props.rightAlign ? "0" : "auto")};
  background-color: ${(props) =>
    props.rightAlign ? "#e6f7ff" : "#f9e0e0"}; // Add this line
  display: flex;
  flex-direction: ${(props) => (props.rightAlign ? "row-reverse" : "row")};
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
