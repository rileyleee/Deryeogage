import React, { useState } from "react";
import MissionListItem from './MissionListItem';

function MissionList({missionId, closeModal} ) {
  const [selectedMissionNumber, setSelectedMissionNumber] = useState(null);
  const [completedMissions, setCompletedMissions] = useState(0); // 완료된 미션 수를 추적

  const handleMissionClick = (missionNumber) => {
    setSelectedMissionNumber(missionNumber);
  };

  // 미션 성공시 호출될 콜백
  const handleMissionSuccess = (missionNumber) => {
    setCompletedMissions(completedMissions + 1);
  };

  return (
    <>
      <button onClick={() => handleMissionClick(1)} >
        Mission 1
      </button>
      <button onClick={() => handleMissionClick(2)} >
        Mission 2
      </button>
      <button onClick={() => handleMissionClick(3)} >
        Mission 3
      </button>
      <button onClick={() => handleMissionClick(4)} >
        Mission 4
      </button>
      {selectedMissionNumber && (
        <MissionListItem
          missionNumber={selectedMissionNumber}
          missionId={missionId}
          onMissionSuccess={handleMissionSuccess} // 콜백 전달
          closeModal={closeModal} // 모달 닫기 함수 전달
        />
      )}
    </>
  );
}

export default MissionList;