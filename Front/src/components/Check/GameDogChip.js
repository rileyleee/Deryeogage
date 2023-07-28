// 게임 강아지 고르는 화면
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameDogChip.style"

function GamePick1(props) {
  const {onNextPage, onPreviousPage} = props
  const [currentButton, setCurrentButton] = useState(null);

  const handleButtonPick = buttonIndex => {
    setCurrentButton(buttonIndex);
  };

    return (
      <S.GameStartsecond className="col-10 second d-flex justify-content-between align-items-end">
        <S.GameDogChipButton>강아지 칩 등록하기</S.GameDogChipButton>
        <S.GameDogChipNum>강아지 등록 번호 : 1230000000456</S.GameDogChipNum>
        <S.GamePick1Btn className='btn' type="submit" onClick={onPreviousPage}>이전으로</S.GamePick1Btn>
        <S.GamePick1Btn className='btn' type="submit" onClick={onNextPage}>다음으로</S.GamePick1Btn>
      </S.GameStartsecond>
    );
  }
  
  export default GamePick1;     