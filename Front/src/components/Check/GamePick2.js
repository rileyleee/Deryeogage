// 게임 강아지 고르는 화면
import React, {useState} from 'react';
import GameText from './GameText';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GamePick2.style"
import GamePick1 from './GamePick1';
// import GamePick2 from './GamePick2'

function GamePick2() {
  const [showGameStart, setShowGameStart] = useState(false)
  const [showGamePick2, setShowGamePick2] = useState(false)

  const handleButtonStart = () => {
    setShowGameStart(true)
  }
  const handleButtonPick2 = () => {
    setShowGamePick2(true)
  }
    return (
      <div>
      {showGamePick2 ? (
        <GamePick1 />
      ) : (<div></div>)}
      {showGameStart ? (
        <GamePick1 />
      ) : (
      <div className="container" id="GamePick2">
        <GameText />
        <div className="row">
            {/* d-flex justify-content-center */}
            <div className="col-1"></div>
            <S.GameStartfirst className="col-10 first">
              <div className="container">
                <div className="row">
                  <div className="col-1"></div>
                  <S.GameStartsecond className="col-10 second">
                    <S.GamePick1Text className='bgi'>강아지를 키울 집을 골라주세요!</S.GamePick1Text>
                    <img src="" alt="" />
                    <S.GamePick2BGI className='bgi'>박스</S.GamePick2BGI>
                    <img src="" alt="" />
                    <div class="d-flex justify-content-between">
                        <S.GamePick1Btn onClick={handleButtonStart} className='btn' type="submit">이전으로</S.GamePick1Btn>
                        <S.GamePick1Btn onClick={handleButtonPick2} className='btn' type="submit">다음으로</S.GamePick1Btn>
                    </div>
                  </S.GameStartsecond>
                  <div className="col-1"></div>
                </div>
              </div>
            </S.GameStartfirst>
            <div className="col-1"></div>
        </div>
      </div>
      )}
      </div>
    );
  }
  
  export default GamePick2;
  