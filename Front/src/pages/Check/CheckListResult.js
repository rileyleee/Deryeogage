import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

// styled-components 추가
const ResultContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const PledgeContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const TotalScore = styled.h2`
  margin-bottom: 20px; // 추가된 스타일
`;

const ToggleButton = styled.button`
  padding: 10px;
  font-size: 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

function CheckListResult() {
  const location = useLocation();
  const { answers, totalScore, pledge } = location.state;

  // 답변을 표시할지 결정하는 상태 추가
  const [showAnswers, setShowAnswers] = useState(false);

  const handleToggleClick = () => {
    setShowAnswers(!showAnswers);
  };

  return (
    <div>
      <h1>CheckListResult</h1>
      <ResultContainer>
        <TotalScore>총점: {totalScore}</TotalScore>
        <h3>{localStorage.getItem("nickname")}님이 작성하신 입양 서약서</h3>
        <PledgeContainer>
          <p>{pledge}</p>
        </PledgeContainer>
        <ToggleButton onClick={handleToggleClick}>
          {showAnswers ? "답변 숨기기" : "답변 보기"}
        </ToggleButton>
        {showAnswers && (
          <div>
            <h3>답변 내용:</h3>
            <ul>
              {Object.entries(answers).map(([question, answer], index) => (
                <li key={index}>
                  {question}: {answer}
                </li>
              ))}
            </ul>
          </div>
        )}
      </ResultContainer>
    </div>
  );
}

export default CheckListResult;
