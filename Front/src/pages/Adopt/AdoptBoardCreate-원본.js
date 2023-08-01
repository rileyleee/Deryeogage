// 입양게시판 - 게시글 작성 페이지

import React, { useState } from "react";
import * as S from "../../styled/Adopt/AdoptBoardCreate.style";
import PersonalitySection from "../../components/Adopt/PersonalitySection";
import DogInfoSection, { Div } from "../../components/Adopt/DogInfoSection";
import ImageSection from "../../components/Adopt/ImageSection";
import axios from "axios";

function AdoptBoardCreate1() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [friendly, setFriendly] = useState(0);
  const [activity, setActivity] = useState(0);
  const [dependency, setDependency] = useState(0);
  const [bark, setBark] = useState(0);
  const [hair, setHair] = useState(0);
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [chip, setChip] = useState(false); // 초기 값을 false로 변경
  const [gender, setGender] = useState(false); // 초기 값을 false로 변경
  const [health, setHealth] = useState("");
  const [introduction, setIntroduction] = useState("");

  const handleChipChange = (event) => {
    setChip(event.target.value === "등록" ? true : false); // 등록 선택 시 true, 미등록 선택 시 false
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value === "남자" ? true : false); // 남자 선택 시 true, 여자 선택 시 false
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const selectedImagesArray = [...selectedImages];
    for (let i = 0; i < files.length; i++) {
      selectedImagesArray.push(URL.createObjectURL(files[i]));
    }
    setSelectedImages(selectedImagesArray);
  };

  const onClick = (event) => {
    event.preventDefault();

    const data = {
      region_code: "SEOGN",
      dog_type_code: "MALTESE",
      title: "title",
      name: name,
      age: age,
      gender: gender,
      chip_yn: chip,
      friendly: friendly,
      activity: activity,
      dependency: dependency,
      bark: bark,
      hair: hair,
      health: health,
      introduction: introduction,
      files: ["이미지"],
    };

    let token = localStorage.getItem("accessToken");
    console.log(data);

    // HTTP POST 요청 보내기

    axios
      .post("http://localhost:8080/boards", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log("했 닥");

        // 성공적으로 작성되었다는 메시지를 사용자에게 알리거나 다른 작업을 수행할 수 있음

        // 게시글 작성 후 폼 요소들을 초기화
        // setAge("");
        // setRegion("");
        // setGender("");
        // setChip("");
        // setHealth("");
        // setIntroduction("");
        // setFriendly(0);
        // setActivity(0);
        // setDependency(0);
        // setBark(0);
        // setHair(0);
        // setSelectedImages([]);
      })
      .catch((err) => {
        console.log(err, "안됐따")
      });
  };

  return (
    <article className="container">
      <h2>분양게시판 글 작성하기</h2>
      <form onSubmit={onClick}>
        <Div>
          <ImageSection
            handleImageChange={handleImageChange}
          />
        </Div>

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
              name={name} // 추가
              setName={setName} // 추가
              age={age}
              setAge={setAge}
              region={region}
              setRegion={setRegion}
              setChip={setChip}
              handleChipChange={handleChipChange} // 추가
              gender={gender} // 추가
              handleGenderChange={handleGenderChange} // 추가
            />
          </S.Box>
        </S.FlexContainer>
        <S.Div>
          강아지의 <S.Span>건강정보</S.Span>를 상세하게 작성해주세요.
          <S.DogTextarea
            name="health"
            placeholder="강아지의 건강정보를 적어주세요."
            value={health} // 추가
            onChange={(e) => setHealth(e.target.value)} // 추가
          />
          강아지를 자유롭게 <S.Span>소개</S.Span>해주세요.
          <S.DogTextarea
            name="introduction"
            placeholder="강아지를 소개해주세요"
            value={introduction} // 추가
            onChange={(e) => setIntroduction(e.target.value)} // 추가
          />
        </S.Div>

        <S.Button  type="submit">등록하기</S.Button>
      </form>
    </article>
  );
}

export default AdoptBoardCreate1;
