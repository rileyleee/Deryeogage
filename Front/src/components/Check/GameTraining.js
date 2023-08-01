// 게임 시작 화면
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameTraining.style"
import GameMenu from "./GameMenu"
import GameBtn from "./GameBtn"
import {useRecoilState} from "recoil"
import { SimulationNameCalling, SimulationWaiting, SimulationHouse, SimulationSit } from "../../recoil/SimulationAtom"

function GameTraining(props) { // 자식에서 부모로 데이터 보내기
    const existData = props.existdata // 받아온 데이터
    console.log(existData)
    const setHandleMove = (num) => {
        props.handleMove(num)
    }
    const [nameCallingScore, setNameCallingScore] = useRecoilState(SimulationNameCalling)
    const [waitingScore, setWaitingScore] = useRecoilState(SimulationWaiting)
    const [houseScore, setHouseScore] = useRecoilState(SimulationHouse)
    const [sitScore, setSitScore] = useRecoilState(SimulationSit)
    const wordsToChange = ["idlefast", "run", "idle", "jump", "sit"]; // 변경할 단어들
    const [animation, setAnimation] = useState("idlefast");
    const increaseScore = (setter) => {
        setter((prevScore) => prevScore + 1)
    }
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 버튼 활성화

    useEffect(() => {
        if (animation !== "idlefast") {
            setIsButtonDisabled(true); // Disable buttons
            const timer = setTimeout(() => {
                setAnimation("idlefast");
                setIsButtonDisabled(false); // Enable buttons after 3 seconds
            }, 3000);

            return () => clearTimeout(timer); // Cleanup on unmount
        }
    }, [animation]);

    const increaseScoreWithAnimation = (setter, animationName) => {
        increaseScore(setter);
        setAnimation(animationName);
    }
  return (
    <S.GameStartsecond className="col-10 second d-flex flex-column justify-content-between"
    petType={existData.petType}
    changingWord={animation}>
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
            <S.GameTraningBox onClick={() => increaseScoreWithAnimation(setNameCallingScore, "run")} disabled={isButtonDisabled}>이름 부르기<S.GameTrainingBar score={(nameCallingScore/10)*100}>{nameCallingScore}/10</S.GameTrainingBar></S.GameTraningBox>
            <S.GameTraningBox onClick={() => increaseScoreWithAnimation(setWaitingScore, "idle")} disabled={isButtonDisabled}>기다려<S.GameTrainingBar score={(waitingScore/20)*100}>{waitingScore}/20</S.GameTrainingBar></S.GameTraningBox>
            <S.GameTraningBox onClick={() => increaseScoreWithAnimation(setHouseScore, "jump")} disabled={isButtonDisabled}>하우스<S.GameTrainingBar score={(houseScore/20)*100}>{houseScore}/20</S.GameTrainingBar></S.GameTraningBox>
            <S.GameTraningBox onClick={() => increaseScoreWithAnimation(setSitScore, "sit")} disabled={isButtonDisabled}>앉아<S.GameTrainingBar score={(sitScore/30)*100}>{sitScore}/30</S.GameTrainingBar></S.GameTraningBox>
        </div>
    </S.GameStartsecond>
    );
  }
  
  export default GameTraining;
