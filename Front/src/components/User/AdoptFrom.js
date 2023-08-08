import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components"; // 스타일드 컴포넌트 import

function AdoptFrom() {
  const [adopts, setAdopts] = useState([]);
  const [confirmedAdopts, setConfirmedAdopts] = useState({});



  const handleConfirmAdoption = async (adoptId, toUserId) => {
    const token = localStorage.getItem("accessToken");
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    try {
      await axios.put(
        `${REACT_APP_API_URL}/adopts/fromconfirm`,
        {
          id: adoptId,
          toUserId: toUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Adoption confirmed successfully!");
      setConfirmedAdopts({
        ...confirmedAdopts,
        [adoptId]: true,
      });
    } catch (error) {
      console.error("Failed to confirm adoption:", error);
    }
  };

  const handleRefundResponsibility = async (boardId) => {
    const token = localStorage.getItem("accessToken");
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    
    try {
      await axios.put(
        `${REACT_APP_API_URL}/precosts/confirm/`,
        {boardId :boardId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Responsibility fee refunded successfully!");
      // 필요한 추가 로직
    } catch (error) {
      console.error("Failed to refund responsibility fee:", error);
    }
  };

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
        console.log("분양내역: ",response);
        const adoptRequests = response.data.data.map(async (adopt) => {
          const boardResponse = await axios.get(
            `${REACT_APP_API_URL}/boards/each/${adopt.boardId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return {
            ...adopt,
            boardInfo: boardResponse.data.data[0],
            imageUrl: Object.values(boardResponse.data.data[1])[0],
          };
        });

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
            <Image
              src={adopt.imageUrl}
              alt={`${adopt.boardInfo.name}의 이미지`}
            />
            {confirmedAdopts[adopt.id] ? (
              <button
                onClick={() => handleRefundResponsibility(adopt.boardId)}
              >
                책임비 반환하기
              </button>
            ) : adopt.toConfirmYn ? (
              <button
                onClick={() => handleConfirmAdoption(adopt.id, adopt.toUserId)}
              >
                분양 확정하기
              </button>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
}

export default AdoptFrom;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;
