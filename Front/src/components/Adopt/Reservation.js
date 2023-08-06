import styled from "styled-components";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"; // axios import

function Reservation({ roomId, closeModal }) {
  const [startDate, setStartDate] = useState(new Date());
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("accessToken"); // Assuming the token is stored in localStorage
  const RoomId = roomId

  // Function to send the date to the server
  const sendDateToServer = () => {
    const formattedDate = startDate.toISOString();
    const data = {
      scheduledDate: formattedDate,
    };
  
    axios
      .put(`${REACT_APP_API_URL}/chat/room/${RoomId}/schedule`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // JSON 형식으로 보냅니다.
        },
      })
      .then((response) => {
        console.log("Date sent successfully:", response.data);
        closeModal(); // axios 요청 성공 후 모달 닫기
      })
      .catch((error) => {
        console.error("Failed to send date:", error);
      });
  };
  

  return (
    <ReservationContainer>
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
      <ConfirmButton onClick={sendDateToServer}>예약 확정하기</ConfirmButton>
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
