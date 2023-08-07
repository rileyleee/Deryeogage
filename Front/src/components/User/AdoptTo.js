import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components"; // styled-components를 사용한 스타일링
import MissionList from "./MissionList";
import { Link } from "react-router-dom";

function AdoptTo() {
  const [adopts, setAdopts] = useState([]);
  const [showMissionModal, setShowMissionModal] = useState(false); // 모달의 상태를 관리
  const handleMissionClick = () => {
    setShowMissionModal(true); // 모달을 보이게 함
  };

  const closeModal = () => {
    setShowMissionModal(false); // 모달을 숨김
  };

  // 입양 확정 버튼 클릭 핸들러
  const handleConfirmAdoption = async (adoptId) => {
    const token = localStorage.getItem("accessToken");
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    console.log(adoptId);
    try {
      await axios.put(
        `${REACT_APP_API_URL}/adopts/toconfirm`,
        { id: adoptId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Adoption confirmed successfully!");
      // 새로운 입양 목록을 가져오거나 상태를 업데이트하는 로직을 추가할 수 있음
    } catch (error) {
      console.error("Failed to confirm adoption:", error);
    }
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

        const boardResponse = await axios.get(
          `${REACT_APP_API_URL}/boards/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(boardResponse);

        const adoptsWithBoardInfo = response.data.data.map((adopt) => {
          // 보드 리스트에서 adopt의 boardId와 일치하는 항목을 찾음
          const matchingBoard = boardResponse.data.data.find(
            (board) => board.id === adopt.boardId
          );

          return {
            ...adopt,
            boardInfo: matchingBoard,
            imageUrl: matchingBoard?.fileList[0], // 원하는 필드를 추가
          };
        });

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
          <AdoptToCard key={index}>
            <Image src={adopt.imageUrl} alt="board" />
            {/* 보드의 제목을 링크로 만듭니다. */}
            <Link to={`/board/${adopt.boardId}`}>
              <Title>{adopt.boardInfo?.title}</Title>
            </Link>
            <ConfirmButton onClick={() => handleConfirmAdoption(adopt.id)}>
              입양 확정하기
            </ConfirmButton>
            {adopt.status === "arrive" && ( // status가 "arrive"인 경우에만 버튼이 보임
              <MissionButton onClick={handleMissionClick}>
                입양 미션하기
              </MissionButton>
            )}
          </AdoptToCard>
        ))
      )}
      {showMissionModal && (
        <MissionModal>
          <MissionContent>
            <MissionList />
            <CloseButton onClick={closeModal}>닫기</CloseButton>
          </MissionContent>
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

const MissionContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConfirmButton = styled.button`
  background-color: #ff5722;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #e64a19;
  }
`;

const AdoptToCard = styled.div`
  display: flex;
  align-items: center; // 세로 정렬
  margin: 10px 0;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover; // 이미지 비율 유지
  margin-right: 20px; // 우측 여백
`;
const Title = styled.h3`
  text-decoration: none; // 밑줄 표시
  cursor: pointer; // 포인터 마우스 커서
`;
