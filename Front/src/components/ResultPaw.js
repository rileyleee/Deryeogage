import React from 'react';
import { PiPawPrintFill } from "react-icons/pi"; 
import styled from 'styled-components';

const ARRAY = [0, 1, 2, 3, 4];

function ResultPaw({ title, selected }) {
  return (
    <Wrap>
      <Paws>
        <p>
          <Span>{title} </Span>
          {ARRAY.map((el, idx) => (
            <PiPawPrintFill
              key={idx}
              size="40"
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
  }

  .orangePaw {
    color: #FF914D;
  }
`;
