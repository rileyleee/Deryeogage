import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Postcost from "./Postcost";
import * as S from "../../styled/Adopt/Reservation.style"

function Reservation({ roomId, boardId, closeModal, onReservationComplete }) {
  const [reservationScheduled, setReservationScheduled] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [scheduledDate, setScheduledDate] = useState(null);
  const [showPostCost, setShowPostCost] = useState(false);
  const [boardInfo, setBoardInfo] = useState({
    boardId: null,
    user1: null,
    user2: null
  });

  const handleConfirmClick = () => {
    setShowPostCost(true);
  };

  const handlePostCostClick = async () => {
    const token = localStorage.getItem("accessToken");
    const scheduledDate = startDate.toISOString();
    const data = {
      boardId: boardInfo.boardId,
      scheduledDate,
      fromUserId: boardInfo.user1,
      toUserId: boardInfo.user2,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/adopts`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Date sent successfully");
      setShowPostCost(false);
      closeModal();
      onReservationComplete(); // 예약 완료 콜백 호출
    } catch (error) {
      console.log(error);
      console.error("Failed to send date:", error);
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
        setScheduledDate(new Date(scheduledDate));
        setReservationScheduled(!!scheduledDate);
        setBoardInfo({ boardId, user1, user2 });
        console.log(response);
      })
      .catch((error) => {
        console.error("Failed to get reservation info:", error);
      });
  }, [roomId]);

  return (
    <S.ReservationContainer>
      {showPostCost ? (
        <Postcost roomId={roomId} boardId={boardId} goToReservation={handlePostCostClick} />
      ) : (
        <>
          <h2>예약하기</h2>
          {scheduledDate ? (
            <p>예약된 날짜: {scheduledDate.toLocaleDateString()}</p>
          ) : null}
          <div>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="yyyy-MM-dd" inline />
          </div>
          <S.SelectedDate>
            선택한 날짜: {startDate.toLocaleDateString()}
          </S.SelectedDate>
          <S.ConfirmButton onClick={handleConfirmClick}>
            {reservationScheduled ? "수정하기" : "예약 등록하기"}
          </S.ConfirmButton>
        </>
      )}
    </S.ReservationContainer>
  );
}

export default Reservation;
