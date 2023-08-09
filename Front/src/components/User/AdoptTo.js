import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "../../styled/User/AdoptTo.style"
import MissionList from "./MissionList";
import { Link } from "react-router-dom";

function AdoptTo() {
  const [adopts, setAdopts] = useState([]);
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [selectedMissionId, setSelectedMissionId] = useState(null);
  console.log("=================adopts: ", adopts);

  const handleMissionClick = (missionId) => {
    setShowMissionModal(true);
    setSelectedMissionId(missionId);
    console.log(missionId);
  };

  const closeModal = () => {
    setShowMissionModal(false);
  };

  const handleConfirmAdoption = async (adoptId, index) => {
    console.log("+++++++++++++++++++++++++++++++++++++adoptId", adoptId);
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
      const updatedAdopts = [...adopts];
      updatedAdopts[index].isConfirmed = true; // 해당 입양 항목을 확정 상태로 설정
      setAdopts(updatedAdopts);
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
      console.log(adopts);
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
      console.log("adopt/to 값 +++++++++++++++++++++++ ", response);

      const boardResponse = await axios.get(
        `${REACT_APP_API_URL}/boards/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("====================adoptTo:", response.data.data);

      const adoptsWithBoardInfo = await Promise.all(
        response.data.data.map(async (adopt) => {
          const matchingBoard = boardResponse.data.data.find(
            (board) => board.id === adopt.boardId
          );

          let completedMissions = 0;
          if (adopt.missionId !== null) {
            // missionId가 null이 아닌 경우에만 요청
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
            toConfirmYn: adopt.toConfirmYn, // 입양 확정 여부를 추가
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
          <S.AdoptToCard key={index}>
            <S.Image src={adopt.imageUrl} alt="board" />
            <Link to={`/board/${adopt.boardId}`}>
              <S.Title>{adopt.boardInfo?.title}</S.Title>
            </Link>
            <S.ConfirmButton onClick={() => handleConfirmAdoption(adopt.id)}>
              입양 확정하기
            </S.ConfirmButton>
            {adopt.status === "arrive" && (
              adopt.completedMissions === 4 ? (
                <S.ResponsibilityButton
                  onClick={() => handleResponsibilityFeeReturn(adopt.boardId)}
                >
                  책임비 반환하기
                </S.ResponsibilityButton>
              ) : (
                <S.MissionButton
                  onClick={() => handleMissionClick(adopt.missionId)}
                >
                  입양 미션하기 ({adopt.completedMissions}/4)
                </S.MissionButton>
              )
            )}
          </S.AdoptToCard>
        ))
      )}
      {showMissionModal && (
        <S.MissionModal>
          <S.MissionContent>
            <MissionList missionId={selectedMissionId} />
            <S.CloseButton onClick={closeModal}>닫기</S.CloseButton>
          </S.MissionContent>
        </S.MissionModal>
      )}
    </div>
  );
}

export default AdoptTo;
