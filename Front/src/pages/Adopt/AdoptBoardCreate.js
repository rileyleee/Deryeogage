// 입양게시판 - 게시글 작성 페이지

import React, { useState } from "react";
import axios from "axios";
import * as S from "../../styled/Adopt/AdoptBoardCreate.style";
import styled from "styled-components";
import PersonalitySection from "../../components/Adopt/PersonalitySection";
import DogInfoSection, { Div } from "../../components/Adopt/DogInfoSection";
import ImageSection from "../../components/Adopt/ImageSection";

function AdoptBoardCreate(props) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [friendly, setFriendly] = useState(0);
  const [activity, setActivity] = useState(0);
  const [dependency, setDependency] = useState(0);
  const [bark, setBark] = useState(0);
  const [hair, setHair] = useState(0);
  const [title, setTitle] = useState("");
  const [age, setAge] = useState("");
  const [region, setRegion] = useState("");
  const [gender, setGender] = useState("");
  const [chip, setChip] = useState("");
  const [health, setHealth] = useState("");
  const [introduction, setIntroduction] = useState("");

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
      title: title,
      age: age,
      region: region,
      gender: gender,
      chip: chip,
      health: health,
      introduction: introduction,
      friendly: friendly,
      activity: activity,
      dependency: dependency,
      bark: bark,
      hair: hair,
    };

    // HTTP POST 요청 보내기
    axios
      .post("http://localhost:8080/boards", data)
      .then((res) => {
        // 요청이 성공적으로 처리되었을 때 실행되는 코드
        console.log(res.data); // 응답 데이터 확인
        // 성공적으로 작성되었다는 메시지를 사용자에게 알리거나 다른 작업을 수행할 수 있음

        // 게시글 작성 후 폼 요소들을 초기화
        setTitle("");
        setAge("");
        setRegion("");
        setGender("");
        setChip("");
        setHealth("");
        setIntroduction("");
        setFriendly(0);
        setActivity(0);
        setDependency(0);
        setBark(0);
        setHair(0);
        setSelectedImages([]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <article className="container">
      <h2>분양게시판 글 작성하기</h2>
      <form onSubmit={onClick}>
        <Div>
          <ImageSection
            selectedImages={selectedImages}
            handleImageChange={handleImageChange}
          />
        </Div>

        <S.FlexContainer>
          <S.Box>
            <PersonalitySection
              friendly={friendly}
              setFriendly={setFriendly}
              activity={activity}
              setActivity={setActivity}
              dependency={dependency}
              setDependency={setDependency}
              bark={bark}
              setBark={setBark}
              hair={hair}
              setHair={setHair}
            />
          </S.Box>

          <S.Box>
            <DogInfoSection />
          </S.Box>
        </S.FlexContainer>

        <S.Div>
          강아지의 <S.Span>건강정보</S.Span>를 상세하게 작성해주세요.
          <S.DogTextarea
            name="health"
            placeholder="강아지의 건강정보를 적어주세요."
          />
          강아지를 자유롭게 <S.Span>소개</S.Span>해주세요.
          <S.DogTextarea
            name="introduction"
            placeholder="강아지를 소개해주세요"
          />
        </S.Div>

        <S.Button type="submit">등록하기</S.Button>
      </form>
    </article>
  );
}

export default AdoptBoardCreate;
