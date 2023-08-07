import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs"; // 변경된 import 경로

function ChatRoomsList() {
  const accessToken = localStorage.getItem("accessToken");
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    loadChatRooms();
    setupWebSocket();
  }, []);

  const loadNonReadCount = async (roomId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/chat/room/${roomId}/nonreadcount`,
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
        `http://localhost:8080/api/chat/room/${roomId}/lastmessage`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.log("Error loading last message", error);
      return "";
    }
  };

  const loadChatRooms = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/chat/rooms", {
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
          const lastMessage = await loadLastMessage(room.id);
          return { ...room, nonReadCount, lastMessage };
        })
      );

      setChatRooms(chatRoomsData);
    } catch (error) {
      console.log("Error", error);
      setChatRooms([]);
    }
  };

  const setupWebSocket = () => {
    // 웹소켓 연결 설정
    const socket = new SockJS(
      "http://localhost:8080/ws/chat?token=" + accessToken
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
    <div>
      <h1>Chat Room 목록</h1>
      <button id="refreshRooms" onClick={loadChatRooms}>
        목록 새로고침
      </button>
      <div id="chatRoomsList">
        {chatRooms.map((room) => (
          <div key={room.id} className="chat-room-box">
            <a href={"/adopt/chatroom/" + room.id}>{room.roomName}</a>
            {room.nonReadCount > 0 && (
              <span className="unread-count"> ({room.nonReadCount})</span>
            )}
            <div className="last-message">Last message: {room.lastMessage}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatRoomsList;
