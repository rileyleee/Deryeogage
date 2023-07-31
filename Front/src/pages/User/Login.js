// 로그인 페이지 컴포넌트
import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  background-color: #ff914d;
  padding: 0.5vw 1vw;
  border-radius: 30px;
  color: white;
  margin-top: 1vw;
  cursor: pointer; /* 커서를 손가락 모양으로 변경 */
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 89vh;
`;

const LoginBox = styled.div`
  padding: 1.5rem;
  background-color: white;
  border: 1px #ff914d solid;
  border-radius: 30px;
  text-align: center;
  margin-top: 1%;
  padding: 1vw;
  width: 40vw;
  height: 60vh;
`;

const Title = styled.h3`
  color: rgba(255, 145, 77, 1);
  margin-bottom: 1rem;
`;

function Login() {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>로그인</Title>
        <p>데려가게에 오신걸 환영합니다!</p>
        <p>로그인을 하고 더 많은 기능을 이용해보세요!</p>
        <Button onClick={handleKakaoLogin}>카카오로그인</Button>
      </LoginBox>
    </LoginContainer>
  );
}

export default Login;
