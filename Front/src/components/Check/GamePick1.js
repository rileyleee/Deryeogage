// 게임 강아지 고르는 화면
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GamePick1.style"
import {useRecoilState} from "recoil"
import { SimulationDog, SimulationName } from "../../recoil/SimulationAtom"

function GamePick1(props) {
  const {onNextPage, onPreviousPage} = props
  const [currentButton, setCurrentButton] = useState(null);
  const [dogValue, setDogValue] = useRecoilState(SimulationDog)
  const [nameValue, setNameValue] = useRecoilState(SimulationName)
  const [inputName, setInputName] = useState('')
  // console.log(dogValue)
  // console.log(nameValue)

  const handleButtonPick = buttonIndex => {
    setCurrentButton(buttonIndex);
    setDogValue(buttonIndex)
  };
  const handleNameChange = (event) => {
    setInputName(event.target.value)
  }
  const handleNamePick = () => {
    setNameValue(inputName)
  }

    return (
      <S.GameStartsecond className="col-10 second d-flex flex-column justify-content-around">
        <div>
        <S.GamePick1Text>강아지를 고르고, 잘 어울리는 이름을 정해주세요!</S.GamePick1Text>
        </div>
        <div className='d-flex justify-content-between'>
            <S.GamePick1box className={`col-2 box1 ${currentButton === 1 ? 'clicked' : ''}`} onClick={() => handleButtonPick(1)} isclicked={currentButton === 1}></S.GamePick1box>
            <S.GamePick1box className={`col-2 box2 ${currentButton === 2 ? 'clicked' : ''}`} onClick={() => handleButtonPick(2)} isclicked={currentButton === 2}></S.GamePick1box>
            <S.GamePick1box className={`col-2 box3 ${currentButton === 3 ? 'clicked' : ''}`} onClick={() => handleButtonPick(3)} isclicked={currentButton === 3}></S.GamePick1box>
            <S.GamePick1box className={`col-2 box4 ${currentButton === 4 ? 'clicked' : ''}`} onClick={() => handleButtonPick(4)} isclicked={currentButton === 4}></S.GamePick1box>
            <S.GamePick1box className={`col-2 box5 ${currentButton === 5 ? 'clicked' : ''}`} onClick={() => handleButtonPick(5)} isclicked={currentButton === 5}></S.GamePick1box>
        </div>
        <div className='d-flex justify-content-center'><S.GamePick1Input placeholder='강아지 이름을 입력해주세요!' type="text" value={inputName} onChange={handleNameChange}/></div>
        <div className="d-flex justify-content-between">
            <S.GamePick1Btn className='btn' type="submit" onClick={onPreviousPage}>이전으로</S.GamePick1Btn>
            <S.GamePick1Btn className='btn' type="submit" onClick={() => { handleNamePick(); onNextPage(); }}>다음으로</S.GamePick1Btn>
        </div>
      </S.GameStartsecond>
    );
  }
  
  export default GamePick1;
  