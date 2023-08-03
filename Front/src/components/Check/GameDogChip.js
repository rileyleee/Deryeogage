// 게임 강아지 고르는 화면
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameDogChip.style"
import {useRecoilValue} from "recoil"
import { SimulationBGI, SimulationDog, SimulationName } from "../../recoil/SimulationAtom"
import axios from "axios";
import {useRecoilState} from "recoil"
import { SimulationExistAtom } from "../../recoil/SimulationAtom"

function GameDogChip(props) {
  const {onNextPage, onPreviousPage} = props
  const [dogNumber, setdogNumber] = useState(false);
  const SimulationDogValue = useRecoilValue(SimulationDog)
  const SimulationNameValue = useRecoilValue(SimulationName)
  const SimulationBGIValue = useRecoilValue(SimulationBGI)
  const Token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjI5NDE0NzU5ODEsImlhdCI6MTY5MDk4NzU3NSwiZXhwIjoxNjkxMDczOTc1fQ.mRdAibfoYdUZdmtdFlTxkqXT4xQHl7jh_R2VBpMHFGg'
  const [existValue, setExistValue] = useRecoilState(SimulationExistAtom)
  console.log(SimulationDogValue, SimulationNameValue, SimulationBGIValue)

  const handleSubmit = async (event) => {
    if (localStorage.getItem("accessToken")) {
      const REACT_APP_API_URL = process.env.REACT_APP_API_URL
      try {
          const Token = localStorage.getItem("accessToken");
          const response = await axios.post(
            `${REACT_APP_API_URL}/simulations/create`,
              {
                "petType": SimulationDogValue,
                "petName": SimulationNameValue,
                "background": SimulationBGIValue
              },
              {
                headers: {
                  Authorization : 'Bearer '+ Token, // 이곳에 실제 토큰 값을 넣으세요.
                  // 'Content-Type': 'application/json'
                }
              }
          );
        
        console.log(response.data);
        setExistValue(response.data)
    } catch (error) {
        console.error(error);
    }
  };
  }

  const handleShowNum = buttonIndex => {
    setdogNumber(buttonIndex);
  };

  const RandomNumber = () => {
    const randomNumber = Math.floor(100000000000000 + Math.random() * 900000000000000); // 15자리 랜덤 숫자 생성
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
        <S.GamePick1Btn className='btn' type="submit" onClick={() => {handleSubmit(); onNextPage();}}>다음으로</S.GamePick1Btn>
      </div>
    </S.GameStartsecond>
  );
}
  
export default GameDogChip;     