import React from 'react';
import { PiPawPrintFill } from "react-icons/pi"; 
import styled from 'styled-components';

const ARRAY = [0, 1, 2, 3, 4];

function ResultPaw({ title, selected, small  }) {
  return (
    <Wrap>
      <Paws small={small}>
        <p>
          <Span>{title} </Span>
          {ARRAY.map((el, idx) => (
            <PiPawPrintFill
              key={idx}
              size={small ? "20" : "40"} // 작은 크기로 표시하고 싶을 때 size를 줄입니다.
              className={selected > idx ? 'orangePaw' : ''}
            />
          ))}
        </p>
      </Paws>
    </Wrap>
  );
}

export default ResultPaw;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => (props.small ? "8px" : "15px")}; // 작은 크기일 경우 패딩도 조정합니다.
`;

const Span = styled.span`
  margin: 1vw;
`;

const Paws = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    ${(props) => props.small && `
      width: 20px; // 작은 크기로 설정하고 싶은 값
      height: 20px; // 작은 크기로 설정하고 싶은 값
    `}
  }

  .orangePaw {
    color: #FF914D;
  }
`;
