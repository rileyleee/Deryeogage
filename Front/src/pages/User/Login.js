// 로그인 페이지 컴포넌트
import React from "react";
import * as S from "../../styled/User/Login.style";

function Login() {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <S.LoginContainer>
      <S.LoginBox>
        <S.Title>로그인</S.Title>
        <S.Content>
          <p>데려가게에 오신걸 환영합니다!</p>
          <p>로그인을 하고 더 많은 기능을 이용해보세요!</p>
        </S.Content>
        
        <S.Button onClick={handleKakaoLogin} />
      </S.LoginBox>
    </S.LoginContainer>
  );
}

export default Login;
