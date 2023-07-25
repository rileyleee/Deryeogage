// 게임 시작 화면
import React from 'react';
import GameText from './GameText';
import './GameStart.css'

function GameStart() {
    return (
      <div class="container" id="GameStart">
        <GameText />
        <div class="row">
            {/* d-flex justify-content-center */}
            <div class="col-12">
              <div class="container">
                <div class="row">
                  <div class="col-1"></div>
                  <div class="col-10">
                    <h3>가상으로 강아지를 키워보는 게임, </h3>
                    <h3>키워보개</h3>
                    <h3>를 시작해보세요 !</h3>
                  </div>
                  <div class="col-1"></div>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default GameStart;
  