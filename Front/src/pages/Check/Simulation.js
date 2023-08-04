// 게임 시작 화면
import React, { useState, useEffect, useCallback } from 'react';
import GameText from '../../components/Check/GameText'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/Simulation.style"
import GameStart from "../../components/Check/GameStart";
import GamePick1 from "../../components/Check/GamePick1";
import GamePick2 from "../../components/Check/GamePick2";
import GameDogChip from "../../components/Check/GameDogChip";
import GameBasicScreen from "../../components/Check/GameBasicScreen";
import GameTraining from "../../components/Check/GameTraining";
import GameWalking from "../../components/Check/GameWalking"
import GameMeal from "../../components/Check/GameMeal"
import GamePoop from "../../components/Check/GamePoop"
import GameTreat from "../../components/Check/GameTreat"
import GameToy from "../../components/Check/GameToy"
import {useRecoilValue, useRecoilState} from "recoil"
import { SimulationNum, SimulationExistAtom, SimulationWalkingCnt, SimulationStartAtom, SimulationHp
 } from "../../recoil/SimulationAtom"
import {useLocation} from "react-router-dom"
import axios from 'axios';

function Simulation() {
  const location = useLocation()
  // localStorage에서 값을 가져와서 초기 상태를 설정합니다.
  const [activatedNum, setActivatedNum] = useState(() => parseInt(localStorage.getItem('activatedNum'), 10)) 
  // 다음, 이전 페이지로 이동하기 위한 변수
  // activatedNum이 변경될 때마다 localStorage를 업데이트 합니다.
    // 데이터 로컬스토리지에 등록
    const [simulationExistValue, setSimulationExistValue] = useRecoilState(SimulationExistAtom)
    console.log(simulationExistValue)
    // const [hpPercentage, setHpPercentage] = useRecoilState(SimulationHp)
    const [timeDifference, setTimeDifference] = useState(JSON.parse(localStorage.getItem('timeDifference')))

    // 시간 및 hp 계산
    useEffect(() => {
      let hpTimer = 0;
      const timerId = setInterval(() => {
          setTimeDifference(prevTimeDifference => {
              let newMinutes = prevTimeDifference.minutes + 1;
              let newHours = prevTimeDifference.hours;

              if (newMinutes >= 60) {
                  newMinutes -= 60;
                  newHours += 1;
              }

              if (newHours >= 24) {
                  newHours -= 24;
              }

              return {
                  hours: newHours, // 시간 및 분 계산해서 리턴 === timeDifference에 저장됨
                  minutes: newMinutes
              };
          });

          hpTimer += 1;
          if (hpTimer >= 10) { // 10분마다 HP 감소
              // setHpPercentage((prevHpPercentage) => prevHpPercentage > 0 ? prevHpPercentage - 1 : 0);
              setSimulationExistValue(prevState => ({
                ...prevState,
                health: simulationExistValue.health > 0 ? simulationExistValue.health-1 : 0,
              }));
              hpTimer = 0;
              // localStorage.setItem('hpPercentage', simulationExistValue.health); 
          }
      }, 60000); // 1분에 한 번씩 실행됩니다.

      return () => clearInterval(timerId); // 컴포넌트가 unmount될 때 타이머를 정리합니다.
  }, []); 
  
  // 로컬 스토리지 값도 계속 업데이트
  useEffect(() => {
      // localStorage.setItem('hpPercentage', simulationExistValue.health); 
      localStorage.setItem('timeDifference', JSON.stringify(timeDifference)); // 값이 변했으니까 로컬에 다시 저장
  }, [timeDifference]);

  // 화면에 보여주는 값으로 변경해서 보여주기
  const displayTime = () => {
    console.log(timeDifference, timeDifference.hours)
      return `${timeDifference.hours.toString().padStart(2, '0')}:${timeDifference.minutes.toString().padStart(2, '0')}`;
  }

  useEffect(() => {
    // 현재 주소를 가져옵니다.
    const currentPath = location.pathname;
    // console.log(currentPath)
  
    // 만약 현재 주소가 http://localhost:8080/simulations/2941475981이 아닌 경우에만 activatedNum을 5로 변경합니다.
    if (currentPath !== "/simulations") {
      setActivatedNum(5);
    }
  }, [location]);
  

  // 컴포넌트 이동
  useEffect(() => {
    localStorage.setItem('activatedNum', activatedNum);
  }, [activatedNum]);

  const handlePreviousPage = () => { // 이전 페이지 이동
    if (activatedNum > 1) {
      setActivatedNum(prevNum => prevNum - 1)
    }
  }
  const handleNextPage = () => { // 다음 페이지 이동
    if (activatedNum < Object.keys(gamePages).length) {
      setActivatedNum(prevNum => prevNum + 1)
    }
  }
  const handleMove = num => { // 게임 메인페이지에서 기능 버튼 눌렀을 때 해당 화면으로 이동하게
    // console.log(num)
    setActivatedNum(num)
  }
  const gamePages = {
    1 : <GameStart onNextPage={handleNextPage} />,
    2 : <GamePick1 onNextPage={handleNextPage} onPreviousPage={handlePreviousPage} />,
    3 : <GamePick2 onNextPage={handleNextPage} onPreviousPage={handlePreviousPage} />,
    4 : <GameDogChip onNextPage={handleNextPage} onPreviousPage={handlePreviousPage} />,
    5 : <GameBasicScreen handleMove={handleMove} time={displayTime()} />,
    6 : <GameTraining handleMove={handleMove} time={displayTime()} />,
    7 : <GameWalking handleMove={handleMove} />,
    8 : <GameMeal handleMove={handleMove}/>,
    9 : <GamePoop handleMove={handleMove}/>,
    10 : <GameTreat handleMove={handleMove}/>,
    11 : <GameToy handleMove={handleMove}/>
  }

  // activatedNum에 따라서 GameStartfirst의 테두리 색을 지정
  const getBorderColor = (num) => {
    switch (num) {
        case 6:
            return "#6458F5";
        default:
            return "#FF914D"; // 기본 색상
    }
  }
  
//  5초마다 put 되도록

// sendData 함수 및 의존성 배열 정의
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  
  // sendData 함수 및 의존성 배열 정의
  const sendData = useCallback(async () => {
    try {
      const Token = localStorage.getItem("accessToken");
      if (Token) { // 로그인 했을 때만
        const response = await axios.put(
          `${REACT_APP_API_URL}/simulations/save`,
          simulationExistValue,
          {
            headers: {
              Authorization : 'Bearer '+ Token,
            }
          }
        );
        setSimulationExistValue(response.data);
        console.log(simulationExistValue)
      }
    } catch (error) {
      console.error(error);
    }
  }, [simulationExistValue, setSimulationExistValue, REACT_APP_API_URL]);
  
  // 컴포넌트가 마운트 될 때 10초마다 sendData 함수 호출
  useEffect(() => {
    const interval = setInterval(sendData, 10000);
    return () => clearInterval(interval);
  }, [sendData]);

  return (
    <div className="container" id="Simulation">
      <GameText />
      <div className="row">
          <div className="col-1"></div>
          <S.GameStartfirst className="col-10 first" borderColor={getBorderColor(activatedNum)}>
            <div className="container">
              <div className="row">
                <div className="col-1"></div>
                  {gamePages[activatedNum]}
                <div className="col-1"></div>
              </div>
            </div>
          </S.GameStartfirst>
          <div className="col-1"></div>
      </div>
    </div>
    );
  }
  
  export default Simulation;
  