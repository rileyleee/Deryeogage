import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { InfoContainer } from "./CheckList";

// styled-components 추가
const ResultContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ff914d;
  border-radius: 25px;
  background-color: #f9f9f9;
`;

const PledgeContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  border-radius: 5px;
  background-color: #FFF0D7;
`;

const FitnessContainer = styled.div`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
`;

const AnswersContainer = styled.div`
  ul {
    list-style-type: none;

    li {
      margin-bottom: 5px;
    }
  }
`;

const TotalScore = styled.h2`
  margin-bottom: 20px; // 추가된 스타일
`;

const ToggleButton = styled.button`
  margin-right: 20px;
  padding: 10px;
  font-size: 1em;
  background-color: #ff914d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #eb7d39;
  }
`;

const DeleteButton = styled.button`
  padding: 10px;
  font-size: 1em;
  background-color: #ff914d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #eb7d39;
  }
`;

function CheckListResult() {
  const navigate = useNavigate();

  // 답변을 표시할지 결정하는 상태 추가
  const [showAnswers, setShowAnswers] = useState(false);
  const [answers, setAnswers] = useState({});
  const [data, setData] = useState({ score: "", promise: "" });

  const handleDeleteClick = async () => {
    // 삭제 버튼 핸들러 추가
    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/pretests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("answers");
      localStorage.removeItem("promise");
      navigate("/checklist"); // 삭제 후 체크리스트 페이지로 이동
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    // 토큰은 어떤 방식으로 저장되어 있는지에 따라 가져오는 방식이 달라집니다.
    // 아래의 코드는 localStorage에 'token' 이름으로 저장되어 있다고 가정한 것입니다.
    const token = localStorage.getItem("accessToken");
    // Get the stored answers from local storage
    const storedAnswers = JSON.parse(localStorage.getItem("answers") || "{}");
    setAnswers(storedAnswers);
    axios
      .get(`${process.env.REACT_APP_API_URL}/pretests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData({
          score: response.data.data.score,
          promise: response.data.data.promise,
        });
        console.log(response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleToggleClick = () => {
    setShowAnswers(!showAnswers);
  };
  console.log(data);

  const getAnswerColor = (answer) => {
    switch (answer) {
      case '아주많이':
        return 'red';
      case '많이':
        return '#ff914d'; // 주황색
      default:
        return 'black'; // 기본 텍스트 색상
    }
  };

  return (
    <div>
      <InfoContainer>
        <h4><span>사전테스트</span> 결과를 확인해보세요 !</h4>
      </InfoContainer>
      <ResultContainer>
        <TotalScore>{localStorage.getItem("nickname")}님의 적합도 점수: {data.score} </TotalScore>
        <FitnessContainer>
          {data.score < 50 ? 
            <p>입양 적합도 여부 <span>❌</span></p> : 
            <p>입양 적합도 여부 <span>✅</span></p>
          }
        </FitnessContainer>
        <h3>입양 서약서</h3>
        <PledgeContainer>
          <p>{data.promise}</p>
        </PledgeContainer>
        <p>입양서약서와 사전테스트 점수는 분양자가 <span>확인</span>할 수 있습니다.</p>
        <ButtonContainer>
          <ToggleButton onClick={handleToggleClick}>
            {showAnswers ? "답변 숨기기" : "답변내용 확인하기"}
          </ToggleButton>
          <DeleteButton onClick={handleDeleteClick}>다시 진행하기</DeleteButton> 
        </ButtonContainer>
          {showAnswers && (
            <AnswersContainer>
              <ul>
                {Object.entries(answers).map(([question, answer], index) => (
                  <li key={index} style={{ color: getAnswerColor(answer) }}>
                    {question}: {answer}
                  </li>
                ))}
              </ul>
            </AnswersContainer>
          )}
      </ResultContainer>
    </div>
  );
}

export default CheckListResult;
