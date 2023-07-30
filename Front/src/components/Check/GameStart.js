// 게임 시작 화면
import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../styled/Check/GameStart.css'
import * as S from "../../styled/Check/GameStart.style"

function GameStart(props) {
  const {onNextPage} = props
  return (
    <S.GameStartsecond className="col-10 second">
      <S.GameStartTextbox className="text-box">
        <S.GameStartPtag>가상으로 강아지를 키워보는 게임, </S.GameStartPtag>
        <S.GameStartPtag><S.GameStartSpan>키워보개</S.GameStartSpan>를 시작해보세요 !</S.GameStartPtag>
        <S.GameStartButton onClick={onNextPage}>시작하기</S.GameStartButton>
      </S.GameStartTextbox>
    </S.GameStartsecond>
    );
  }
  
  export default GameStart;
  
  