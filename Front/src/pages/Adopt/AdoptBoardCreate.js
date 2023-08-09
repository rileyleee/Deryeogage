import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ImageSection from "../../components/Adopt/ImageSection";
import DogInfoSection from "../../components/Adopt/DogInfoSection";
import PersonalitySection from "../../components/Adopt/PersonalitySection";

import * as S from "../../styled/Adopt/AdoptBoardCreate.style";

import Precost from "./../../components/Adopt/Precosts";

function AdoptBoardCreate() {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  const [currentBoardId, setCurrentBoardId] = useState(null);

// 모든 컴포넌트에서 Enter 키 누름을 감지하기 위한 useEffect
useEffect(() => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
      event.preventDefault();
    }
  };

  // 이벤트 리스너 등록
  window.addEventListener('keypress', handleKeyPress);

  // 컴포넌트 unmount 시 이벤트 리스너 제거
  return () => {
    window.removeEventListener('keypress', handleKeyPress);
  };
}, []);

  // 요청 중인지 확인하는 상태 추가
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 책임비 모달 관련

  const [showPrecost, setShowPrecost] = useState(false);

  const handlePrecostOpen = (boardId) => {
    setCurrentBoardId(boardId); // 상태를 설정
    setShowPrecost(true);
  };

  const handlePrecostClose = () => {
    setShowPrecost(false); // 모달 숨기기
  };

  // 여기서 기존 게시글 데이터를 가져와 설정할 수 있는 상태 값들을 추가해야 합니다.
  useEffect(() => {
    if (boardId) {
      axios
        .get(`${REACT_APP_API_URL}/boards/each/${boardId}`)
        .then((response) => {
          setIsEditing(true);
          const data = response.data.data;
          const dogData = data[0];
          const mediaData = data[1];

          console.log("useEffect에서 콘솔찍음", data, dogData, mediaData);
          // 다른 상태 설정
          // 0번 인덱스에서의 데이터 처리
          setTitle(dogData.title);
          setDogName(dogData.name);
          setDogAge(dogData.age);
          setRegion({
            address: dogData.regionCode,
            lat: dogData.lat,
            lng: dogData.lng,
          });
          setDogGender(
            dogData.dogGender === "true" || dogData.dogGender === true
          );
          setDogChip(dogData.dogChip === "true" || dogData.dogChip === true);
          setFriendly(dogData.friendly);
          setActivity(dogData.activity);
          setDependency(dogData.dependency);
          setBark(dogData.bark);
          setHair(dogData.hair);
          setDogHealth(dogData.health);
          setDogIntroduction(dogData.introduction);

          // 1번 인덱스에서의 이미지와 비디오 URL 처리
          const images = [];
          const videos = [];
          for (const key in mediaData) {
            const url = mediaData[key];
            if (url.endsWith(".mp4")) {
              videos.push(url);
            } else {
              images.push(url);
            }
          }

          setSelectedImages(images);
          setSelectedVideos(videos);
        });
    }
  }, [boardId]);

  // 이미지 등록 관련 코드
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState([]);
  const handleImageChange = (event) => {
    // 수정 상태에서의 제한 제거
    const files = event.target.files;
    const selectedImagesArray = [...selectedImages];
    const selectedImageFilesArray = [...selectedImageFiles];
    for (let i = 0; i < files.length; i++) {
      selectedImagesArray.push(URL.createObjectURL(files[i]));
      selectedImageFilesArray.push(files[i]);
    }
    setSelectedImages(selectedImagesArray);
    setSelectedImageFiles(selectedImageFilesArray);
    event.target.value = null;
  };

  // 동영상 등록 관련 코드
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [selectedVideoFiles, setSelectedVideoFiles] = useState([]);
  const handleVideoChange = (event) => {
    // 수정 상태에서의 제한 제거
    const files = event.target.files;
    const selectedVideosArray = [...selectedVideos];
    const selectedVideoFilesArray = [...selectedVideoFiles];
    for (let i = 0; i < files.length; i++) {
      selectedVideosArray.push(URL.createObjectURL(files[i]));
      selectedVideoFilesArray.push(files[i]);
    }
    setSelectedVideos(selectedVideosArray);
    setSelectedVideoFiles(selectedVideoFilesArray);
    event.target.value = null;
  };

  // 이미지 삭제 관련 코드
  const handleImageRemove = (indexToRemove) => {
    // 수정 상태에서의 제한 제거
    setSelectedImages(
      selectedImages.filter((_, index) => index !== indexToRemove)
    );
    setSelectedImageFiles(
      selectedImageFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  // 비디오 삭제 관련 코드
  const handleVideoRemove = (indexToRemove) => {
    // 수정 상태에서의 제한 제거
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
  const [dogRegion, setRegion] = useState({ address: "", lat: 0, lng: 0 });

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

  // 제목
  const [title, setTitle] = useState("");

  // axios 요청 보내기
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const token = localStorage.getItem("accessToken");

    // FormData 객체 생성
    const formData = new FormData();

    if (isEditing) {
      // 수정 상태에서 기존의 이미지와 동영상 URL 추가
      selectedImages.forEach((imageUrl) => {
        formData.append("existingImages", imageUrl);
      });
      selectedVideos.forEach((videoUrl) => {
        formData.append("existingVideos", videoUrl);
      });
    }

    // 이미지 파일들 추가
    selectedImageFiles.forEach((image) => {
      formData.append("multipartFile", image);
    });

    // 비디오 파일들 추가
    selectedVideoFiles.forEach((video) => {
      formData.append("multipartFile", video);
    });

    // 이미지나 비디오가 선택되지 않았을 경우 빈 파일 추가
    if (selectedImageFiles.length === 0 && selectedVideoFiles.length === 0) {
      formData.append("multipartFile", new Blob(), "");
    }

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
    formData.append("regionCode", dogRegion.address);
    formData.append("lat", dogRegion.lat);
    formData.append("lon", dogRegion.lng);
    formData.append("gender", dogGender);
    formData.append("chipYn", dogChip);
    formData.append("dogTypeCode", "CHIHUAHUA");
    formData.append("title", title);

    try {
      if (isEditing) {
        // FormData 객체의 내용을 콘솔로 출력하기 위한 코드
        for (var pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        await axios.put(`${REACT_APP_API_URL}/boards/${boardId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // 이 부분 추가
            Authorization: `Bearer ${token}`,
          },
        });
        alert("게시글이 수정되었습니다.");
        navigate(`/adopt/${boardId}`);
        // 요청 성공 후
        setIsSubmitting(false); // 요청 상태 초기화
      } else {
        const response = await axios.post(
          `${REACT_APP_API_URL}/boards`,
          formData,
          {
            headers: {
              message: "loginClaimUser",
              "Content-Type": "multipart/form-data", // 이 부분 추가
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newBoardId = response.data.data; // 서버의 응답 형식에 따라 이 부분이 수정되어야 할 수 있습니다.
        handlePrecostOpen(newBoardId); // 작성하기 버튼 클릭 시 모달 열기
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false); // 요청 실패시에도 상태 초기화
    }
  };

  return (
    <>
      {isEditing ? "게시글 수정하기" : "게시글 작성하기"}
      <form onSubmit={handleSubmit}> 
        <S.TitleInput
          value={title}
          placeholder="제목을 입력해주세요"
          onChange={(e) => setTitle(e.target.value)}
        />
        <ImageSection
          selectedImages={selectedImages}
          selectedVideos={selectedVideos}
          handleImageChange={handleImageChange}
          handleVideoChange={handleVideoChange}
          handleImageRemove={handleImageRemove}
          handleVideoRemove={handleVideoRemove} // 이 부분 추가
          isEditing={isEditing} // 이 부분 추가
        />
        <S.FlexContainer>
          <S.Box>
            <PersonalitySection
              friendly={friendly}
              activity={activity}
              dependency={dependency}
              bark={bark}
              hair={hair}
              setFriendly={setFriendly}
              setActivity={setActivity}
              setDependency={setDependency}
              setBark={setBark}
              setHair={setHair}
            />
          </S.Box>

          <S.Box>
            <DogInfoSection
              dogName={dogName}
              dogAge={dogAge}
              dogRegion={dogRegion}
              dogGender={dogGender}
              dogChip={dogChip}
              setName={setDogName}
              setAge={setDogAge}
              setRegion={setRegion}
              setGender={setDogGender}
              setChip={setDogChip}
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
        <S.Button type="submit">{isEditing ? "수정하기" : "작성하기"}</S.Button>
        {showPrecost && (
          <Precost onClose={handlePrecostClose} boardId={currentBoardId} />
        )}{" "}
      </form>
    </>
  );
}

export default AdoptBoardCreate;
