import React from "react";
import GenderRadio from "../../components/Radio/GenderRadio";
import ChipRadio from "../../components/Radio/ChipRadio";
import styled from "styled-components";
import SearchAuto from "./SearchAuto";
import { useState } from "react";
import * as S from "../../styled/Adopt/DogInfoSection.style";

function DogInfoSection({
  setName,
  setAge,
  setRegion,
  setGender,
  setChip,
  setDogTypeCode,
  dogGender,
  dogChip,
  dogRegion,
  dogName,
  dogAge,
  dogTypeCode,
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
          강아지의 <S.Span>견종</S.Span>을 선택해주세요.
        </S.P>
        <select onChange={(e) => setDogTypeCode(e.target.value)} value={dogTypeCode}>
          <option value="기타">기타</option>
          <option value="말티즈">말티즈</option>
          <option value="푸들">푸들</option>
          <option value="시츄">시츄</option>
          <option value="요크셔 테리어">요크셔 테리어</option>
          <option value="라사 아파소">라사 아파소</option>
          <option value="포메라니안">포메라니안</option>
          <option value="미니어처 핀셔">미니어처 핀셔</option>
          <option value="치와와">치와와</option>
          <option value="스피츠">스피츠</option>
          <option value="프렌치 불독">프렌치 불독</option>
          <option value="스코티시 테리어">스코티시 테리어</option>
          <option value="미니어처 슈나우저">미니어처 슈나우저</option>
          <option value="골든 리트리버">골든 리트리버</option>
          <option value="래브라도 리트리버">래브라도 리트리버</option>
          <option value="비숑 프리제">비숑 프리제</option>
          <option value="코카 스패니얼">코카 스패니얼</option>
          <option value="잉글리시 코카 스패니얼">잉글리시 코카 스패니얼</option>
          <option value="베들링턴 테리어">베들링턴 테리어</option>
          <option value="바셋 하운드">바셋 하운드</option>
          <option value="보더 콜리">보더 콜리</option>
          <option value="웰시 코기 펨브룩">웰시 코기 펨브룩</option>
          <option value="알래스카 말라뮤트">알래스카 말라뮤트</option>
          <option value="아키타">아키타</option>
          <option value="샤페이">샤페이</option>
          <option value="비글">비글</option>
          <option value="시베리안 허스키">시베리안 허스키</option>
          <option value="불독">불독</option>
          <option value="독일 셰퍼드">독일 셰퍼드</option>
          <option value="불마스티프">불마스티프</option>
          <option value="롯트와일러">롯트와일러</option>
        </select>

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
