// 입양게시판 - 전체 게시글 조회 페이지
import styled from "styled-components";
import NotLogin from "../../components/Adopt/NotLogin";
import NotSurvey from "../../components/Adopt/NotSurvey";
import LoginSurvey from "../../components/Adopt/LoginSurvey";
import DogListItem from './../../components/Adopt/DogListItem';

import { useNavigate } from "react-router-dom";

function AdoptBoard() {
  const navigate = useNavigate();
  const onClick = () => {
    // 로그인이 되어있지 않으면 로그인 페이지로 이동
    if(!insertedToken) {
      navigate("/login");
    } else {
      navigate("/adopt/create");
    }
  };
  // 로그인 완료 했는지
  const insertedToken = localStorage.getItem("accessToken");
  // 설문 완료 했는지
  const hasCompletedSurvey = localStorage.getItem("surveyData");
  return (
    <div>
      <h1>AdoptBoard</h1>
      {/* 로그인X, 로그인O 선호도조사 X, 로그인O 선호도조사O 페이지 각각 보여줘야 함 */}
      {insertedToken && hasCompletedSurvey ? <LoginSurvey /> : null}
      {insertedToken && !hasCompletedSurvey ? <NotSurvey /> : null}
      {!insertedToken ? <NotLogin /> : null}

      {/* 그 다음 강아지 게시물들 보여줘야함 */}
      <DogListItem />
      <Button onClick={onClick}>글 작성하기</Button>
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