// 게임 시작 화면
import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameBasicScreen.style"
import GameMenu from "./GameMenu"
import GameBtn from "./GameBtn"
import {useRecoilValue, useRecoilState} from "recoil"
import { SimulationExistAtom, SimulationWalkingCnt } from "../../recoil/SimulationAtom"
// import crying from "../../../public/assets/crying.jpg"

function GameBasicScreen(props) { // 자식에서 부모로 데이터 보내기
    const existData = useRecoilValue(SimulationExistAtom)
    const walkingCnt = useRecoilValue(SimulationWalkingCnt)
    // const [hour, setHour] = useRecoilState(SimulationHours)
    // const [minute, setMinute] = useRecoilState(SimulationMinutes)
    // const existData = props.existdata // 받아온 데이터
    console.log(existData.background, "ㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗ")
    const setHandleMove = (num) => {
        props.handleMove(num)
    }
    // // 시간 계산
    // const timeDifferenceFromStorage = JSON.parse(localStorage.getItem('timeDifference')); // 로컬스토리지에서 시간 가져옴
    // let initialHoursDifference, initialMinutesDifference;
    // if (timeDifferenceFromStorage) { // 존재하면
    //     // If timeDifference exists in localStorage, use it
    //     initialHoursDifference = timeDifferenceFromStorage.hours; // 시간
    //     initialMinutesDifference = timeDifferenceFromStorage.minutes; // 분

    // } else { // 존재하지 않으면
    //     // If timeDifference does not exist in localStorage, calculate it
    //     initialHoursDifference = (Number(existData.lastTime.substr(11, 2)) - Number(existData.startTime.substr(11, 2)) + 24) % 24; // 시간 계산
    //     initialMinutesDifference = (Number(existData.lastTime.substr(14, 2)) - Number(existData.startTime.substr(14, 2)) + 60) % 60; // 분 계산
    //     setHour(initialHoursDifference)
    //     setMinute(initialMinutesDifference)

    //     if (initialMinutesDifference < 0) {
    //         initialMinutesDifference += 60;
    //         initialHoursDifference -= 1;
    //         setHour(initialHoursDifference)
    //         setMinute(initialMinutesDifference)
    //         // props.setHpPercentage(existData.health)
    //     }
    //     }
        
  return (
    <S.GameStartsecond className="col-10 second d-flex flex-column justify-content-between"
    petType={existData.petType}
    background={existData.background}
    >
        <div className="d-flex justify-content-between">
            <div>
                <GameBtn className="orange" onClick={() => setHandleMove(6)} >훈련하러 가기</GameBtn> 
                {/* 바로 실행 안되게 하려면 화살표 함수 필수.. */}
                <br />
                <GameBtn existData={existData} className="orange" onClick={() => {props.walkingIncreaseHp(walkingCnt); setHandleMove(7);}}>산책하러 가기</GameBtn>
            </div>
            <div>
                <GameBtn className="orange" as="div">{existData.petName}네 집</GameBtn>
            </div>
            <div className="d-flex flex-column justify-content-between align-items-end">
                <div className="d-flex flex-column">
                    <GameMenu borderColor="#FF914D" existData={existData} time={props.time} hp={props.hp}/>
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
            <S.GameBasicOver data-bs-toggle="modal" data-bs-target="#exampleModal1">중도포기하기</S.GameBasicOver>
        </div>
        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        중도 포기는 불가합니다.
                        <S.ModalIMG src="assets/crying.jpg" alt="crying" />
                    </div>
                </div>
            </div>
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