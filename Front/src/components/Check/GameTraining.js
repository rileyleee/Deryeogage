// 게임 시작 화면
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameTraining.style"
import GameMenu from "./GameMenu"
import GameBtn from "./GameBtn"
import {useRecoilState} from "recoil"
import { SimulationNameCalling, SimulationWaiting, SimulationHouse, SimulationSit, SimulationExistAtom } from "../../recoil/SimulationAtom"

function GameTraining(props) { // 자식에서 부모로 데이터 보내기
    const [simulationExistValue, setSimulationExistValue] = useRecoilState(SimulationExistAtom)
    const setHandleMove = (num) => {
        props.handleMove(num)
    }
    // 훈련 횟수
    const [nameCallingScore, setNameCallingScore] = useRecoilState(SimulationNameCalling)
    const [waitingScore, setWaitingScore] = useRecoilState(SimulationWaiting)
    const [houseScore, setHouseScore] = useRecoilState(SimulationHouse)
    const [sitScore, setSitScore] = useRecoilState(SimulationSit)
    // 훈련에 따른 이미지 변경을 위한 변수
    const [animation, setAnimation] = useState("idlefast");

    const MAX_NAME_CALLING_SCORE = 10; // 이름 부르기 훈련의 최대 점수
    const MAX_WAITING_SCORE = 20; // 기다려 훈련의 최대 점수
    const MAX_HOUSE_SCORE = 20; // 하우스 훈련의 최대 점수
    const MAX_SIT_SCORE = 30; // 앉아 훈련의 최대 점수

    // hpPercentage state를 추가하고 초기값으로 existData.health를 설정합니다.
    // const [hpPercentage, setHpPercentage] = useState(simulationExistValue.health);

    const decreaseHp = () => {
        // HP를 1 감소시킵니다. HP는 0 이하로 내려가지 않습니다.
        // setHpPercentage((prevHp) => Math.max(prevHp - 1, 0));
        setSimulationExistValue(prevState => ({
            ...prevState,
            health: simulationExistValue.health > 0 ? simulationExistValue.health-1 : 0,
          }));
        // localStorage.setItem('hpPercentage', hpPercentage-1)
    }

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

    const increaseScoreWithAnimation = (setter, animationName, num) => {
      increaseScore(setter);
      setAnimation(animationName);
      if (num === 1) {
        decreaseHp(); // HP 감소
        setSimulationExistValue(prevState => ({
            ...prevState,
            train: (parseInt(simulationExistValue.train)+1000000).toString().padStart(8, '0')
          }));
      } else if (num === 2) {
        decreaseHp(); // HP 감소
        setSimulationExistValue(prevState => ({
            ...prevState,
            train: (parseInt(simulationExistValue.train)+10000).toString().padStart(8, '0')
          }));
      } else if (num === 3) {
        decreaseHp(); // HP 감소
        setSimulationExistValue(prevState => ({
            ...prevState,
            train: (parseInt(simulationExistValue.train)+100).toString().padStart(8, '0')
          }));
      } else if (num === 4) {
        decreaseHp(); // HP 감소
        setSimulationExistValue(prevState => ({
            ...prevState,
            train: (parseInt(simulationExistValue.train)+1).toString().padStart(8, '0')
          }));
      }
  }

    
  return (
    <S.GameStartsecond className="col-10 second d-flex flex-column justify-content-between"
    petType={simulationExistValue.petType}
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
                    <GameMenu borderColor="#6458F5" existData={simulationExistValue} time={props.time} hp={props.hp}/>
                </div>
            </div>
        </div>
        <div className="d-flex justify-content-around">
        <S.GameTraningBox 
        onClick={() => increaseScoreWithAnimation(setNameCallingScore, "run", 1)} 
        disabled={isButtonDisabled || nameCallingScore >= MAX_NAME_CALLING_SCORE}>
            이름 부르기
            <S.GameTrainingBar score={(nameCallingScore/10)*100}>{nameCallingScore}/10</S.GameTrainingBar>
        </S.GameTraningBox>
        <S.GameTraningBox 
        onClick={() => increaseScoreWithAnimation(setWaitingScore, "idle", 2)} 
        disabled={isButtonDisabled || waitingScore >= MAX_WAITING_SCORE}>
            기다려
            <S.GameTrainingBar score={(waitingScore/20)*100}>{waitingScore}/20</S.GameTrainingBar>
        </S.GameTraningBox>
        <S.GameTraningBox 
        onClick={() => increaseScoreWithAnimation(setHouseScore, "jump", 3)} 
        disabled={isButtonDisabled || houseScore >= MAX_HOUSE_SCORE}>
            하우스
            <S.GameTrainingBar score={(houseScore/20)*100}>{houseScore}/20</S.GameTrainingBar>
        </S.GameTraningBox>
        <S.GameTraningBox 
        onClick={() => increaseScoreWithAnimation(setSitScore, "sit", 4)} 
        disabled={isButtonDisabled || sitScore >= MAX_SIT_SCORE}>
            앉아
            <S.GameTrainingBar score={(sitScore/30)*100}>{sitScore}/30</S.GameTrainingBar>
        </S.GameTraningBox>
        </div>
    </S.GameStartsecond>
    );
  }
  
  export default GameTraining;
