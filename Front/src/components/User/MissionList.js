import React, { useState, useEffect } from "react";
import MissionListItem from "./MissionListItem";
import axios from "axios";

function MissionList({
  missionId,
  closeModal,
  completedMissions: numberOfCompletedMissions,
  fetchAdopts,
}) {
  const [selectedMissionNumber, setSelectedMissionNumber] = useState(null);
  const [completedMissions, setCompletedMissions] = useState(
    numberOfCompletedMissions
  );
  const [missionCompletion, setMissionCompletion] = useState([
    false,
    false,
    false,
    false,
  ]);

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchMissionCompletion = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          `${REACT_APP_API_URL}/missions/${missionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const missionUrls = [
          response.data.data.missionUrl1,
          response.data.data.missionUrl2,
          response.data.data.missionUrl3,
          response.data.data.missionUrl4,
        ];

        const completionStatus = missionUrls.map((url) => url !== null);
        setMissionCompletion(completionStatus);
      } catch (error) {
        console.error("미션 완료 상태 불러오기 실패:", error);
      }
    };

    fetchMissionCompletion();
  }, [missionId]);
  const handleMissionClick = (missionNumber) => {
    setSelectedMissionNumber(missionNumber);
  };

  const handleMissionSuccess = (missionNumber) => {
    setCompletedMissions(completedMissions + 1);
    const updatedCompletion = [...missionCompletion];
    updatedCompletion[missionNumber - 1] = true;
    setMissionCompletion(updatedCompletion);
    fetchAdopts();
  };

  return (
    <>
      {localStorage.getItem("nickname")}님, 미션을 진행해주세요! 현재까지{" "}
      {completedMissions}개 진행하셨습니다.
      <button
        onClick={() => handleMissionClick(1)}
        style={{ backgroundColor: missionCompletion[0] ? "#ccc" : "white" }}
      >
        1. 건강검진
      </button>
      <button
        onClick={() => handleMissionClick(2)}
        style={{ backgroundColor: missionCompletion[1] ? "#ccc" : "white" }}
      >
        2. 산책사진
      </button>
      <button
        onClick={() => handleMissionClick(3)}
        style={{ backgroundColor: missionCompletion[2] ? "#ccc" : "white" }}
      >
        3. 용품구매
      </button>
      <button
        onClick={() => handleMissionClick(4)}
        style={{ backgroundColor: missionCompletion[3] ? "#ccc" : "white" }}
      >
        4. 동물등록
      </button>
      {selectedMissionNumber && (
        <MissionListItem
          missionNumber={selectedMissionNumber}
          missionId={missionId}
          onMissionSuccess={() => handleMissionSuccess(selectedMissionNumber)}
          closeModal={closeModal}
          fetchAdopts={fetchAdopts}
        />
      )}
    </>
  );
}

export default MissionList;
