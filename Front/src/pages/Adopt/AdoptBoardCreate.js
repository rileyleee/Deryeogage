import React, { useState } from "react";
import axios from "axios";
import ImageSection from "../../components/Adopt/ImageSection";
import DogInfoSection from "../../components/Adopt/DogInfoSection";
import PersonalitySection from "../../components/Adopt/PersonalitySection";
import * as S from "../../styled/Adopt/AdoptBoardCreate.style";

function AdoptBoardCreate() {
  // 이미지 등록 관련 코드
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState([]);
  const handleImageChange = (event) => {
    const files = event.target.files;
    const selectedImagesArray = [...selectedImages];
    const selectedImageFilesArray = [...selectedImageFiles];
    for (let i = 0; i < files.length; i++) {
      selectedImagesArray.push(URL.createObjectURL(files[i]));
      selectedImageFilesArray.push(files[i]);
    }
    setSelectedImages(selectedImagesArray);
    setSelectedImageFiles(selectedImageFilesArray);
    event.target.value = null; // 이 부분 추가
  };

  // 동영상 등록 관련 코드
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [selectedVideoFiles, setSelectedVideoFiles] = useState([]);
  const handleVideoChange = (event) => {
    const files = event.target.files;
    const selectedVideosArray = [...selectedVideos];
    const selectedVideoFilesArray = [...selectedVideoFiles];
    for (let i = 0; i < files.length; i++) {
      selectedVideosArray.push(URL.createObjectURL(files[i]));
      selectedVideoFilesArray.push(files[i]);
    }
    setSelectedVideos(selectedVideosArray);
    setSelectedVideoFiles(selectedVideoFilesArray);
    event.target.value = null; // 이 부분 추가
  };

  // 이미지 삭제 관련 코드
  const handleImageRemove = (indexToRemove) => {
    setSelectedImages(
      selectedImages.filter((_, index) => index !== indexToRemove)
    );
    setSelectedImageFiles(
      selectedImageFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  // 비디오 삭제 관련 코드
  const handleVideoRemove = (indexToRemove) => {
    setSelectedVideos(
      selectedVideos.filter((_, index) => index !== indexToRemove)
    );
    setSelectedVideoFiles(
      selectedVideoFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  // 강아지 특성(선호도 조사) 관련 코드
  const [friendly, setFriendly] = useState(0);
  const [activity, setActivity] = useState(0);
  const [dependency, setDependency] = useState(0);
  const [bark, setBark] = useState(0);
  const [hair, setHair] = useState(0);

  // DogInfoSection에서 관리할 state들 추가
  const [dogName, setDogName] = useState("");
  const [dogAge, setDogAge] = useState(0);
  const [dogRegion, setDogRegion] = useState("");
  const [dogGender, setDogGender] = useState(false);
  const [dogChip, setDogChip] = useState(false);

  // 강아지 소개, 건강정보 관련 코드
  const [dogHealth, setDogHealth] = useState("");
  const [dogIntroduction, setDogIntroduction] = useState("");
  const handleHealthChange = (event) => {
    setDogHealth(event.target.value);
  };
  const handleIntroductionChange = (event) => {
    setDogIntroduction(event.target.value);
  };
  console.log(dogGender)
  console.log(dogChip)
  // axios 요청 보내기
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("accessToken");

    // FormData 객체 생성
    const formData = new FormData();

    // 이미지 파일들 추가
    selectedImageFiles.forEach((image) => {
      formData.append("multipartFile", image);
    });

    // // 비디오 파일들 추가
    selectedVideoFiles.forEach((video) => {
      formData.append("multipartFile", video);
    });

    // 다른 필드들 추가
    formData.append("friendly", friendly);
    formData.append("activity", activity);
    formData.append("dependency", dependency);
    formData.append("bark", bark);
    formData.append("hair", hair);
    formData.append("health", dogHealth);
    formData.append("introduction", dogIntroduction);
    formData.append("name", dogName);
    formData.append("age", dogAge);
    formData.append("regionCode", dogRegion);
    formData.append("gender", dogGender);
    formData.append("chipYn", dogChip);
    formData.append("dogTypeCode", "CHIHUAHUA");
    formData.append("title", "우리집꼬미");
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8080/boards",
        formData,
        {
          headers: {
            message: "loginClaimUser",
            "Content-Type": "multipart/form-data", // 이 부분 추가
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>분양게시판 글 작성하기</h2>
      <form onSubmit={handleSubmit}>
        <ImageSection
          selectedImages={selectedImages}
          selectedVideos={selectedVideos}
          handleImageChange={handleImageChange}
          handleVideoChange={handleVideoChange}
          handleImageRemove={handleImageRemove}
          handleVideoRemove={handleVideoRemove} // 이 부분 추가
        />
        <S.FlexContainer>
          <S.Box>
            <PersonalitySection
              setFriendly={setFriendly}
              setActivity={setActivity}
              setDependency={setDependency}
              setBark={setBark}
              setHair={setHair}
            />
          </S.Box>

          <S.Box>
            <DogInfoSection
              setName={setDogName}
              setAge={setDogAge}
              setRegion={setDogRegion}
              setGender={setDogGender}
              setChip={setDogChip}
              dogGender={dogGender}
              dogChip={dogChip}
              dogAge={dogAge}
              dogName={dogName}
              dogRegion={dogRegion}
            />
          </S.Box>
        </S.FlexContainer>
        강아지의 <S.Span>건강정보</S.Span>를 상세하게 작성해주세요.
        <S.DogTextarea value={dogHealth} onChange={handleHealthChange} />
        강아지를 자유롭게 <S.Span>소개</S.Span>해주세요.
        <S.DogTextarea
          value={dogIntroduction}
          onChange={handleIntroductionChange}
        />
        <S.Button type="submit">등록하기</S.Button>
      </form>
    </>
  );
}

export default AdoptBoardCreate;
