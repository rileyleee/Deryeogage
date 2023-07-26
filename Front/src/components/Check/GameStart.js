// 게임 시작 화면
import React, { useState } from "react";
import GameText from './GameText';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../styled/Check/GameStart.css'
import * as S from "../../styled/Check/GameStart.style"
import GamePick1 from "./GamePick1"

function GameStart() {
  const [showGamePick1, setShowGamePick1] = useState(false)
  const handleButtonClick = () => {
    setShowGamePick1(true)
  }
  return (
    <div>
      {showGamePick1 ? (
        <GamePick1 />
      ) : (
    <div className="container" id="GameStart">
      <GameText />
      <div className="row">
          {/* d-flex justify-content-center */}
          <div className="col-1"></div>
          <S.GameStartfirst className="col-10 first">
            <div className="container">
              <div className="row">
                <div className="col-1"></div>
                <S.GameStartsecond className="col-10 second">
                  <S.GameStartTextbox className="text-box">
                    <S.GameStartPtag>가상으로 강아지를 키워보는 게임, </S.GameStartPtag>
                    <S.GameStartPtag><S.GameStartSpan>키워보개</S.GameStartSpan>를 시작해보세요 !</S.GameStartPtag>
                    <S.GameStartButton onClick={handleButtonClick}>시작하기</S.GameStartButton>
                  </S.GameStartTextbox>
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
  
  export default GameStart;
  