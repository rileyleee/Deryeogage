// 선호도조사 강아지 발바닥 다섯개로 점수주는 컴포넌트

import React, { useState } from 'react';
import { PiPawPrintFill } from "react-icons/pi"; 
import styled from 'styled-components';

const ARRAY = [0, 1, 2, 3, 4];

function SurveyPaw(props) {
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleStarClick = index => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  return (
    <Wrap>
      <p>{props.title}
      <Paws>
        {ARRAY.map((el, idx) => {
          return (
            <PiPawPrintFill
              key={idx}
              size="50"
              onClick={() => handleStarClick(el)}
              className={clicked[el] && 'orangePaw'}
            />
          );
        })}
      </Paws>
      </p>
    </Wrap>
  );
}

export default SurveyPaw;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const Paws = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }


  .orangePaw {
    color: #FF914D;
  }
`;