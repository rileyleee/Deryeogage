import React from "react";
import axios from "axios";

function Postcost({ boardId, goToReservation }) {
  const token = localStorage.getItem("accessToken"); // Assuming the token is stored in localStorage
  const boardIdAsInt = parseInt(boardId, 10);
  const handlePostCost = async () => {
    const data = {
      boardId: boardIdAsInt
    };
    console.log(data)

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/postcosts/${boardIdAsInt}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        },
      });
      console.log("Cost sent successfully");
      goToReservation();
    } catch (error) {
      console.error("Failed to send cost:", error);
    }
  };

  return (
    <div>
      책임비를 내고 난 뒤 일정예약 가능
      <button onClick={handlePostCost}>책임비 납부하기</button>
    </div>
  );
}

export default Postcost;
