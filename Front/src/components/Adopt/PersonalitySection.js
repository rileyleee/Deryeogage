import React from "react";
import SurveyPaw from "../../components/SurveyPaw";
import * as S from "../../styled/Adopt/PersonalitySection.style";

function PersonalitySection({
  friendly,
  activity,
  dependency,
  bark,
  hair,
  setFriendly,
  setActivity,
  setDependency,
  setBark,
  setHair,
}) {
  return (
    <S.Div>
      강아지의 <S.Span>성격</S.Span>과 <S.Span>특성</S.Span>을 선택해주세요.
      <S.DogCheck>
        <S.CheckPaw>
        <SurveyPaw title="친화력" value={friendly} onSelect={setFriendly} />
        <SurveyPaw title="활동량" value={activity} onSelect={setActivity} />
        <SurveyPaw title="의존성" value={dependency} onSelect={setDependency} />
        <SurveyPaw title="왈왈왈" value={bark} onSelect={setBark} />
        <SurveyPaw title="털빠짐" value={hair} onSelect={setHair} />
        </S.CheckPaw>
        <S.Text>
          강아지의 성격과 특성을 선택하면 <br /> 입양자의 선호도조사 결과에 따라
          추천이 가능하게 됩니다.
        </S.Text>
      </S.DogCheck>
    </S.Div>
  );
}

export default PersonalitySection;
