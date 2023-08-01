// 게임 시작 화면
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameBasicScreen.style"
import GameMenu from "./GameMenu"
import GameBtn from "./GameBtn"
import {useRecoilValue} from "recoil"
import { SimulationExistAtom } from "../../recoil/SimulationAtom"

function GameBasicScreen(props) { // 자식에서 부모로 데이터 보내기
    const existData = useRecoilValue(SimulationExistAtom)
    // const existData = props.existdata // 받아온 데이터
    const setHandleMove = (num) => {
        props.handleMove(num)
    }
    console.log(existData.petType)
    console.log(existData.petName)
    console.log(existData.background)
  return (
    <S.GameStartsecond className="col-10 second d-flex flex-column justify-content-between"
    petType={existData.petType}
    background={existData.background}
    >
        <div className="d-flex justify-content-between">
            <div>
                <GameBtn className="orange" onClick={() => setHandleMove(6)}>훈련하러 가기</GameBtn> 
                {/* 바로 실행 안되게 하려면 화살표 함수 필수.. */}
                <br />
                <GameBtn existData={existData} className="orange" onClick={() => setHandleMove(7)}>산책하러 가기</GameBtn>
            </div>
            <div>
                <GameBtn className="orange" as="div">{existData.petName}네 집</GameBtn>
            </div>
            <div className="d-flex flex-column justify-content-between align-items-end">
                <div className="d-flex flex-column">
                    <GameMenu borderColor="#FF914D" existData={existData}/>
                    <div className="d-flex flex-column align-items-end">
                    <GameBtn className="orange" data-bs-toggle="modal" data-bs-target="#exampleModal">가격표 보기</GameBtn>
                    <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-sm modal-dialog-centered">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">가격표</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <S.GameModalBody>
                                    <p>▪ 밥 2000원</p>
                                    <p>▪ 간식 1000원</p>
                                    <p>▪ 배변패드 500원</p>
                                    <p>▪ 장난감 500원</p>
                                    <p>▪ 산책 1000원</p>
                                    <p>▪ 병원비 100000원</p>
                                </S.GameModalBody>
                            </div>
                            </div>
                        </div>
                    </div>
                    <GameBtn className="orange">돈 벌러 가기</GameBtn>
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