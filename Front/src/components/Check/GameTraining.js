// 게임 시작 화면
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameTraining.style"
import GameMenu from "./GameMenu"
import GameBtn from "./GameBtn"
import {useRecoilState} from "recoil"
import { SimulationExistAtom } from "../../recoil/SimulationAtom"

function GameTraining(props) { // 자식에서 부모로 데이터 보내기
    const [simulationExistValue, setSimulationExistValue] = useRecoilState(SimulationExistAtom)
    const setHandleMove = (num) => {
        props.handleMove(num)
    }
    // 훈련 횟수
    const [trainvalue, setTrain] = useState(simulationExistValue.train)
    const [nameCallingScore, setNameCallingScore] = useState(simulationExistValue.train ? parseInt(simulationExistValue.train.substr(0, 2)) : 0)
    const [waitingScore, setWaitingScore] = useState(simulationExistValue.train ? parseInt(simulationExistValue.train.substr(2, 2)) : 0)
    const [houseScore, setHouseScore] = useState(simulationExistValue.train ? parseInt(simulationExistValue.train.substr(4, 2)) : 0)
    const [sitScore, setSitScore] = useState(simulationExistValue.train ? parseInt(simulationExistValue.train.substr(6, 2)) : 0)
    // 훈련에 따른 이미지 변경을 위한 변수
    const [animation, setAnimation] = useState("idlefast");
    const [hpPercentage, setHpPercentage] = useState(simulationExistValue.health)
    const MAX_NAME_CALLING_SCORE = 10; // 이름 부르기 훈련의 최대 점수
    const MAX_WAITING_SCORE = 20; // 기다려 훈련의 최대 점수
    const MAX_HOUSE_SCORE = 20; // 하우스 훈련의 최대 점수
    const MAX_SIT_SCORE = 30; // 앉아 훈련의 최대 점수

    
    useEffect(() => {
        if (localStorage.getItem('train')) {
            setTrain(localStorage.getItem('train'));
            setNameCallingScore(parseInt(localStorage.getItem('train').substr(0, 2)));
            setWaitingScore(parseInt(localStorage.getItem('train').substr(2, 2)));
            setHouseScore(parseInt(localStorage.getItem('train').substr(4, 2)));
            setSitScore(parseInt(localStorage.getItem('train').substr(6, 2)));
        }
        setHpPercentage(parseInt(localStorage.getItem('hpPercentage')))
    }, []);

    
    const decreaseHp = () => {
        setSimulationExistValue(prevState => {
            const newHp = Math.max(hpPercentage - 1, 0);
            setHpPercentage(newHp)
            return{
                ...prevState,
                health: newHp, // hpPercentage 대신 newHp 사용
            }
        });
    };
    

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
        decreaseHp();
        let updatedTrainValue = trainvalue;
        switch (num) {
            case 1:
                updatedTrainValue = (parseInt(updatedTrainValue) + 1000000).toString().padStart(8, '0');
                break;
            case 2:
                updatedTrainValue = (parseInt(updatedTrainValue) + 10000).toString().padStart(8, '0');
                break;
            case 3:
                updatedTrainValue = (parseInt(updatedTrainValue) + 100).toString().padStart(8, '0');
                break;
            case 4:
                updatedTrainValue = (parseInt(updatedTrainValue) + 1).toString().padStart(8, '0');
                break;
            default:
                break;
        }
    
        setSimulationExistValue(prevState => ({
            ...prevState,
            train: updatedTrainValue
        }));
        setTrain(updatedTrainValue);
    }
    
    useEffect(() => {
        // 로컬 스토리지에 HP 저장
        localStorage.setItem('hpPercentage', simulationExistValue.health);
        localStorage.setItem('train', simulationExistValue.train);
    }, [simulationExistValue]); // hpPercentage가 변경될 때마다 실행됩니다.
    
  return (
    <S.GameStartsecond className="col-10 second d-flex flex-column justify-content-between"
    petType={simulationExistValue.petType}
    changingWord={animation}>
        <audio src="/audio/GameTraining_BGM.mp3" autoPlay loop />
        <div className="d-flex justify-content-between">
            <div>
                <GameBtn className="blue" onClick={() => setHandleMove(5)}>집으로 돌아가기</GameBtn> 
            </div>
            <div>
                <GameBtn className="blue" as="div">훈련장</GameBtn>
            </div>
            <div className="d-flex flex-column justify-content-between align-items-end">
                <div className="d-flex flex-column">
                    <GameMenu borderColor="#6458F5" time={props.time}/>
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
