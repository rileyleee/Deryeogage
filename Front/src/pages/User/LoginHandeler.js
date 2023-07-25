//LoginHandeler.js

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const LoginHandeler = (props) => {
  const navigate = useNavigate();
  // 인가코드 뽑아오기
  const code = new URL(window.location.href).searchParams.get("code");

  // 인가코드 백으로 보내는 코드
  useEffect(() => {
    const kakaoLogin = async () => {
      await axios({
        method: "GET",
        url: `http://localhost:3000/oauth?code=${code}`,
      }).then((res) => {
        //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
        console.log(res);
        //계속 쓸 정보들은 localStorage에 저장해두자
        localStorage.setItem("token", res.data.accessToken);
        //로그인이 성공하면 이동할 페이지
        navigate("/");
      });
    };
    kakaoLogin();
  }, []);

  return (
    <div className="LoginHandeler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  );
};

export default LoginHandeler;
