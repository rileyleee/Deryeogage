// 게임 강아지 고르는 화면
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameDogChip.style"

function GameDogChip(props) {
  const {onNextPage, onPreviousPage} = props
  const [dogNumber, setdogNumber] = useState(false);

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
        <S.GamePick1Btn className='btn' type="submit" onClick={onNextPage}>다음으로</S.GamePick1Btn>
      </div>
    </S.GameStartsecond>
  );
}
  
export default GameDogChip;     