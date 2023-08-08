import React, { useState, useEffect } from "react";
import axios from "axios";

function MissionListItem({ missionNumber, missionId, onMissionSuccess, closeModal }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const missionDetails = [
    { title: "건강검진", description: "건강 검진 결과를 제출해주세요." },
    {
      title: "산책 사진",
      description: "강아지와 산책하는 모습의 사진을 제출해주세요.",
    },
    {
      title: "강아지 용품 구매 내역",
      description: "강아지 용품 구매 내역을 제출해주세요.",
    },
    {
      title: "반려동물 인증 내역",
      description: "반려동물 등록 내역을 제출해주세요.",
    },
  ];
  useEffect(() => {
    const fetchImage = async () => {
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
        setPreviewImage(missionUrls[missionNumber - 1]);
      } catch (error) {
        console.error("이미지 불러오기 실패:", error);

      }
    };

    fetchImage();
  }, [missionId, missionNumber]);

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
    const urlId = missionNumber; // 여기에 필요한 urlId 값을 넣으세요

    console.log("missionId before parsing:", missionId);

    console.log("미션아뒤",typeof missionId)// 미션 번호를 정수로 변환
    
    const formData = new FormData();
    formData.append("multipartFile", selectedFile);
    formData.append("id", missionId); // missionId를 폼 데이터에 추가
    
    try {

      const response = await axios.post(
        `${REACT_APP_API_URL}/missions/${missionId}/${urlId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("제출햇따", response);
      onMissionSuccess(missionNumber); // 미션 성공 콜백 호출
    } catch (error) {
      console.error("제출 중 오류 발생:", error);
      alert("제출에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const urlId = missionNumber; // 여기에 필요한 urlId 값을 넣으세요
      console.log(missionId)
      await axios.put(
        `${REACT_APP_API_URL}/missions/${missionId}/${urlId}`,
        { id: missionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      alert("이미지가 삭제되었습니다.");
      setPreviewImage(null); // 미리보기 삭제
    } catch (error) {
      console.error("이미지 삭제 실패:", error);
      alert("이미지를 삭제하지 못했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <div>
        {localStorage.getItem("nickname")}님, <br />
        Mission{missionNumber}: {mission.description}
      </div>
      {previewImage && (
        <div>
          <img src={previewImage} alt="미리보기" style={{ width: "100px", height: "100px" }} />
          <button onClick={handleDelete}>이미지 삭제</button>
        </div>
      )}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>제출하기</button>
    </div>
  );
}

export default MissionListItem;
