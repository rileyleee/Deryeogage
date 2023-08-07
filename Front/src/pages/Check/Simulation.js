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
import GameDeath from "../../components/Check/GameDeath"
import GameQuiz from "../../components/Check/GameQuiz"
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
    // 죽었야 안죽었냐
    const [isDead, setIsDead] = useState(false);
    const [hpPercentage, setHpPercentage] = useState(null) // hp값을 계산해야 되니까 따로 빼놓는거임
    console.log(hpPercentage)

    useEffect(() => {
      // 처음 로드할 때 localStorage에서 hpPercentage를 가져와서 상태를 설정합니다.
      setHpPercentage(parseInt(localStorage.getItem('hpPercentage')));
      setSimulationExistValue(prevState => ({
        ...prevState,
        health: localStorage.getItem('hpPercentage'),
        background : localStorage.getItem('background'),
        cost : localStorage.getItem('cost'),
        end : localStorage.getItem('end'),
        endCheck : localStorage.getItem('endCheck'),
        endTime : localStorage.getItem('endTime'),
        id : localStorage.getItem('id'),
        lastTime : localStorage.getItem('lastTime'),
        petName : localStorage.getItem('petName'),
        petType : localStorage.getItem('petType'),
        quizNum : localStorage.getItem('quizNum'),
        requirement : localStorage.getItem('requirement'),
        startTime : localStorage.getItem('startTime'),
        title : localStorage.getItem('title'),
        train : localStorage.getItem('train'),
        user : localStorage.getItem('user')
      }));
    }, []);
    console.log(simulationExistValue)
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
          // // 업데이트된 시간을 localStorage에 저장합니다.
          // localStorage.setItem('timeDifference', JSON.stringify({
          //   hours: newHours,
          //   minutes: newMinutes
          // }));
    
          return {
            hours: newHours, 
            minutes: newMinutes
          };
        });
    
        hpTimer += 1;
        if (hpTimer >= 1) { // 1분마다 HP 감소
          setHpPercentage((prevHpPercentage) => {
            const newHpPercentage = prevHpPercentage > 0 ? prevHpPercentage - 1 : 0; // 값이 바뀌면 hpPercentage도 업데이트
            setSimulationExistValue(prevState => ({ // simulationExistValue값의 health도 업데이트
              ...prevState,
              health: newHpPercentage,
            }));
            return newHpPercentage;
          });
          hpTimer = 0;
        }
      }, 60000);
    
      return () => clearInterval(timerId);
    }, []); 
  // 로컬 스토리지 값도 계속 업데이트
  useEffect(() => {
    // simulationExistValue 값이 설정되었을 때만 localStorage에 저장합니다.
    if (simulationExistValue) {
      if (simulationExistValue.health !== undefined) {
        localStorage.setItem('hpPercentage', simulationExistValue.health); // 값이 바뀌었으니 로컬값도 바꿔줘야지
      }
      // if (simulationExistValue.train !== undefined) {
      //   localStorage.setItem('train', simulationExistValue.train);
      // }
      // if (simulationExistValue.requirement !== undefined) {
      //   localStorage.setItem('requirement', simulationExistValue.requirement);
      // }
    }
    
    localStorage.setItem('timeDifference', JSON.stringify(timeDifference)); // 값이 변했으니까 로컬에 다시 저장
  }, [timeDifference, simulationExistValue]);

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
    11 : <GameToy handleMove={handleMove}/>,
    12 : <GameQuiz handleMove={handleMove}/>
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
    const interval = setInterval(sendData, 5000);
    return () => clearInterval(interval);
  }, [sendData]);


  // useEffect를 사용하여 simulationExistValue.health의 변화를 감지
  useEffect(() => {
    if (simulationExistValue.health === 0) {
      setIsDead(true);
    }
  }, [simulationExistValue.health]);
  // 24시간이 되면 end를 true로!
  
//   useEffect(() => {
//     // 시간이 문자열 형태로 오므로 이를 비교 가능한 형태로 변환합니다.
//     const currentTime = `${timeDifference.hours.toString().padStart(2, '0')}:${timeDifference.minutes.toString().padStart(2, '0')}`;
//     const endTime = `${Number(simulationExistValue.endTime.substr(11, 2))}:${Number(simulationExistValue.endTime.substr(14, 2))}`;
//     // 현재 시간과 종료 시간이 같은지 비교합니다.
//     if (currentTime === endTime) {
//         // 만약 같다면 simulationExistValue의 end를 true로 설정합니다.
//         setSimulationExistValue(prevState => ({
//             ...prevState,
//             end: true,
//         }));
//     }
// }, [timeDifference, simulationExistValue.endTime, setSimulationExistValue]);

  return (
    <div className="container" id="Simulation">
      <GameText />
      <div className="row">
          <div className="col-1"></div>
          <S.GameStartfirst className="col-10 first" borderColor={getBorderColor(activatedNum)}>
            <div className="container">
              <div className="row">
                <div className="col-1"></div>
                  {isDead ? <GameDeath /> : gamePages[activatedNum]}
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