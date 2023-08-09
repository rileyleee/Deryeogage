import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import MissionList from "./MissionList";
import { Link } from "react-router-dom";

function AdoptTo() {
  const [adopts, setAdopts] = useState([]);
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [selectedMissionId, setSelectedMissionId] = useState(null);
  console.log("=================adopts: ", adopts)

  const handleMissionClick = (missionId) => {
    setShowMissionModal(true);
    setSelectedMissionId(missionId);
    console.log(missionId)
  };

  const closeModal = () => {
    setShowMissionModal(false);
  };

  const handleConfirmAdoption = async (adoptId) => {
    const token = localStorage.getItem("accessToken");
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
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
      fetchAdopts(); // 입양 목록을 다시 불러오기
    } catch (error) {
      console.error("Failed to confirm adoption:", error);
    }
  };

  const handleResponsibilityFeeReturn = async (boardId) => {

    const token = localStorage.getItem("accessToken");
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    try {
      await axios.put(
        `${REACT_APP_API_URL}/postcosts/missioncomplete`,
        { boardId: boardId }, // 요청 본문에 필요한 데이터를 넣으세요.
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(adopts)
      fetchAdopts(); // 입양 목록을 다시 불러오기
    } catch (error) {
      console.error("Failed to return responsibility fee:", error);
    }
  };

  const fetchAdopts = async () => {
    const token = localStorage.getItem("accessToken");
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    try {
      const response = await axios.get(`${REACT_APP_API_URL}/adopts/to`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const boardResponse = await axios.get(
        `${REACT_APP_API_URL}/boards/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("====================adoptTo:", response.data.data)
      
      const adoptsWithBoardInfo = await Promise.all(
        response.data.data.map(async (adopt) => {
          const matchingBoard = boardResponse.data.data.find(
            (board) => board.id === adopt.boardId
          );
    
          let completedMissions = 0;
          if (adopt.missionId !== null) { // missionId가 null이 아닌 경우에만 요청
            // 미션 정보를 가져옴
            const missionResponse = await axios.get(
              `${REACT_APP_API_URL}/missions/${adopt.missionId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
    
            // 완료된 미션 수를 계산
            completedMissions = [
              missionResponse.data.data.missionUrl1,
              missionResponse.data.data.missionUrl2,
              missionResponse.data.data.missionUrl3,
              missionResponse.data.data.missionUrl4,
            ].filter((url) => url !== null).length; // null이 아닌 갯수를 세서 완료된 미션의 수를 계산
          }
    
          return {
            ...adopt,
            boardInfo: matchingBoard,
            imageUrl: matchingBoard?.fileList[0],
            completedMissions, // 완료된 미션 수
          };
        })
      );

      setAdopts(adoptsWithBoardInfo);
    } catch (error) {
      console.error("An error occurred while fetching the data:", error);
    }
  };

  useEffect(() => {
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
            <Link to={`/board/${adopt.boardId}`}>
              <Title>{adopt.boardInfo?.title}</Title>
            </Link>
            <ConfirmButton onClick={() => handleConfirmAdoption(adopt.boardId)}>
              입양 확정하기
            </ConfirmButton>
            {adopt.status === "arrive" && (
              adopt.completedMissions === 4 ? (
                <ResponsibilityButton
                  onClick={() => handleResponsibilityFeeReturn(adopt.id)}
                >
                  책임비 반환하기
                </ResponsibilityButton>
              ) : (
                <MissionButton
                  onClick={() => handleMissionClick(adopt.missionId)}
                >
                  입양 미션하기 ({adopt.completedMissions}/4)
                </MissionButton>
              )
            )}
          </AdoptToCard>
        ))
      )}
      {showMissionModal && (
        <MissionModal>
          <MissionContent>
            <MissionList missionId={selectedMissionId} />
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

const ResponsibilityButton = styled.button`
  // 여기에 필요한 스타일을 적용하세요.
`;
