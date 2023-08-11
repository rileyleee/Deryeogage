import React from 'react';
import { PiPawPrintFill } from "react-icons/pi";
import * as S from "../styled/ResultPaw.style"

const ARRAY = [0, 1, 2, 3, 4];

function ResultPaw({ title, selected, small  }) {
  return (
    <S.Wrap>
      <S.Paws small={small}>
        <p>
          <S.Span>{title} </S.Span>
          {ARRAY.map((el, idx) => (
            <PiPawPrintFill
              key={idx}
              size={small ? "20" : "30"} // 작은 크기로 표시하고 싶을 때 size를 줄입니다.
              className={selected > idx ? 'orangePaw' : ''}
            />
          ))}
        </p>
      </S.Paws>
    </S.Wrap>
  );
}

export default ResultPaw;
