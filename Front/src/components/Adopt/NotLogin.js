import * as S from "../../styled/Adopt/NotLogin.style"

function NotLogin() {
  return (
    <S.Div>
      <S.StyledLink href="/login">
        <S.Span>로그인</S.Span>
      </S.StyledLink>
      을 해서 나와 잘 맞는 강아지를 찾아보세요!
    </S.Div>
  );
}

export default NotLogin;