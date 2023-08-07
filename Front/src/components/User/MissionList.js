import React, { useState } from "react";
import MissonListItem from "./MissonListItem";

function MissionList() {
  const [selectedMission, setSelectedMission] = useState(null);

  const handleMissionClick = (missionNumber) => {
    setSelectedMission(missionNumber);
  };

  return (
    <>
      <button onClick={() => handleMissionClick(1)}>Mission 1</button>
      <button onClick={() => handleMissionClick(2)}>Mission 2</button>
      <button onClick={() => handleMissionClick(3)}>Mission 3</button>
      <button onClick={() => handleMissionClick(4)}>Mission 4</button>
      {selectedMission && <MissonListItem missionNumber={selectedMission} />}
    </>
  );
}

export default MissionList;
