import React, { useEffect, useState } from "react";
import axios from "axios"; // axios 추가
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NotLogin from "../../components/Adopt/NotLogin";
import NotSurvey from "../../components/Adopt/NotSurvey";
import LoginSurvey from "../../components/Adopt/LoginSurvey";
import DogListItem from './../../components/Adopt/DogListItem'; // 올바른 경로로 수정

function AdoptBoard() {
  const navigate = useNavigate();
  const [adoptData, setAdoptData] = useState(null);

  // 로그인 완료 했는지
  const insertedToken = localStorage.getItem("accessToken");
  // 설문 완료 했는지
  const hasCompletedSurvey = localStorage.getItem("surveyData");

  // 로그인 후에 이동할 페이지 정보를 로컬 스토리지에서 가져와서 처리
  useEffect(() => {
    const clickedPage = localStorage.getItem("clickedPage");
    if (insertedToken && clickedPage) {
      navigate(clickedPage);
      localStorage.removeItem("clickedPage"); // 이동한 페이지 정보를 삭제
    }
  }, [navigate, insertedToken]);

  // "글 작성하기" 버튼 클릭 이벤트 핸들러
  const onClick = () => {
    // 로그인이 되어있지 않으면 로그인 페이지로 이동
    if (!insertedToken) {
      navigate("/login");
    } else {
      navigate("/adopt/create");
    }
  };

  // 강아지 정보를 서버로부터 가져오는 함수
  const fetchDogs = async () => {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/boards/list`);
      console.log(response.data.data.content)
      setAdoptData({
      board: response.data.data.content,
    })
  }catch (error) {
      console.error(error);
    }
  };
  const dogsArray = Array.isArray(adoptData) ? adoptData : [];

  useEffect(() => {
    fetchDogs(); // 컴포넌트가 처음 렌더링될 때에만 강아지 정보를 가져옴
  }, []);

  return (
    <div>
      <h1>AdoptBoard</h1>
      {/* 로그인X, 로그인O 선호도조사 X, 로그인O 선호도조사O 페이지 각각 보여줘야 함 */}
      {insertedToken && hasCompletedSurvey ? <LoginSurvey /> : null}
      {insertedToken && !hasCompletedSurvey ? <NotSurvey /> : null}
      {!insertedToken ? <NotLogin /> : null}

      <Button onClick={onClick}>글 작성하기</Button>

      {/* 게시판 형식으로 강아지 정보들을 렌더링 */}
      {dogsArray.map((dog) => (
        <DogListItem key={adoptData.id} dog={adoptData} />
      ))} 
    </div>
  );
}

export default AdoptBoard;

export const Button = styled.button`
  border: none;
  background-color: #ff914d;
  padding: 0.5vw 1vw;
  border-radius: 30px;
  color: white;
  margin-top: 1vw;
  left: 50%;
  transform: translateX(-50%); /* Add this to center the button horizontally */
  position: relative; /* Add this to enable the horizontal centering */

  /* Additional styles (optional) */
  display: block;
  width: fit-content;
  cursor: pointer;
`;
