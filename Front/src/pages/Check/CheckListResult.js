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

  // 답변을 표시할지 결정하는 상태 추가
  const [showAnswers, setShowAnswers] = useState(false);

  const handleToggleClick = () => {
    setShowAnswers(!showAnswers);
  };

  if (!location.state) {
    // state가 없는 경우 홈페이지로 리다이렉트하거나
    // 알림 메시지를 표시하고 이전 페이지로 돌아가는 등의 처리를 해주어야 합니다.
    return <div>잘못된 접근입니다.</div>;
  }

  const { answers, score, promise } = location.state;

  return (
    <div>
      <h1>CheckListResult</h1>
      <ResultContainer>
        <TotalScore>총점: {score}</TotalScore>
        <h3>{localStorage.getItem("nickname")}님이 작성하신 입양 서약서</h3>
        <PledgeContainer>
          <p>{promise}</p>
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
