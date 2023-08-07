import styled from "styled-components";
import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Postcost from "./Postcost";

function Reservation({ roomId, boardId, closeModal }) {
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
    <ReservationContainer>
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
          <SelectedDate>
            선택한 날짜: {startDate.toLocaleDateString()}
          </SelectedDate>
          <ConfirmButton onClick={handleConfirmClick}>
            {reservationScheduled ? "수정하기" : "예약 등록하기"}
          </ConfirmButton>
        </>
      )}
    </ReservationContainer>
  );
}

export default Reservation;

const ReservationContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
`;

const SelectedDate = styled.div`
  margin-top: 10px;
  font-size: 16px;
`;

const ConfirmButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
