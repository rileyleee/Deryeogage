// 내 채팅  내역

import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs"; // 변경된 import 경로
import { useLocation, Link } from "react-router-dom";
import * as S from "../../styled/User/MyChat.style"

function MyChat(props) {
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
      const response = await fetch(`${REACT_APP_CHAT_URL}/api/chat/rooms`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const data = await response.json();
      console.log("chatrooms : ",data);

      // 비동기 함수들로 데이터를 미리 가져온 후 chatRooms 상태를 설정합니다.
      const chatRoomsData = await Promise.all(
        data.map(async (room) => {
          const nonReadCount = await loadNonReadCount(room.id);
          const lastMessageData = await loadLastMessage(room.id);
          console.log(room);
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

    const sortedChatRoomsData = groupAndSortChatRooms(chatRoomsData);
    setChatRooms(sortedChatRoomsData);
    } catch (error) {
      console.log("Error", error);
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


  const groupAndSortChatRooms = (chatRooms) => {
    const grouped = {};
  
    chatRooms.forEach((room) => {
      if (!grouped[room.boardId]) {
        grouped[room.boardId] = [];
      }
      grouped[room.boardId].push(room);
    });
  
    const sortedGroups = [];
    for (const boardId in grouped) {
      const group = grouped[boardId];
      group.sort((a, b) => {
        // 기존 로직 유지
      });
      group[0].isGroupStart = true; // 첫 번째 채팅방에 isGroupStart 플래그 설정
      sortedGroups.push(group);
    }
  
    return sortedGroups.flat();
  };

  return (
  <div className="container">
    <S.BoardRow className="list d-flex justify-content-between">
      <div>채팅 상담 목록</div>
      <div className="d-flex">
        <div><S.Reloadbutton id="refreshRooms" onClick={loadChatRooms}/></div>
        <div><S.CloseButton onClick={onClose}>닫기</S.CloseButton></div>
      </div>
    </S.BoardRow>
    <S.ScrollBar>
      {chatRooms.map((room) => (
        <S.BoardRow className="box item" key={room.id}>
          {/* isGroupStart가 true일 경우 roomName 표시 */}
          {room.isGroupStart && <S.RoomName>{room.roomName}</S.RoomName>}
          
          <Link 
            to={`/adopt/chatroom/${room.id}?boardId=${room.boardId}`} 
            style={{textDecoration: 'none', color: 'inherit'}}
          >
            <S.ChatRoomBox key={room.id} schedule={room.schedule}>
              <S.UserImage src={room.yourImg} alt={`${room.yourNickName}'s image`} />
              
              <S.TopContainer>
                <div>
                  <span>{room.yourNickName}</span>
                  {room.nonReadCount > 0 && (
                    <span className="unread-count"> ({room.nonReadCount})</span>
                  )}
                </div>
                <div className="created-date">{getFormattedDate(room.createdDate)}</div>
              </S.TopContainer>

              <S.BottomContainer>
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
              </S.BottomContainer>
            </S.ChatRoomBox>
          </Link>
        </S.BoardRow>
      ))}
    </S.ScrollBar>
  </div>
);
                  }

export default MyChat;