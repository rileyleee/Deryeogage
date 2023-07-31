// 게임 시작 화면
import React, { useState, useEffect } from "react";
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
import {useRecoilValue} from "recoil"
import { SimulationNum, SimulationExistAtom } from "../../recoil/SimulationAtom"
import {useLocation} from "react-router-dom"

function Simulation() {
  const location = useLocation()
  const SimulationNumValue = useRecoilValue(SimulationNum)
  const SimulationExistValue = useRecoilValue(SimulationExistAtom)
  // localStorage에서 값을 가져와서 초기 상태를 설정합니다.
  const [activatedNum, setActivatedNum] = useState(() => parseInt(localStorage.getItem('activatedNum'), 10) || SimulationNumValue) 
  // 다음, 이전 페이지로 이동하기 위한 변수

  // activatedNum이 변경될 때마다 localStorage를 업데이트 합니다.


  useEffect(() => {
    // 현재 주소를 가져옵니다.
    const currentPath = location.pathname;
  
    // 만약 현재 주소가 http://localhost:8080/simulations/2941475981이 아닌 경우에만 activatedNum을 5로 변경합니다.
    if (currentPath !== "/simulations/2941475981") {
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
    console.log(num)
    setActivatedNum(num)
  }
  const gamePages = {
    1 : <GameStart onNextPage={handleNextPage} />,
    2 : <GamePick1 onNextPage={handleNextPage} onPreviousPage={handlePreviousPage} />,
    3 : <GamePick2 onNextPage={handleNextPage} onPreviousPage={handlePreviousPage} />,
    4 : <GameDogChip onNextPage={handleNextPage} onPreviousPage={handlePreviousPage} />,
    5 : <GameBasicScreen existdata={SimulationExistValue} handleMove={handleMove} />,
    6 : <GameTraining existdata={SimulationExistValue} handleMove={handleMove}/>,
    7 : <GameWalking handleMove={handleMove}/>,
  }
  return (
    <div className="container" id="Simulation">
      <GameText />
      <div className="row">
          <div className="col-1"></div>
          <S.GameStartfirst className="col-10 first">
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
  