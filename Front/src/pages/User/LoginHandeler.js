//LoginHandeler.js

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const LoginHandeler = (props) => {
  const navigate = useNavigate();
  // 인가코드 뽑아오기
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  // 인가코드 백으로 보내는 코드
  useEffect(() => {
    const kakaoLogin = async () => {
      await axios({
        method: "GET",
        url: `http://localhost:8080/users/oauth?code=${code}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
          "Access-Control-Allow-Origin": "*", //이건 cors 에러때문에 넣어둔것. 당신의 프로젝트에 맞게 지워도됨
        },
      }).then((res) => {
        //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
        console.log(res);
        //계속 쓸 정보들( ex: 이름) 등은 localStorage에 저장해두자
        localStorage.setItem("accessToken", res.data.data.accessToken);

        //로그인이 성공하면 이동할 페이지
        navigate("/");
      }).catch((err) => {
        console.log(err)
      })
    };
    kakaoLogin();
  }, [props.history]);

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
