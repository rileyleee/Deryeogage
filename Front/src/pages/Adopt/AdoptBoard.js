// 입양게시판 - 전체 게시글 조회 페이지
import NotLogin from "../../components/Adopt/NotLogin";
import NotSurvey from "../../components/Adopt/NotSurvey"; 
import LoginSurvey from "../../components/Adopt/LoginSurvey"; 

function AdoptBoard() {
  return (
    <div>
      <h1>AdoptBoard</h1>
      {/* 로그인X, 로그인O 선호도조사 X, 로그인O 선호도조사O 페이지 각각 보여줘야 함 */}
      <NotLogin />
      <NotSurvey />
      <LoginSurvey />

      {/* 그 다음 강아지 게시물들 보여줘야함 */}
      
    </div>
  );
}

export default AdoptBoard;
