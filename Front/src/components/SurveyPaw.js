// 선호도조사 강아지 발바닥 다섯개로 점수주는 컴포넌트

import React, { useState, useEffect } from "react"; // useEffect를 import
import { PiPawPrintFill } from "react-icons/pi";
import styled from "styled-components";

const ARRAY = [0, 1, 2, 3, 4];

function SurveyPaw({ title, onSelect, initial }) {
  const [selectedIdx, setSelectedIdx] = useState(initial - 1);

  useEffect(() => {
    setSelectedIdx(initial - 1);
  }, [initial]);

  const handleStarClick = (index) => {
    setSelectedIdx(index);
    onSelect(index + 1); // 선택한 정보를 1~5 점으로 전달
  };

  return (
    <Wrap>
      <Paws>
        <p>
          <Span>{title} </Span>
          {ARRAY.map((el, idx) => (
            <PiPawPrintFill
              key={idx}
              size="40"
              onClick={() => handleStarClick(idx)}
              className={selectedIdx >= idx ? "orangePaw" : ""}
            />
          ))}
          
        </p>
      </Paws>
    </Wrap>
  );
}

export default SurveyPaw;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const Span = styled.span`
  margin: 1vw;
`;

const Paws = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  .orangePaw {
    color: #ff914d;
  }
`;
