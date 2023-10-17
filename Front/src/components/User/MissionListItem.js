import React, { useState, useEffect, useRef } from "react"; // useRef 추가
import axios from "axios";
import * as S from "../../styled/User/MissionListItem.style"

function MissionListItem({
  missionNumber,
  missionId,
  onMissionSuccess,
  fetchAdopts,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [submissionComplete, setSubmissionComplete] = useState(false); // 추가
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  // 파일 입력창에 대한 참조를 생성
  const fileInputRef = useRef(null);

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

        // 해당 미션의 URL이 null이 아니면 제출이 완료된 것으로 판단
        if (missionUrls[missionNumber - 1] !== null) {
          setSubmissionComplete(true);
        }
      } catch (error) {
        console.error("이미지 불러오기 실패:", error);
      }
    };

    fetchImage();
  }, [missionId, missionNumber]);

  // 선택된 미션의 설명
  const mission = missionDetails[missionNumber - 1];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // 파일을 읽어 미리보기 URL을 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("파일을 선택해주세요!");
      return;
    }

    const token = localStorage.getItem("accessToken");
    const urlId = missionNumber;
    const formData = new FormData();
    formData.append("multipartFile", selectedFile);
    formData.append("id", missionId);

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
      onMissionSuccess();
      fileInputRef.current.value = "";
      const newImageUrl = response.data.newImageUrl;
      setSelectedFile(null)
      setPreviewImage(newImageUrl);
      setSubmissionComplete(true); // 제출 완료 상태를 true로 설정
      fetchAdopts(); // 화면을 갱신하려면 이 줄을 추가하세요
    } catch (error) {
      console.error("제출 중 오류 발생:", error);
      alert("제출에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const urlId = missionNumber; // 여기에 필요한 urlId 값을 넣으세요
      await axios.put(
        `${REACT_APP_API_URL}/missions/${missionId}/${urlId}`,
        { id: missionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("이미지가 삭제되었습니다.");
      setPreviewImage(null); // 미리보기 삭제

      // 해당 미션의 URL이 null이었다면 미션 성공을 취소해야 함
      if (submissionComplete) {
        onMissionSuccess(-1); // 미션 수 감소
        setSubmissionComplete(false); // 제출 완료 상태를 false로 설정
      }

      fetchAdopts(); // 화면을 갱신하려면 이 줄을 추가하세요
    } catch (error) {
      console.error("이미지 삭제 실패:", error);
      alert("이미지를 삭제하지 못했습니다. 다시 시도해주세요.");
    }
  };

  // 나머지 코드는 동일합니다.

  return (
    <S.MissionBox>
      <S.MissionTextWrapper>
        <S.MissionPtag>{localStorage.getItem("nickname")}님, </S.MissionPtag>
        <S.MissionPtag>{mission.description}</S.MissionPtag>
      </S.MissionTextWrapper>
      {previewImage && (
        <div>
          <img
            src={previewImage}
            alt="미리보기"
            style={{ width: "100px", height: "100px" }}
          />
          <button onClick={handleDelete}>이미지 삭제</button>
        </div>
      )}
      <input type="file" onChange={handleFileChange} ref={fileInputRef} />

      <S.MissionSubmit onClick={handleSubmit}>제출하기</S.MissionSubmit>
    </S.MissionBox>
  );
}

export default MissionListItem;
