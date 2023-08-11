import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp, CompatClient } from "@stomp/stompjs";
import axios from "axios"; // axios 불러오기
import styled from "styled-components";
import { PiPawPrintFill } from "react-icons/pi";

function ChatRoomDetail() {
  const REACT_APP_CHAT_URL = process.env.REACT_APP_CHAT_URL

  const accessToken = localStorage.getItem("accessToken");
  const [roomInfo, setRoomInfo] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const {roomId} = useParams();
  const [stompClient, setStompClient] = useState(null);

  const [myNickName, setMyNickName] = useState("");
  const [yourNickName, setYourNickName] = useState("");
  const [yourImg, setYourImg] = useState("");

  const [isConnected, setIsConnected] = useState(false); // 웹소켓 연결 상태를 관리

  // 검색 기능 관련 상태
  const [searchMode, setSearchMode] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [highlightedMessageIndex, setHighlightedMessageIndex] = useState(null);
  const messageListRef = useRef(null);
  const messageInputRef = useRef(null);
  const searchInputRef = useRef(null);

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

  useEffect(() => {
    if (searchMode && searchInputRef.current) {
        searchInputRef.current.focus();
    }
}, [searchMode]);

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
      .get(`${REACT_APP_CHAT_URL}/api/chat/room/` + roomId, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        const data = response.data;
        setMyNickName(data.myNickName);
        setYourNickName(data.yourNickName);
        setYourImg(data.yourImg || "/assets/free-icon-user-847969.png");
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
      .get(`${REACT_APP_CHAT_URL}/api/chat/room/` + roomId + "/messages", {
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
    if (stompClient && stompClient.connected) { 
      return;
    }
    
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
      }
    );

    // 웹소켓 연결이 종료되면 재연결을 시도합니다.
    client.onDisconnect = function () {
      console.log("WebSocket disconnected. Trying to reconnect...");
      setIsConnected(false);
      setTimeout(setupWebSocket, 3000);
    };
    
    setStompClient(client);
};


  const sendMessage = () => {
    if (!messageInput.trim()) return;
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
    if (e.key === 'Enter') {
      sendMessage();
      e.preventDefault(); // Enter 키로 인한 form 제출 방지
    }
  };

  const formatDate = (createdDate) => {
    const date = new Date(createdDate);
    const year = date.getFullYear() - 2000; // 2000을 빼서 2자리 연도만 표시
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  const scrollToMessage = (index) => {
    const targetMessage = document.querySelector(
      `.message-content[data-index="${index}"]`
    );
    if (targetMessage) {
      targetMessage.scrollIntoView();
    }
  };

  const handleSearchClick = () => {
    setSearchMode(true);
  };
  
  
  const handleSearchExit = () => {
    setHighlightedMessageIndex(null);  // 빨간색으로 표시된 메시지 색상을 원래대로 돌리기 위한 상태 업데이트
    setSearchMode(false);
};

  const handleSearchInput = (e) => {
    const newSearchInput = e.target.value;
    if (newSearchInput !== searchInput) { // 검색어가 변경되었는지 확인
      setHighlightedMessageIndex(null); // 변경되었다면 highlightedMessageIndex 초기화
    }
    setSearchInput(newSearchInput);
  };
  
  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      let searchFromIndex = highlightedMessageIndex !== null ? highlightedMessageIndex - 1 : messages.length - 1; // 기본 검색 시작 지점 설정
      for (let i = searchFromIndex; i >= 0; i--) {
        if (messages[i].message.includes(searchInput)) {
          setHighlightedMessageIndex(i);
          scrollToMessage(i);
          break;
        }
      }
    }
  };

  return (
    <div className="d-flex flex-column justify-content-between">
      <div>
      {!searchMode ? (
    <div className="d-flex justify-content-between">
      <div id="roomInfo">{roomInfo}</div>
      <SearchButton onClick={handleSearchClick} />
    </div>
) : (
          <div className="d-flex justify-content-between">
            <input
  type="text"
  ref={searchInputRef}  // <-- Add this line
  value={searchInput}
  onChange={handleSearchInput}
  onKeyPress={handleSearchEnter}
  placeholder="Search messages..."
/>
            <ExitButton onClick={() => {
              setSearchMode(false);
              handleSearchExit();}
              }></ExitButton>
          </div>
        )}
      {messages.length > 0 ? (
        <MessageList ref={messageListRef}> {/* ref 속성 추가 */}
        {messages.map((message, index) => {
  const showTime =
    index === messages.length - 1 ||
    formatMessageTime(message.createdDate) !==
      formatMessageTime(messages[index + 1]?.createdDate);
  
  const isNewDate =
    index === 0 ||
    formatDate(message.createdDate) !==
      formatDate(messages[index - 1]?.createdDate);
  
  // 닉네임을 표시해야 하는지 판별하는 새로운 조건을 추가합니다.
  const showNickName = 
    message.userId !== currentUserId &&
    (index === 0 ||
    formatMessageTime(message.createdDate) !==
      formatMessageTime(messages[index - 1]?.createdDate) ||
    messages[index - 1]?.userId === currentUserId);


  return (
    <>
      {isNewDate && <DateIndicator>{formatDate(message.createdDate)}</DateIndicator>}
      {showNickName && (
  <>
    <UserImage src={yourImg} alt="user" />
    <NickName>{yourNickName}</NickName>
  </>
)}
      <MessageItem
        key={index}
        rightAlign={message.userId === currentUserId}
      >
            <MessageContent
  className="message-content"
  data-index={index}  // 인덱스 속성 추가
  key={index}
  rightAlign={message.userId === currentUserId}
>
  
  <MessageText 
    highlighted={index === highlightedMessageIndex}
  >
    {" " + message.message}
  </MessageText>
</MessageContent>
            {showTime && (
              <MessageTime rightAlign={message.userId === currentUserId}>
                {formatMessageTime(message.createdDate)}
              </MessageTime>
            )}
          </MessageItem>
        </>
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
      onKeyPress={handleKeyPress}
    />
    <SendButton onClick={sendMessage} disabled={!messageInput}>
      <PiPawPrintFill size={35} /> {/* 아이콘 크기를 원하는 대로 조절할 수 있습니다 */}
    </SendButton>
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
  margin-left: ${(props) => (props.rightAlign ? "0" : "4vh")};
  margin-right: ${(props) => (props.rightAlign ? "4vh" : "0")};
  word-break: break-all;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid;
  border-radius: 30px;
  padding: 0.5vh;
  color: gray;
  word-break: break-all;  // 이 줄을 추가
  background-color: ${(props) =>
    props.rightAlign ? "#e6f7ff" : "#f9e0e0"};
    max-width: 70%;
`;


const NickName = styled.span`
  font-size: 0.8rem;   // 글자 크기 조정
  color: black; 
  margin-right: 0.5rem;  // 오른쪽 여백 추가
  display: inline-block;  // 인라인 블록으로 변경
`;

const MessageText = styled.span`
  color: ${props => props.highlighted ? "red" : "gray"};
  word-break: break-all;
`;

const MessageTime = styled.small`
  font-size: 0.5rem;   // 글자 크기를 0.8rem으로 설정
  color: gray;
  align-self: flex-end;
  margin-left: ${(props) => (props.rightAlign ? "0" : "0.5rem")};
  margin-right: ${(props) => (props.rightAlign ? "0.5rem" : "0")};
`;


const MessageInput = styled.input`
  width: 80%;
  padding: 5px;
`;

const SendButtonIcon = styled(PiPawPrintFill)`
  color: white;
  font-size: 20px;
`;

const SendButton = styled.button`
  background-color: transparent; // 배경을 투명하게 설정
  border: none; // 기본 버튼 테두리 제거
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  color: ${props => props.disabled ? "#e0e0e0" : "#FF8000"}; // 아이콘 색상 조절
`;


const DateIndicator = styled.div`
  width: 100%;
  text-align: center;
  margin: 10px 0;
  color: gray;
  font-weight: bold;
`;

const UserImage = styled.img`
  width: 40px;  // 원하는 사이즈로 조절
  height: 40px;
  border-radius: 50%;  // 동그란 형태를 만들기 위해
  margin-right: 5px;  // 오른쪽 여백 추가
`;

const SearchButton = styled.button`
  background-image: url('/assets/search.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: transparent; // 배경색을 제거
  border: none;
  width: 30px; // 원하는 크기로 조절
  height: 30px; // 원하는 크기로 조절
  cursor: pointer;

  &:hover, &:focus {
    background-color: white; // 만약 transparent가 작동하지 않을 때 흰색으로 변경
  }
`;

const ExitButton = styled.button`
  background-image: url('/assets/cancel.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: transparent; // 배경색을 제거
  border: none;
  width: 30px; // 원하는 크기로 조절
  height: 30px; // 원하는 크기로 조절
  cursor: pointer;

  &:hover, &:focus {
    background-color: white; // 만약 transparent가 작동하지 않을 때 흰색으로 변경
  }
`;