// 게임 시작 화면
import React, {  useState, useEffect } from 'react';
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
import GameMenu from "../../components/Check/GameMenu"
import {useRecoilValue, useRecoilState} from "recoil"
import { SimulationNum, SimulationExistAtom, SimulationWalkingCnt, SimulationStartAtom } from "../../recoil/SimulationAtom"
import {useLocation} from "react-router-dom"

function Simulation() {
  const location = useLocation()
  const SimulationExistValue = useRecoilValue(SimulationExistAtom)
  // localStorage에서 값을 가져와서 초기 상태를 설정합니다.
  const [activatedNum, setActivatedNum] = useState(() => parseInt(localStorage.getItem('activatedNum'), 10)) 
  // 다음, 이전 페이지로 이동하기 위한 변수
  // activatedNum이 변경될 때마다 localStorage를 업데이트 합니다.
    // 데이터 로컬스토리지에 등록
    useEffect(() => {
      // 첫 렌더링에만 실행되도록 합니다.
      if(Object.keys(SimulationExistValue).length === 0) { // 데이터가 없으면,,,그니까 처음 시작 하는거면,,,
          localStorage.setItem('hpPercentage', 100);
          localStorage.setItem('timeDifference', JSON.stringify({ // 객체 데이터 등록할 때 무조건 stringify 활용
              hours:0,
              minutes:0
          }));      
          localStorage.setItem('cost', 300000);
      } else {
          localStorage.setItem('hpPercentage', SimulationExistValue.health);
          localStorage.setItem('timeDifference', JSON.stringify({
              hours:(Number(SimulationExistValue.lastTime.substr(11, 2)) - Number(SimulationExistValue.startTime.substr(11, 2)) + 24) % 24,
              minutes:(Number(SimulationExistValue.lastTime.substr(14, 2)) - Number(SimulationExistValue.startTime.substr(14, 2)) + 60) % 60
          }));
          localStorage.setItem('cost', SimulationExistValue.cost);
      }
  }, []); // 빈 배열을 두 번째 인자로 전달하여, 컴포넌트 마운트 시에만 실행되도록 합니다.

    // 위에서 로컬에 저장한 데이터를 가져와서 변수에 저장
    const [hpPercentage, setHpPercentage] = useState(localStorage.getItem('hpPercentage'))
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
          if (hpTimer >= 10) { // 5분마다 HP 감소
              setHpPercentage((prevHpPercentage) => prevHpPercentage > 0 ? prevHpPercentage - 1 : 0);
              hpTimer = 0;
          }
      }, 60000); // 1분에 한 번씩 실행됩니다.

      return () => clearInterval(timerId); // 컴포넌트가 unmount될 때 타이머를 정리합니다.
  }, []); 
  
  // 로컬 스토리지 값도 계속 업데이트
  useEffect(() => {
      localStorage.setItem('hpPercentage', hpPercentage); 
      localStorage.setItem('timeDifference', JSON.stringify(timeDifference)); // 값이 변했으니까 로컬에 다시 저장
  }, [hpPercentage, timeDifference]);

  // 화면에 보여주는 값으로 변경해서 보여주기
  const displayTime = () => {
    console.log(timeDifference, timeDifference.hours)
      return `${timeDifference.hours.toString().padStart(2, '0')}:${timeDifference.minutes.toString().padStart(2, '0')}`;
  }

  // HP 줄이기
  const decreaseHp = () => {
      // HP를 1 감소시킵니다. HP는 0 이하로 내려가지 않습니다.
      setHpPercentage((prevHp) => Math.max(prevHp - 1, 0));
  }

  // 산책 나가면 hp 5추가해주고 산책 횟수 카운트
  const [walking, setWalking] = useRecoilState(SimulationWalkingCnt)
  const walkingIncreaseHp = (prev) => {
      if (prev < 3) {
          setHpPercentage(parseInt(hpPercentage)+5)
          setWalking(prev+1)
          // console.log(walking)
      }
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
    5 : <GameBasicScreen existdata={SimulationExistValue} handleMove={handleMove} setHpPercentage={setHpPercentage} time={displayTime()} hp={hpPercentage} walkingIncreaseHp={walkingIncreaseHp}/>,
    6 : <GameTraining existdata={SimulationExistValue} handleMove={handleMove} time={displayTime()} hp={hpPercentage} decreaseHp={decreaseHp}/>,
    7 : <GameWalking handleMove={handleMove} />,
    // 8: <GameMenu time={displayTime()} hp={hpPercentage}/>
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
  