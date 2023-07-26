// 선호도 조사 페이지

import SurveyPaw from "../../components/SurveyPaw";
import styled from "styled-components";

function Survey() {
  // 별점 기본값 설정

  return (
    <div>
      <p>선호도조사</p>
      <p>나에게 맞는 강아지를 추천받기 위해 </p>
      <p><Span>선호도 조사</Span>를 진행해주세요! </p>
      <SurveyPaw title="친화력" />
      <SurveyPaw title="활동량" />
      <SurveyPaw title="의존성" />
      <SurveyPaw title="짖음" />
      <SurveyPaw title="털빠짐" />
      <button>등록하기</button>
    </div>
  );
}

export default Survey;

const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;
