//LoginHandeler.js

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
// import { useRecoilState } from "recoil"; // Recoil에서 useRecoilState를 가져옴

// Recoil에서 사용할 atom 정의
// import { userNicknameState } from "./recoil/atoms"; // 적절한 파일 경로로 변경해주세요

const LoginHandeler = () => {
  const navigate = useNavigate();
  // 인가코드 뽑아오기
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  const redirectPath = localStorage.getItem("redirect") || "/";
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  // 인가코드 백으로 보내는 코드
  useEffect(() => {
    const kakaoLogin = async () => {
      await axios({
        method: "GET",
        url: `${REACT_APP_API_URL}/users/oauth?code=${code}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
        },
        withCredentials: true,
      })
        .then((res) => {
          //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
          console.log(res);
          //계속 쓸 정보들( ex: 이름) 등은 localStorage에 저장해두자
          localStorage.setItem("accessToken", res.data.data.accessToken);

          //로그인이 성공하면 이동할 페이지


          
          console.log("로그인 완료했음");
          getNickname();
          console.log("getNickname 함수 호출함");

        })
        .catch((err) => {
          console.log(err);
        });
    };
    kakaoLogin();
  }, []);

  const getNickname = async () => {
    const token = localStorage.getItem("accessToken");
    console.log(`토큰 : ${token}`);
    await axios({
      method: "GET",
      url: `${REACT_APP_API_URL}/users`,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        console.log("getNickname 함수 실행됐닥");
        localStorage.setItem("nickname", res.data.data);
        navigate(redirectPath); // 저장된 경로로 이동
        localStorage.removeItem("redirect"); // 경로 정보 삭제
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
