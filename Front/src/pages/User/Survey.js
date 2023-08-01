import React, { useState } from "react";
import SurveyPaw from "../../components/SurveyPaw";
import styled from "styled-components";
import axios from "axios";

function Survey() {
  const [friendly, setFriendly] = useState(0);
  const [activity, setActivity] = useState(0);
  const [dependency, setDependency] = useState(0);
  const [bark, setBark] = useState(0);
  const [hair, setHair] = useState(0);
  const token = localStorage.getItem("accessToken");
  
  // 별점 기본값 설정
  const handleSubmit = () => {
    const data = {
      friendly,
      activity,
      dependency,
      bark,
      hair,
    };

  // 설문 데이터를 서버로 보내는 axios POST 요청
  axios
    .post("http://localhost:8080/surveys", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("설문 데이터가 성공적으로 제출되었습니다!");
    })
    .catch((error) => {
      console.error("설문 데이터 제출 오류:", error);
    });
  }

  return (
    <CenteredDiv>
      <Div>
        <h3>
          <Span>선호도조사</Span>
        </h3>
        <br />
        <p>나에게 맞는 강아지를 추천받기 위해</p>
        <p>
          <Span>선호도 조사</Span>를 진행해주세요!
        </p>

        <SurveyContainer>
          <SurveyPaw title="친화력" onSelect={setFriendly} />
          <SurveyPaw title="활동량" onSelect={setActivity} />
          <SurveyPaw title="의존성" onSelect={setDependency} />
          <SurveyPaw title="왈왈왈" onSelect={setBark} />
          <SurveyPaw title="털빠짐" onSelect={setHair} />
        </SurveyContainer>
        <Button onClick={handleSubmit}>등록하기</Button>
      </Div>
    </CenteredDiv>
  );
}

export default Survey;

const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  padding: 0;
`;

const Div = styled.div`
  margin-top: 1%;
  padding: 1vw;
  width: 100%;
  max-width: 40vw;
  min-width: 300px;
  height: auto;
  min-height: 70vh;
  background-color: white;
  border: 1px #ff914d solid;
  border-radius: 30px;
  text-align: center;
  overflow: auto;
`;

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1%;
  padding: 1vw;
`;

const Button = styled.button`
  border: none;
  background-color: #ff914d;
  padding: 0.5vw 1vw;
  border-radius: 30px;
  color: white;
  margin-top: 1vw;
`;
