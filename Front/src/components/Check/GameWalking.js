// 게임 시작 화면
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameWalking.style"

function GameBasicScreen(props) { // 자식에서 부모로 데이터 보내기
    const setHandleMove = (num) => {
        props.handleMove(num)
    }
  return (
    <S.GameStartsecond className="col-10 second">
        <S.GameBasicButton onClick={() => setHandleMove(5)}>집으로 돌아가기</S.GameBasicButton>
        <div className="d-flex justify-content-center">
            <S.GameWalkingHp>
                <S.GameWalkingPtag>스페이스 바를 마구 누르세요..🏃‍♀️🏃‍♂️</S.GameWalkingPtag>
            </S.GameWalkingHp>
        </div>
    </S.GameStartsecond>
    );
  }
  
  export default GameBasicScreen;
