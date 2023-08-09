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
import GameEmergency from "../../components/Check/GameEmergency"
import {useRecoilValue, useRecoilState} from "recoil"
import { useNavigate } from "react-router-dom";
import { SimulationNum, SimulationExistAtom, SimulationWalkingCnt, SimulationStartAtom, SimulationHp
 } from "../../recoil/SimulationAtom"
import {useLocation} from "react-router-dom"
import axios from 'axios';
import GameTherapy from '../../components/Check/GameTherapy';

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
    console.log(timeDifference)
    // 죽었야 안죽었냐
    const [isDead, setIsDead] = useState(false);
    const [hpPercentage, setHpPercentage] = useState(null) // hp값을 계산해야 되니까 따로 빼놓는거임
    console.log(hpPercentage)
    const navigate = useNavigate();
    const [isButtonVisible, setButtonVisible] = useState(false);
    // const [loading, setLoading] = useState(true);
    // get 요청
    // useEffect(() => {
    //   const fetchData = async () => {
    //     setLoading(true);
    //     if (localStorage.getItem("accessToken")) {
    //     // 로그인되어 있는 경우 해당 페이지로 이동
    //     const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    //       try {
    //         const url = `${REACT_APP_API_URL}/simulations`;
    //         const token = localStorage.getItem("accessToken");
    //         const response = await axios.get(url, {
    //           headers: {
    //             Authorization: "Bearer " + token,
    //           },
    //         });
    //         const now = new Date()
    //         const currentHours = now.getHours()
    //         const currentMinutes = now.getMinutes()
    //         if (response.data === "Start a new simulation") {
    //           setLoading(false);
    //           localStorage.setItem("activatedNum", 1);
    //           localStorage.setItem('hpPercentage', 100);
    //           localStorage.setItem('timeDifference', JSON.stringify({ // 객체 데이터 등록할 때 무조건 stringify 활용
    //             hours:0,
    //             minutes:0
    //           }));
    //         } else {
    //           setSimulationExistValue(response.data); // SET하자마자 담기지 않아서 response.data로 해줌
    //           setLoading(false);
    //           console.log(simulationExistValue)
    //           localStorage.setItem("activatedNum", 5);
  
    //           const startTimeHours = Number(response.data.startTime.substr(11, 2));
    //           const startTimeMinutes = Number(response.data.startTime.substr(14, 2));
    //           const lastTimeHours = Number(response.data.lastTime.substr(11, 2));
    //           const lastTimeMinutes = Number(response.data.lastTime.substr(14, 2));
              
    //           let diffHours = lastTimeHours - startTimeHours;
    //           let diffMinutes = lastTimeMinutes - startTimeMinutes;
              
    //           if (diffMinutes < 0) {
    //             diffHours--;
    //             diffMinutes += 60;
    //           }
  
    //           if (diffHours < 0) {
    //             diffHours += 24;
    //           }
    //           // // 게임에 접속하지 않는동안 체력을 닳게 하기 위해
    //           // 게임 접속하지 않은 시간 계산 결과
    //           let hpHours = currentHours - lastTimeHours
    //           let hpMinutes = currentMinutes - lastTimeMinutes
    //           if (hpMinutes < 0) {
    //             hpHours--;
    //             hpMinutes += 60;
    //           }
  
    //           if (hpHours < 0) {
    //             hpHours += 24;
    //           }
    //           // 
    //           let Hours = diffHours + hpHours
    //           let Minutes = diffMinutes + hpMinutes
    //           if (Minutes >= 60) {
    //             Hours += 1
    //             Minutes -= 60
    //           }
    //           // 오전 12시 ~ 오전 8시 사이의 시간을 계산
    //           let recoveryHours = 0;
    //           for (let hour = lastTimeHours; hour !== currentHours; hour = (hour + 1) % 24) {
    //               if (hour >= 0 && hour < 8) recoveryHours++;
    //           }
  
    //           // 체력 회복 및 감소 계산
    //           const totalHpMinutes = Math.round(((hpHours - recoveryHours) * 60 + hpMinutes)/10)
    //           const totalRecoveryMinutes = recoveryHours * 6;
    //           setSimulationExistValue(prevState => ({
    //             ...prevState,
    //             health: Math.min(
    //               100,
    //               Math.max(
    //                 0,
    //                 prevState.health - totalHpMinutes + totalRecoveryMinutes
    //               )
    //             ),
    //           }));
              
    //           localStorage.setItem('timeDifference', JSON.stringify({
    //             hours: Hours,
    //             minutes: Minutes
    //           }));
    //         }
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    //   }
    //   fetchData()
    // }, []); // 의존성 배열을 적절히 설정

    useEffect(() => {
      // 처음 로드할 때 localStorage에서 hpPercentage를 가져와서 상태를 설정합니다.
      setHpPercentage(parseInt(localStorage.getItem('hpPercentage')));
      setSimulationExistValue(prevState => ({
        ...prevState,
        health: localStorage.getItem('hpPercentage'),
        background : localStorage.getItem('background'),
        cost : parseInt(localStorage.getItem('cost')),
        end : localStorage.getItem('end'),
        endCheck : localStorage.getItem('endCheck'),
        endTime : localStorage.getItem('endTime'),
        id : parseInt(localStorage.getItem('id')),
        lastTime : localStorage.getItem('lastTime'),
        petName : localStorage.getItem('petName'),
        petType : localStorage.getItem('petType'),
        quizNum : parseInt(localStorage.getItem('quizNum')),
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
      let initialMount = true; // 초기 마운트 여부 확인
      // 타이머 함수
      const timerFunction = () => {
        if (simulationExistValue.end === true) return; // end가 true이면 종료
        if (!initialMount) { // 초기 마운트가 아닐 때만 시간 증가
        setTimeDifference((prevTimeDifference) => {
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
            hours: newHours,
            minutes: newMinutes,
          };
        });
        }
        initialMount = false; // 초기 실행 후 false로 설정
        hpTimer += 1;
        if (hpTimer >= 10) { // 10분마다 HP 감소
          setHpPercentage((prevHpPercentage) => {
            const newHpPercentage = prevHpPercentage > 0 ? prevHpPercentage - 1 : 0;
            setSimulationExistValue((prevState) => ({
              ...prevState,
              health: newHpPercentage,
            }));
            return newHpPercentage;
          });
          hpTimer = 0;
        }
      };
    
      // interval 설정
      const timerId = setInterval(timerFunction, 60000);
    
      // 초기 실행
      timerFunction();
    
      return () => clearInterval(timerId);
    }, [simulationExistValue.end]);
    
    
  // 로컬 스토리지 값도 계속 업데이트
  useEffect(() => {
    // simulationExistValue 값이 설정되었을 때만 localStorage에 저장합니다.
    if (simulationExistValue) {
      if (simulationExistValue.health !== undefined) {
        localStorage.setItem('hpPercentage', simulationExistValue.health); // 값이 바뀌었으니 로컬값도 바꿔줘야지
      }
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
    12 : <GameQuiz handleMove={handleMove}/>,
    13 : <GameEmergency handleMove={handleMove}/>,
    14 : <GameTherapy handleMove={handleMove}/>,
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

  const handleClick = () => {
    navigate("/simulations/end")
  }

  
//  5초마다 put 되도록

// sendData 함수 및 의존성 배열 정의
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  
  // sendData 함수 및 의존성 배열 정의
  const sendData = useCallback(async () => {
    try {
      const Token = localStorage.getItem("accessToken");
      console.log(simulationExistValue)
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
        // setSimulationExistValue(response.data);
        // console.log(simulationExistValue)
      }
    } catch (error) {
      console.error(error);
    }
  }, [simulationExistValue, setSimulationExistValue, REACT_APP_API_URL]);
  
  // 컴포넌트가 마운트 될 때 5초마다 sendData 함수 호출
  useEffect(() => {
    console.log('simulationExistValue.end:', simulationExistValue.end); // 현재 값 확인
  
    if (simulationExistValue.end === true) {
      return;
    } else{
      const interval = setInterval(sendData, 5000);
      return () => clearInterval(interval);
    }
  }, [sendData, simulationExistValue.end]);
  


  // useEffect를 사용하여 simulationExistValue.health의 변화를 감지
  useEffect(() => {
    if (simulationExistValue.health === 0) {
      setIsDead(true);
      setSimulationExistValue(prevState => ({
        ...prevState,
        end: true,
      }));
    }
  }, [simulationExistValue.health, simulationExistValue.end]);
  
  // 24시간이 되면 end를 true로!
  useEffect(() => {
    if (!localStorage.getItem('endTime')) {
      return; // endTime이 없으면 종료
    }
  
    const endTime = new Date(localStorage.getItem('endTime'));
    const now = new Date();
    console.log(endTime, now)
  
    // 24시간 차이 계산
    const differenceInMilliseconds = endTime - now;
    const differenceInHours = differenceInMilliseconds / 1000 / 60 / 60;
  
    // 만약 24시간 차이가 있다면 simulationExistValue의 end를 true로 설정
    if (differenceInHours <= 0) {
      setSimulationExistValue(prevState => ({
        ...prevState,
        end: true,
      }));
      setButtonVisible(true)
      localStorage.setItem('end', true)
      
    }
  }, [timeDifference, simulationExistValue.endTime, setSimulationExistValue]);
  

  // if (loading) {
  //   return <div>Loading...</div>; // 로딩 중인 경우 표시할 컴포넌트
  // }
  // else {
  return (
    <div className="container" id="Simulation" style={{ position: 'relative' }}>
      <GameText />
      <div className="row">
          <div className="col-1"></div>
          <S.GameStartfirst className="col-10 first" borderColor={getBorderColor(activatedNum)}>
            <div className="container">
              <div className="row">
                <div className="col-1"></div>
                  {isDead ? <GameDeath /> : gamePages[activatedNum]}
                  {isButtonVisible && <S.CenterButton onClick={handleClick}>
                    <h3 style={{fontSize: 'bold'}}>게임 종료</h3>
                    <p>{'>'} 결과 보러가기 {'<'}</p>
                    </S.CenterButton>}
                <div className="col-1"></div>
              </div>
            </div>
          </S.GameStartfirst>
          <div className="col-1"></div>
      </div>
    </div>
    );
  }
// }
  export default Simulation;