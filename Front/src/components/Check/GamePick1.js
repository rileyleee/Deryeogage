// 게임 강아지 고르는 화면
import React, {useState} from 'react';
import GameText from './GameText';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GamePick1.style"
import GameStart from './GameStart';
import GamePick2 from './GamePick2'

function GamePick1() {
  const [currentButton, setCurrentButton] = useState(null)
  const [showGameStart, setShowGameStart] = useState(false)
  const [showGamePick2, setShowGamePick2] = useState(false)

  const handleButtonPick = buttonIndex => {
    setCurrentButton(buttonIndex)
  }
  const handleButtonStart = () => {
    setShowGameStart(true)
  }
  const handleButtonPick2 = () => {
    setShowGamePick2(true)
  }
    return (
      <div>
      {showGamePick2 ? (
        <GamePick2 />
      ) : (<div></div>)}
      {showGameStart ? (
        <GameStart />
      ) : (
      <div className="container" id="GamePick1">
        <GameText />
        <div className="row">
            {/* d-flex justify-content-center */}
            <div className="col-1"></div>
            <S.GameStartfirst className="col-10 first">
              <div className="container">
                <div className="row">
                  <div className="col-1"></div>
                  <S.GameStartsecond className="col-10 second">
                    <S.GamePick1Text>강아지를 고르고, 잘 어울리는 이름을 정해주세요!</S.GamePick1Text>
                    <div className='container'>
                        <div className='row'>
                            <S.GamePick1box className={`col-2 box1 ${currentButton === 0 ? 'clicked' : ''}`} onClick={() => handleButtonPick(0)} isClicked={currentButton === 0}></S.GamePick1box>
                            <S.GamePick1box className={`col-2 box2 ${currentButton === 1 ? 'clicked' : ''}`} onClick={() => handleButtonPick(1)} isClicked={currentButton === 1}></S.GamePick1box>
                            <S.GamePick1box className={`col-2 box3 ${currentButton === 2 ? 'clicked' : ''}`} onClick={() => handleButtonPick(2)} isClicked={currentButton === 2}></S.GamePick1box>
                            <S.GamePick1box className={`col-2 box4 ${currentButton === 3 ? 'clicked' : ''}`} onClick={() => handleButtonPick(3)} isClicked={currentButton === 3}></S.GamePick1box>
                            <S.GamePick1box className={`col-2 box5 ${currentButton === 4 ? 'clicked' : ''}`} onClick={() => handleButtonPick(4)} isClicked={currentButton === 4}></S.GamePick1box>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'><S.GamePick1Input type="text"/></div>
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
  
  export default GamePick1;
  