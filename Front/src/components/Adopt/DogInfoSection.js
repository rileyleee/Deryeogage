import React from "react";
import GenderRadio from "../../components/Radio/GenderRadio";
import ChipRadio from "../../components/Radio/ChipRadio";
import styled from "styled-components";
import SearchAuto from "./SearchAuto";
import { useState } from "react";
import * as S from "../../styled/Adopt/DogInfoSection.style"

function DogInfoSection({
  setName,
  setAge,
  setRegion,
  setGender,
  setChip,
  dogGender,
  dogChip,
  dogRegion,
  dogName,
  dogAge,
}) {
  return (
    <S.Div>
      강아지의 <S.Span>기본정보</S.Span>를 작성해주세요.
      <S.DogInfo>
        <S.P>
          강아지의 <S.Span>이름</S.Span>을 작성해주세요.
        </S.P>
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={dogName}
          onChange={(e) => setName(e.target.value)}
        />

        <S.P>
          강아지의 <S.Span>나이</S.Span>를 작성해주세요.
        </S.P>
        <input
          type="number"
          name="age"
          placeholder="나이"
          value={dogAge}
          onChange={(e) => setAge(e.target.value)}
        />
        <S.P>
          현재 강아지가 살고있는 <S.Span>지역</S.Span>을 작성해주세요.
        </S.P>
        <SearchAuto region={dogRegion} setRegion={setRegion} />
        <S.P>
          <S.Span>성별</S.Span>을 선택해주세요.
          <GenderRadio gender={dogGender} setGender={setGender} />
        </S.P>
        <S.P>
          <S.Span>칩 등록 여부</S.Span>를 선택해주세요.
          <ChipRadio chip={dogChip} setChip={setChip} />
        </S.P>
      </S.DogInfo>
    </S.Div>
  );
}

export default DogInfoSection;