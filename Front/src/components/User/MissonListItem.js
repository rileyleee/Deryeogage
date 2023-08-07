import React, { useState } from "react";
import axios from "axios";

function MissonListItem({ missionNumber }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const missionDetails = [
    { title: "건강검진", description: "건강 검진 결과를 제출해주세요." },
    { title: "산책 사진", description: "강아지와 산책하는 모습의 사진을 제출해주세요." },
    {
      title: "강아지 용품 구매 내역",
      description: "강아지 용품 구매 내역을 제출해주세요.",
    },
    { title: "반려동물 인증 내역", description: "반려동물 등록 내역을 제출해주세요." },
  ];

  // 선택된 미션의 설명
  const mission = missionDetails[missionNumber - 1];
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("파일을 선택해주세요!");
      return;
    }

    const token = localStorage.getItem("accessToken");
    const missionId = missionNumber; // 미션 번호
    const urlId = "example"; // 여기에 필요한 urlId 값을 넣으세요

    const REACT_APP_API_URL = process.env.REACT_APP_API_URL

    const formData = new FormData();
    formData.append("multipartFile", selectedFile);

    formData.append("id", 1)

    try {
      const response = await axios.post(`${REACT_APP_API_URL}/missions/1/1`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("성공적으로 제출되었습니다!");
      console.log("응답:", response.data);
    } catch (error) {
      console.error("제출 중 오류 발생:", error);
      alert("제출에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <div>
        {localStorage.getItem("nickname")}님, <br />
        Mission{missionNumber}: {mission.description}
      </div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>제출하기</button>
    </div>
  );
}

export default MissonListItem;
