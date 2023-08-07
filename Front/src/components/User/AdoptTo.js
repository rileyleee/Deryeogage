import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components"; // styled-components를 사용한 스타일링
import Mission from "../../pages/User/Misson";

function AdoptTo() {
  const [adopts, setAdopts] = useState([]);
  const [showMissionModal, setShowMissionModal] = useState(false); // 모달의 상태를 관리
  const handleMissionClick = () => {
    setShowMissionModal(true); // 모달을 보이게 함
  };

  const closeModal = () => {
    setShowMissionModal(false); // 모달을 숨김
  };
  useEffect(() => {
    const fetchAdopts = async () => {
      const token = localStorage.getItem("accessToken");
      const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

      try {
        const response = await axios.get(`${REACT_APP_API_URL}/adopts/to`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("입양내역:", response);
        const adoptRequests = response.data.data.map(async (adopt) => {
          const boardResponse = await axios.get(
            `${REACT_APP_API_URL}/boards/list`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(boardResponse);
          return {
            ...adopt,
            boardInfo: boardResponse.data.data[0],
            imageUrl: Object.values(boardResponse.data.data[1])[0],
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
      <h2>입양 내역</h2>
      {adopts.length === 0 ? (
        <p>입양 내역이 없습니다.</p>
      ) : (
        adopts.map((adopt, index) => (
          <div key={index}>
            {/* 기존 정보 출력... */}
            <MissionButton onClick={handleMissionClick}>
              입양 미션하기
            </MissionButton>
          </div>
        ))
      )}
      {showMissionModal && (
        <MissionModal>
          <Mission />
          <CloseButton onClick={closeModal}>닫기</CloseButton>
        </MissionModal>
      )}
    </div>
  );
}

export default AdoptTo;

// 스타일 컴포넌트 정의
const MissionButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const MissionModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CloseButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #da190b;
  }
`;
