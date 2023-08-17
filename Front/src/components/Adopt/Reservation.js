import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Postcost from "./Postcost";
import * as S from "../../styled/Adopt/Reservation.style";

function Reservation({
  roomId,
  boardId,
  closeModal,
  onReservationComplete,
  changeClass,
}) {
  const [reservationScheduled, setReservationScheduled] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [scheduledDate, setScheduledDate] = useState(null);
  const [showPostCost, setShowPostCost] = useState(false);
  const [boardInfo, setBoardInfo] = useState({
    boardId: null,
    user1: null,
    user2: null,
  });
  
  console.log("roomId!!!!!!!!!!!!!!!!!!!!!", roomId);
  console.log("startDate", startDate.toISOString().split("T")[0]);

  const handleConfirmClick = async () => {
    const token = localStorage.getItem("accessToken");
    const scheduledDateToSend = startDate.toISOString().split("T")[0];

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const postData = {
      boardId: boardInfo.boardId,
      scheduledDate: scheduledDateToSend,
      fromUserId: boardInfo.user1,
      toUserId: boardInfo.user2,
    };

    const putDataForRoom = {
      roomId: parseInt(roomId, 10),
      scheduledDate: scheduledDateToSend,
    };

    if (reservationScheduled) {
      handlePostCostClick();
    } else {
      try {
        const putRequestForRoom = axios.put(
          `${process.env.REACT_APP_API_URL}/chat/room/${roomId}/schedule`,
          putDataForRoom,
          { headers }
        );

        const postRequestForAdopts = axios.post(
          `${process.env.REACT_APP_API_URL}/adopts`,
          postData,
          { headers }
        );

        await Promise.all([putRequestForRoom, postRequestForAdopts]);
        console.log("Requests were successful!");
        setShowPostCost(true);
        changeClass("postcost");
      } catch (error) {
        console.error("Failed to send requests:", error);
      }
    }
  };

  const handlePostCostClick = async () => {
    const token = localStorage.getItem("accessToken");
    const scheduledDateToSend = startDate.toISOString().split("T")[0];
    console.log("Selected date:", startDate);
    console.log("Scheduled date to send:", scheduledDateToSend);

    const postData = {
      boardId: boardInfo.boardId,
      scheduledDate: scheduledDateToSend,
      fromUserId: boardInfo.user1,
      toUserId: boardInfo.user2,
    };

    const putDataForRoom = {
      roomId: parseInt(roomId, 10),
      scheduledDate: scheduledDateToSend,
    };

    const putDataForAdopts = {
      boardId: parseInt(boardId, 10),
      scheduledDate: scheduledDateToSend,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const putRequestForRoom = axios.put(
      `${process.env.REACT_APP_API_URL}/chat/room/${roomId}/schedule`,
      putDataForRoom,
      { headers }
    );

    let requests = [putRequestForRoom];

    // 조건에 따라 /adopts로의 요청을 PUT 또는 POST로 수행
    if (reservationScheduled) {
      // 예약이 스케줄된 경우 PUT 요청 수행
      const putRequestForAdopts = axios.put(
        `${process.env.REACT_APP_API_URL}/adopts`,
        putDataForAdopts,
        { headers }
      );
      requests.push(putRequestForAdopts);
    }
    try {
      await Promise.all(requests);
      console.log("Requests were successful!");
      closeModal();
    } catch (error) {
      console.log(error);
      console.error("Failed to send requests:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    axios
      .get(`${REACT_APP_API_URL}/chat/room/info/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { boardId, scheduledDate, user1, user2 } = response.data.data;
        if (scheduledDate) {
          setScheduledDate(scheduledDate);
          setReservationScheduled(true);
        } else {
          setScheduledDate(null);
          setReservationScheduled(false);
        }
        setBoardInfo({ boardId, user1, user2 });
      })
      .catch((error) => {
        console.error("Failed to get reservation info:", error);
      });
  }, [roomId]);

  return (
    <>
      {showPostCost ? (
        <Postcost
          roomId={roomId}
          boardId={boardId}
          scheduledDate={startDate.toISOString().split("T")[0]}
          fromUserId={boardInfo.user1}
          toUserId={boardInfo.user2}
          onReservationComplete={onReservationComplete}
        />
      ) : (
        <>
          <h2>예약하기</h2>
          {scheduledDate ? (
            <p>예약된 날짜: {scheduledDate}</p> // Date 메서드 없이 문자열 출력
          ) : null}
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              inline
              minDate={new Date()}
            />
          </div>
          <S.SelectedDate>
            선택한 날짜: {startDate.toLocaleDateString()}
          </S.SelectedDate>
          <S.ConfirmButton onClick={handleConfirmClick}>
            {reservationScheduled ? "예약 수정하기" : "예약하기"}
          </S.ConfirmButton>
        </>
      )}
    </>
  );
}

export default Reservation;
