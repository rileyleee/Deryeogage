import * as S from "../../styled/Adopt/NotSurvey.style";

function NotSurvey() {
  return (
    <S.Div>
      <S.StyledLink href="/survey">
        <S.Span>선호도조사</S.Span>
      </S.StyledLink>
      를 하면 {localStorage.getItem('nickname')}님과 함께 할 강아지를 추천해드려요!
    </S.Div>
  );
}

export default NotSurvey;
