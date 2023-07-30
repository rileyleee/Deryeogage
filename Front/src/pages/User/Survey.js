import SurveyPaw from "../../components/SurveyPaw";
import styled from "styled-components";

function Survey() {
  // 별점 기본값 설정

  return (
    <CenteredDiv>
      <Div>
        <h3>
          <Span>선호도조사</Span>
        </h3>
        <br />
        <p>나에게 맞는 강아지를 추천받기 위해</p>
        <p>
          <Span>선호도 조사</Span>를 진행해주세요!{" "}
        </p>

        <SurveyContainer>
          <SurveyPaw title="친화력" />
          <SurveyPaw title="활동량" />
          <SurveyPaw title="의존성" />
          <SurveyPaw title="짖&nbsp;&nbsp;&nbsp;&nbsp;음" />
          <SurveyPaw title="털빠짐" />
        </SurveyContainer>

        <Button>등록하기</Button>
      </Div>
    </CenteredDiv>
  );
}

export default Survey;

const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`;

const Div = styled.div`
  margin-top: 1%;
  padding: 1vw;
  width: 50vw;
  background-color: white;
  border: 1px #ff914d solid;
  border-radius: 30px;
  text-align: center;
`;

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1%;
`;

const Button = styled.button`
  border: none;
  background-color: #ff914d;
  padding: 0.5vw 1vw;
  border-radius: 30px;
  color: white;
  margin-top: 1vw;
`;
