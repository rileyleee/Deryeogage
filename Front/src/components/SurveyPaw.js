// 선호도조사 강아지 발바닥 다섯개로 점수주는 컴포넌트

import React, { useState, useEffect } from "react"; // useEffect를 import
import { PiPawPrintFill } from "react-icons/pi";
import * as S from "../styled/SurveyPaw.style"

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
    <S.Wrap>
      <S.Paws>
        <p>
          <S.Span>{title} </S.Span>
          {ARRAY.map((el, idx) => (
            <PiPawPrintFill
              key={idx}
              size="40"
              onClick={() => handleStarClick(idx)}
              className={selectedIdx >= idx ? "orangePaw" : ""}
            />
          ))}
          
        </p>
      </S.Paws>
    </S.Wrap>
  );
}

export default SurveyPaw;
