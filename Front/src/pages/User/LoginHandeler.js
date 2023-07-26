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
