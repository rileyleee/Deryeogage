// DogInfoSection.js

import React from "react";
import GenderRadio from "../../components/Radio/GenderRadio";
import ChipRadio from "../../components/Radio/ChipRadio";
import styled from "styled-components";

function DogInfoSection() {
  return (
    <Div>
      강아지의 <Span>기본정보</Span>를 작성해주세요.
      <DogInfo>
        <P>
          강아지의 <Span>이름</Span>을 작성해주세요.
        </P>
          <input type="text" name="name" placeholder="이름" />

        <P>강아지의 <Span>나이</Span>를 작성해주세요.</P>
        <input type="text" name="age" placeholder="나이" />
        <P>현재 강아지가 살고있는 <Span>지역</Span>을 작성해주세요.</P>
        <input type="text" name="region" placeholder="지역" />
        <P>
        <Span>성별</Span>을 선택해주세요.
          <GenderRadio />
        </P>
        <P>
        <Span>칩 등록 여부</Span>를 선택해주세요.
          <ChipRadio />
        </P>
      </DogInfo>
    </Div>
  );
}

export default DogInfoSection;

export const DogInfo = styled.div`
  /* 스타일을 추가하여 간격을 줍니다. */
  margin: 1vw 0;
  padding: 1vh;
  border: 1px #ff914d solid;
  border-radius: 30px;
  background-color: white;
  text-align: center;
`;
export const Div = styled.div`
  /* 스타일을 추가하여 간격을 줍니다. */
  margin: 1vw 0;
  padding: 1vh;
  font-size: 2vh;
`;

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;
export const P = styled.div`
  margin: 1vh;
  padding-top: 1vh;
`;
