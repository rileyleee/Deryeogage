import React, { useEffect } from "react";
import GenderRadio from "../../components/Radio/GenderRadio";
import ChipRadio from "../../components/Radio/ChipRadio";
import SearchAuto from "./SearchAuto";
import { useState } from "react";
import * as S from "../../styled/Adopt/DogInfoSection.style";
import { PiPawPrintFill } from "react-icons/pi";

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
  initialRegion,
  initialDogTypeCode,
}) {
  const [hasRegionChanged, setHasRegionChanged] = useState(false);
  const [hasDogTypeChanged, setHasDogTypeChanged] = useState(false); // 이 상태도 추가합니다.

  useEffect(() => {
    if (!hasRegionChanged) {
      setRegion(initialRegion);
    }
  }, [hasRegionChanged, initialRegion, setRegion]);
  useEffect(() => {
    if (!hasDogTypeChanged) {
      setDogTypeCode(initialDogTypeCode);
    }
  }, [hasDogTypeChanged, initialDogTypeCode, setDogTypeCode]);

  const handleRegionChange = (regionValue) => {
    if (regionValue !== initialRegion) {
      setHasRegionChanged(true);
      setRegion(regionValue);
    }
  };

  const handleDogTypeCodeChange = (typeCodeValue) => {
    if (typeCodeValue !== initialDogTypeCode) {
      setHasDogTypeChanged(true);
      setDogTypeCode(typeCodeValue);
    }
  };
  return (
    <S.Div>
      <PiPawPrintFill style={{color:"#FF914D", marginBottom:"0.2vw"}}></PiPawPrintFill> 강아지의 <S.Span>기본정보</S.Span>를 작성해주세요.
      <S.DogInfo>
        <S.P>
        <PiPawPrintFill style={{color:"#FF914D", marginBottom:"0.2vw"}}></PiPawPrintFill> 강아지의 <S.Span>이름</S.Span>을 작성해주세요.
          <S.Tooltip>
            ⓘ
            <S.TooltipText className="tooltiptext">
              이름은 10자까지 <br /> 작성할 수 있습니다.
            </S.TooltipText>
          </S.Tooltip>
        </S.P>
        <S.StyledInput
          type="text"
          name="name"
          placeholder="이름"
          value={dogName}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (inputValue.length > 10) {
              setName(inputValue.slice(0, 10)); // 입력값이 10글자를 초과하면 10글자로 자르기
            } else {
              setName(inputValue);
            }
          }}
        />
        <br />

        <S.P>
        <PiPawPrintFill style={{color:"#FF914D", marginBottom:"0.2vw"}}></PiPawPrintFill> 강아지의 <S.Span>나이</S.Span>를 작성해주세요.

        </S.P>
        <S.AgeInput
          type="number"
          name="age"
          placeholder="나이"
          value={dogAge}
          style={{ textAlign: "right" }} // 오른쪽 정렬
          min="0"
          max="25"
          onChange={(e) => {
            if (e.target.value > 25) {
              setAge(25); // 값이 20을 초과하면 20으로 설정
            } else {
              setAge(e.target.value);
            }
          }}
        />

        <S.P>
        <PiPawPrintFill style={{color:"#FF914D", marginBottom:"0.2vw"}}></PiPawPrintFill> 강아지의 <S.Span>견종</S.Span>을 선택해주세요.
        </S.P>
        <S.StyledSelect
          onChange={(e) => handleDogTypeCodeChange(e.target.value)}
          value={dogTypeCode}
        >
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
        </S.StyledSelect>

        <S.P>
        <PiPawPrintFill style={{color:"#FF914D", marginBottom:"0.2vw"}}></PiPawPrintFill> 현재 강아지가 살고있는 <S.Span>지역</S.Span>을 검색한 후 선택해주세요.
        </S.P>
        <SearchAuto
          region={dogRegion}
          setRegion={handleRegionChange}
          initialValue={initialRegion}
        />
        <S.P>
        <PiPawPrintFill style={{color:"#FF914D", marginBottom:"0.2vw"}}></PiPawPrintFill><S.Span> 성별</S.Span>을 선택해주세요.
          <div style={{marginLeft:"2vw"}}>
            <GenderRadio gender={dogGender} setGender={setGender} />
          </div>
        </S.P>
        <S.P>
        <PiPawPrintFill style={{color:"#FF914D", marginBottom:"0.2vw"}}></PiPawPrintFill><S.Span> 칩 등록 여부</S.Span>를 선택해주세요.
        <div style={{marginLeft:"2vw"}}>
          <ChipRadio chip={dogChip} setChip={setChip} />
        </div>
        </S.P>
      </S.DogInfo>
    </S.Div>
  );
}

export default DogInfoSection;
