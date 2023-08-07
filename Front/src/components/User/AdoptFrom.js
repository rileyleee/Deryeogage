import React, { useEffect, useState } from "react";
import axios from "axios";

function AdoptFrom() {
  const [adopts, setAdopts] = useState([]);

  useEffect(() => {
    const fetchAdopts = async () => {
      const token = localStorage.getItem("accessToken");
      const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

      try {
        const response = await axios.get(`${REACT_APP_API_URL}/adopts/from`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response)
        const adoptRequests = response.data.data.map(async (adopt) => {
          const boardResponse = await axios.get(`${REACT_APP_API_URL}/boards/each/${adopt.boardId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(boardResponse)
          return { 
            ...adopt, 
            boardInfo: boardResponse.data.data[0], 
            imageUrl: Object.values(boardResponse.data.data[1])[0] 
          };
        });

        // 여러 개의 비동기 요청을 병렬로 처리
        const adoptsWithBoardInfo = await Promise.all(adoptRequests);
        setAdopts(adoptsWithBoardInfo);
        
      } catch (error) {
        console.error("An error occurred while fetching the data:", error);
      }
    };

    fetchAdopts();
  }, []);

  return (
    <div>
      <h2>분양 내역</h2>
      {adopts.length === 0 ? (
        <p>분양 내역이 없습니다.</p>
      ) : (
        adopts.map((adopt, index) => (
          <div key={index}>
            분양 날짜: {adopt.scheduledDate} <br />
            게시글 제목: {adopt.boardInfo.title} <br />
            강아지 이름: {adopt.boardInfo.name} <br />
            나이: {adopt.boardInfo.age} <br />
            <img src={adopt.imageUrl} alt={`${adopt.boardInfo.name}의 이미지`} />
          </div>
        ))
      )}
    </div>
  );
}

export default AdoptFrom;
