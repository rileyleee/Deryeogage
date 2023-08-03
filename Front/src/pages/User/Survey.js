import React, { useState, useEffect } from "react";
import SurveyPaw from "../../components/SurveyPaw";
import styled from "styled-components";
import axios from "axios";

function Survey() {
  const [ranking, setRanking] = useState([0, 1, 2, 3, 4]);
  const [friendly, setFriendly] = useState(0);
  const [activity, setActivity] = useState(0);
  const [dependency, setDependency] = useState(0);
  const [bark, setBark] = useState(0);
  const [hair, setHair] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const token = localStorage.getItem("accessToken");

  const titles = ["친화력", "활동량", "의존성", "왈왈왈", "털빠짐"];
  const selectors = [setFriendly, setActivity, setDependency, setBark, setHair];

  useEffect(() => {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    axios
      .get(`${REACT_APP_API_URL}/surveys`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        if (response.data.length > 0) {
          setHasSubmitted(true);
        }
      })
      .catch((error) => {
        console.error("설문 데이터 확인 오류:", error);
      });
  }, []);

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("index");
    const newRanking = [...ranking];
    const [removed] = newRanking.splice(draggedIndex, 1);
    newRanking.splice(index, 0, removed);
    setRanking(newRanking);
  };

  const handleSubmit = () => {
    const rankingString = ranking.map((item) => item + 1).join("");
    console.log("현재 순서:", rankingString);
    const data = {
      friendly: friendly.toString(),
      activity: activity.toString(),
      dependency: dependency.toString(),
      bark: bark.toString(),
      hair: hair.toString(),
      ranking: rankingString,
    };
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    axios
      .post(`${REACT_APP_API_URL}/surveys`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("설문 데이터가 성공적으로 제출되었습니다!", response);
        setHasSubmitted(true);
      })
      .catch((error) => {
        console.error("설문 데이터 제출 오류:", error);
      });
  };

  const handleUpdate = () => {
    const rankingString = ranking.map((item) => item + 1).join("");
    console.log("현재 순서:", rankingString);
    const data = {
      friendly: friendly.toString(),
      activity: activity.toString(),
      dependency: dependency.toString(),
      bark: bark.toString(),
      hair: hair.toString(),
      ranking: rankingString,
    };
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    axios
      .put(`${REACT_APP_API_URL}/surveys`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("설문 데이터가 성공적으로 수정되었습니다!", response);
        setHasSubmitted(true);
      })
      .catch((error) => {
        console.error("설문 데이터 수정 오류:", error);
      });
  };

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
          {ranking.map((item, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, index)}
            >
              <SurveyPaw title={titles[item]} onSelect={selectors[item]} />
            </div>
          ))}
        </SurveyContainer>
        {hasSubmitted ? (
          <Button onClick={handleUpdate}>수정하기</Button>
        ) : (
          <Button onClick={handleSubmit}>등록하기</Button>
        )}
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
