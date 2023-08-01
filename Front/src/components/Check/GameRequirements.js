// 게임 시작 화면
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameRequirements.style"

function GameBasicScreen(props) { // 자식에서 부모로 데이터 보내기
    const setHandleMove = (num) => {
        props.handleMove(num)
    }
  return (
    <S.GameStartsecond className="col-10 second d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between">
            <div>
                <S.GameBasicButton onClick={() => setHandleMove(6)}>훈련하러 가기</S.GameBasicButton> 
                {/* 바로 실행 안되게 하려면 화살표 함수 필수.. */}
                <br />
                <S.GameBasicButton onClick={() => setHandleMove(7)}>산책하러 가기</S.GameBasicButton>
            </div>
            <div>
                <S.GameBasicButton as="div">뽀리네 집</S.GameBasicButton>
            </div>
            <div className="d-flex flex-column justify-content-between align-items-end">
                <div className="d-flex flex-column">
                    <S.GameBasicMenu className="d-flex">
                        <S.GameBasicIcon>
                            <p>⏰</p>
                            <p>💸</p>
                            <p>💖</p>
                            <p>🌞</p>
                        </S.GameBasicIcon>
                        <div>
                            <p>20:00</p>
                            <p>300,000원</p>
                            <S.GameBasicHp></S.GameBasicHp>
                            <p>날씨 맑음</p>
                        </div>
                    </S.GameBasicMenu>
                    <div className="d-flex flex-column align-items-end">
                    <S.GameBasicButton>가격표 보기</S.GameBasicButton>
                    <S.GameBasicButton>돈 벌러 가기</S.GameBasicButton>
                    </div>
                </div>
            </div>
        </div>
        <div className="d-flex justify-content-end">
            <S.GameBasicOver>중도포기하기</S.GameBasicOver>
        </div>
    </S.GameStartsecond>
    );
  }
  
  export default GameBasicScreen;
  
//   <S.GameBasicMenu>
//   <div>
//   <S.GameBasicSpan>⏰</S.GameBasicSpan>
//   <span>20:00</span>
//   </div>
//   <div>
//   <S.GameBasicSpan>💸</S.GameBasicSpan>
//   <span>300,000원</span>
//   </div>
//   <div className="d-flex align-items-center">
//   <S.GameBasicSpan>💖</S.GameBasicSpan>
//   <S.GameBasicHp></S.GameBasicHp>
//   </div>
//   <div>
//   <S.GameBasicSpan>🌞</S.GameBasicSpan>
//   <span>날씨 맑음</span>
//   </div>
// </S.GameBasicMenu>