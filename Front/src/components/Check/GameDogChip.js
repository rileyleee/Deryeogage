// 게임 강아지 고르는 화면
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameDogChip.style"
import {useRecoilValue} from "recoil"
import { SimulationBGI, SimulationDog, SimulationName } from "../../recoil/SimulationAtom"
import axios from "axios";
import {useRecoilState} from "recoil"
import { SimulationExistAtom, SimulationStartAtom } from "../../recoil/SimulationAtom"

function GameDogChip(props) {
  const {onNextPage, onPreviousPage} = props
  const [dogNumber, setdogNumber] = useState(false); // 칩 번호
  const SimulationDogValue = useRecoilValue(SimulationDog) // 강쥐
  const SimulationNameValue = useRecoilValue(SimulationName) // 이름
  const SimulationBGIValue = useRecoilValue(SimulationBGI) // 배경
  const [existValue, setExistValue] = useRecoilState(SimulationExistAtom)
  const [startValue, setStartValue] = useRecoilState(SimulationStartAtom)

  // 로그인 했을 때 POST요청 보냄(강아지 종류, 이름, 게임배경)
  const handleSubmit = async (event) => {
    if (localStorage.getItem("accessToken")) { // 로그인 했을 때만
      const REACT_APP_API_URL = process.env.REACT_APP_API_URL
      try {
          const Token = localStorage.getItem("accessToken");
          const response = await axios.post(
            `${REACT_APP_API_URL}/simulations/create`,
              {
                "petType": SimulationDogValue,
                "petName": SimulationNameValue,
                "background": SimulationBGIValue,
                "title": "없음"
              },
              {
                headers: {
                  Authorization : 'Bearer '+ Token, // 이곳에 실제 토큰 값을 넣으세요.
                  // 'Content-Type': 'application/json'
                }
              }
          );
        // simulation start 어쩌구 초기화
        setStartValue('')
        setExistValue(response.data) // SimulationExistAtom에 데이터 저장
        // 값들 localstorage에 저장
        localStorage.setItem('petType', response.data.petType)
        localStorage.setItem('background', response.data.background)
        localStorage.setItem('cost', 300000)
        localStorage.setItem('petName', response.data.petName)
        localStorage.setItem('end', response.data.end)
        localStorage.setItem('endCheck', response.data.endCheck)
        localStorage.setItem('endTime', response.data.endTime)
        localStorage.setItem('id', response.data.id)
        localStorage.setItem('lastTime', response.data.lastTime)
        localStorage.setItem('quizNum', response.data.quizNum)
        localStorage.setItem('requirement', response.data.requirement)
        localStorage.setItem('startTime', response.data.startTime)
        localStorage.setItem('title', response.data.title)
        localStorage.setItem('train', response.data.train)
        localStorage.setItem('user', response.data.user)
        localStorage.setItem('hpPercentage', response.data.health)
        onNextPage()
    } catch (error) {
        console.error(error);
    }
  };
  }

  // 강아지 칩 번호 저장?
  const handleShowNum = buttonIndex => {
    setdogNumber(buttonIndex);
  };

  // 15자리 랜덤 숫자 생성
  const RandomNumber = () => {
    const randomNumber = Math.floor(100000000000000 + Math.random() * 900000000000000); 
    return randomNumber.toString(); // 문자열로 변환하여 반환
  }
  return (
    <S.GameStartsecond className="col-10 second d-flex flex-column justify-content-around">
      <div className='d-flex justify-content-center'>
      <S.GameDogChipButton onClick={() => handleShowNum(true)}>강아지 칩 등록하기</S.GameDogChipButton>
      </div>
      <S.GameDogChipNum show={dogNumber}>강아지 등록 번호 : {RandomNumber()}</S.GameDogChipNum>
      <div className='d-flex justify-content-between'>
        <S.GamePick1Btn className='btn' type="submit" onClick={onPreviousPage}>이전으로</S.GamePick1Btn>
        <S.GamePick1Btn className='btn' type="submit" onClick={() => {handleSubmit();}}>다음으로</S.GamePick1Btn>
      </div>
    </S.GameStartsecond>
  );
}
  
export default GameDogChip;     