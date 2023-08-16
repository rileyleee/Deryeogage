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
        <S.Text>
          <p>따뜻한 마음을 나누는 곳, 데려가개에 오신 것을 환영합니다.</p>
          <p>로그인하고, 사랑스러운 강아지와 새로운 인연을 맺어보세요.</p>
        </S.Text>

        <S.Button onClick={handleKakaoLogin} />
      </S.LoginBox>
    </S.LoginContainer>
  );
}

export default Login;
