// 게임 시작 화면
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameTraining.style"
import GameMenu from "./GameMenu"
import GameBtn from "./GameBtn"

function GameBasicScreen(props) { // 자식에서 부모로 데이터 보내기
    const existData = props.existdata // 받아온 데이터
    const setHandleMove = (num) => {
        props.handleMove(num)
    }
  return (
    <S.GameStartsecond className="col-10 second d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between">
            <div>
                <GameBtn className="blue" onClick={() => setHandleMove(5)}>집으로 돌아가기</GameBtn> 
            </div>
            <div>
                <GameBtn className="blue" as="div">훈련장</GameBtn>
            </div>
            <div className="d-flex flex-column justify-content-between align-items-end">
                <div className="d-flex flex-column">
                    <GameMenu borderColor="#6458F5" existData={existData}/>
                </div>
            </div>
        </div>
        <div className="d-flex justify-content-around">
            <S.GameTraningBox>이름 부르기<S.GameTrainingBar></S.GameTrainingBar></S.GameTraningBox>
            <S.GameTraningBox>기다려<S.GameTrainingBar></S.GameTrainingBar></S.GameTraningBox>
            <S.GameTraningBox>하우스<S.GameTrainingBar></S.GameTrainingBar></S.GameTraningBox>
            <S.GameTraningBox>앉아<S.GameTrainingBar></S.GameTrainingBar></S.GameTraningBox>
        </div>
    </S.GameStartsecond>
    );
  }
  
  export default GameBasicScreen;
