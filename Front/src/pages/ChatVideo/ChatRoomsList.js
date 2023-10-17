import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs"; // 변경된 import 경로
import { useLocation, Link } from "react-router-dom";
import styled, { keyframes } from 'styled-components';

function ChatRoomsList(props) {
  const { boardId, onClose } = props;  // props에서 onClose를 추가로 추출
  const REACT_APP_CHAT_URL = process.env.REACT_APP_CHAT_URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const accessToken = localStorage.getItem("accessToken");
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    loadChatRooms();
    setupWebSocket();
  }, []);

  const loadNonReadCount = async (roomId) => {
    try {
      const response = await fetch(
        `${REACT_APP_CHAT_URL}/api/chat/room/${roomId}/nonreadcount`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      const nonReadCount = await response.json();
      return nonReadCount;
    } catch (error) {
      console.log("Error loading non-read count", error);
      return 0;
    }
  };

  const loadLastMessage = async (roomId) => {
    try {
      const response = await fetch(
        `${REACT_APP_CHAT_URL}/api/chat/room/${roomId}/lastmessage`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      const data = await response.json();
      return { message: data.message, createdDate: data.createdDate }; // createdDate 정보도 반환
    } catch (error) {
      console.log("Error loading last message", error);
      return { message: "", createdDate: null };
    }
};

const calculateDday = (scheduledDate) => {
  const now = new Date();
  const scheduleDate = new Date(scheduledDate);
  const difference = scheduleDate - now;
  const daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));
  return daysDifference;
};

const getFormattedDate = (inputDate) => {
  const date = new Date(inputDate);
  const today = new Date();

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('ko-KR', options);
  } else {
    return `${date.getFullYear() - 2000}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  }
};



  const loadChatRooms = async () => {
    try {
      const response = await fetch(`${REACT_APP_CHAT_URL}/api/chat/rooms/${boardId}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const data = await response.json();

      // 비동기 함수들로 데이터를 미리 가져온 후 chatRooms 상태를 설정합니다.
      const chatRoomsData = await Promise.all(
        data.map(async (room) => {
          const nonReadCount = await loadNonReadCount(room.id);
          const lastMessageData = await loadLastMessage(room.id);
          return { 
            ...room, 
            nonReadCount, 
            lastMessage: lastMessageData.message,
            createdDate: lastMessageData.createdDate,
            yourNickName: room.yourNickName,
            yourImg: room.yourImg || "/assets/free-icon-user-847969.png"
          };
        })
    );

    const sortedChatRoomsData = chatRoomsData.sort((a, b) => {
      // 먼저 schedule이 true인 경우를 체크
      if (a.schedule && !b.schedule) return -1;
      if (!a.schedule && b.schedule) return 1;
    
      // schedule이 둘 다 false인 경우 createdDate 기준으로 정렬
      if (!a.schedule && !b.schedule) {
        return new Date(b.createdDate) - new Date(a.createdDate);
      }
      
      return 0; // 기본값은 순서 변경 없음
    });
    
    setChatRooms(sortedChatRoomsData);

    


    } catch (error) {
      setChatRooms([]);
    }
  };

  const setupWebSocket = () => {
    // 웹소켓 연결 설정
    const socket = new SockJS(
      `${REACT_APP_CHAT_URL}/ws/chat?token=` + accessToken
    );
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      { Authorization: "Bearer " + accessToken },
      function () {
        // 채팅방 업데이트에 대한 주제를 구독
        stompClient.subscribe("/topic/rooms/update", function () {
          loadChatRooms(); // 채팅방 리스트를 다시 로드
        });
      }
    );
  };

  return (
    <ChatRoomsContainer>
         <HeaderContainer>
            <h3>채팅 상담 목록</h3>
            <ButtonContainer>
                <Reloadbutton id="refreshRooms" onClick={loadChatRooms} />
                <CloseButton onClick={onClose}>닫기</CloseButton>  {/* 버튼 클릭시 onClose 함수 호출 */}
            </ButtonContainer>
        </HeaderContainer>
        <div id="chatRoomsList">
      {chatRooms.map((room) => (
          <Link 
          to={`/adopt/chatroom/${room.id}?boardId=${boardId}`} 
          style={{textDecoration: 'none', color: 'inherit'}}
          >

              <ChatRoomBox key={room.id} schedule={room.schedule}>
                  <UserImage src={room.yourImg} alt={`${room.yourNickName}'s image`} /> {/* Image 추가 */}
                  
                  <TopContainer>
    <div>
        <span>{room.yourNickName}</span>
        {room.nonReadCount > 0 && (
            <span className="unread-count"> ({room.nonReadCount})</span>
        )}
    </div>
    <div className="created-date">{getFormattedDate(room.createdDate)}</div>
</TopContainer>

<BottomContainer>
<div className="last-message">{room.lastMessage}</div>
                  {room.schedule && (
              <div className="dday">
              {
                calculateDday(room.scheduledDate) < 0 
                  ? `D+${Math.abs(calculateDday(room.scheduledDate))}` 
                  : `D-${calculateDday(room.scheduledDate)}`
              }
            </div>
            )}
</BottomContainer>
              </ChatRoomBox>
              </Link>
      ))}
  </div>
    </ChatRoomsContainer>
);

}

export default ChatRoomsList;

const ChatRoomBox = styled.div`
border: 1px solid #e1e1e1;
padding: 1vh;
margin: 1vh 1vh;
border-radius: 8px;
background-color: ${props => props.schedule ? "#FFE7BA" : "#D8D8D8"}; // schedule 값에 따른 조건부 배경색 설정
transition: background-color 0.3s;
&:hover {
  background-color: ${props => props.schedule ? "#FAAC58" : "#e6e6e6"}; // schedule 값에 따른 조건부 배경색 설정
}

    a {
        text-decoration: none;
        color: #333;
        font-weight: 500;
        font-size: 1.1em;
    }

    .unread-count {
        color: red;
        font-weight: bold;
        margin-left: 5px;
    }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ChatRoomsContainer = styled.div`
  animation: ${fadeIn} 1s;
  width: 400px; // 원하는 너비 설정
  height: 600px; // 원하는 높이 설정
  overflow-y: auto; // 내용이 넘치면 스크롤 표시
  border-radius: 10px; // 모달 창 모서리 둥글게 설정 (선택 사항)
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); // 모달 창에 그림자 효과 추가 (선택 사항)
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Reloadbutton = styled.button`
  background-image: url('/assets/chatimg/reload.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: transparent; // 배경색을 제거
  border: none;
  width: 3vh; // 원하는 크기로 조절
  height: 3vh; // 원하는 크기로 조절
  cursor: pointer;

  &:hover, &:focus {
    background-color: white; // 만약 transparent가 작동하지 않을 때 흰색으로 변경
  }
`;

const CloseButton = styled.button`
  margin-left: 10px;  // ReloadButton과의 간격 조절
  background-color: transparent;
  border: none;
  color: #333;  // 원하는 색상으로 변경 가능
  cursor: pointer;

  &:hover, &:focus {
    text-decoration: underline; // hover 시 밑줄 표시
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1vh; // 필요에 따라 조절 가능
`;


const UserImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%; // 이미지를 원형으로 표시
    margin-right: 10px; // 이미지와 닉네임 사이의 간격
    float: left; // 왼쪽 정렬
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .created-date {
    font-size: 0.8em;
    color: #aaa;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .last-message {
    margin-top: 5px;
    font-size: 0.9em;
    color: #555;
}
.dday {
  font-weight: bold;
  color: red; // 또는 원하는 색상
}
`;