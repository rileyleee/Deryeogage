import styled from "styled-components";
import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react"; // useEffect 추가
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"; // axios import
import Postcost from "./Postcost";

function Reservation({ roomId, boardId, closeModal }) {
// 예약 정보를 저장할 상태 추가
const [reservationInfo, setReservationInfo] = useState(null);
const [startDate, setStartDate] = useState(new Date());
const [showPostCost, setShowPostCost] = useState(false);

  const handleConfirmClick = () => {
    setShowPostCost(true); // 예약 확정하기 버튼을 클릭하면 Postcost 컴포넌트를 보여준다.
  };

  const handlePostCostClick = async () => {
    const token = localStorage.getItem("accessToken");
    // const scheduledDate = startDate.toISOString().split('T')[0];
    const scheduledDate = startDate.toISOString();
    const data = { scheduledDate };
    console.log(scheduledDate)

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/chat/room/${roomId}/schedule`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Date sent successfully");
      setShowPostCost(false);
      closeModal();
    } catch (error) {
      console.l(error)
      console.error("Failed to send date:", error);
    }
  };

  // roomId가 변경될 때마다 GET 요청을 수행하는 useEffect 추가
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL
    axios
      .get(`${REACT_APP_API_URL}/chat/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response)
        // 응답을 받아서 상태에 저장
        // setReservationInfo(response.data);
      })
      .catch((error) => {
        console.error("Failed to get reservation info:", error);
      });
  }, [roomId]); // roomId가 변경될 때마다 요청

  return (
    <ReservationContainer>
      {/* 예약 정보를 화면에 표시 (선택사항) */}
      {reservationInfo && <div>예약 정보: {reservationInfo.someField}</div>}
      {showPostCost ? (
        <Postcost roomId={roomId} boardId={boardId} goToReservation={handlePostCostClick} />
      ) : (
        <>
          <h2>예약하기</h2>
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              inline
            />
          </div>
          <SelectedDate>선택한 날짜: {startDate.toLocaleDateString()}</SelectedDate>
          <ConfirmButton onClick={handleConfirmClick}>예약 확정하기</ConfirmButton>
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