import styled from "styled-components";

function NotLogin() {
  return (
    <Div>
      <StyledLink href="/login">
        <Span>로그인</Span>
      </StyledLink>
      을 해서 나와 잘 맞는 강아지를 찾아보세요!
    </Div>
  );
}

export default NotLogin;

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;

export const Div = styled.div`
  font-size: 3vh;
`;

// 새로운 스타일드 컴포넌트를 정의하여 a 태그에 스타일을 적용
export const StyledLink = styled.a`
  text-decoration: none;
`;
