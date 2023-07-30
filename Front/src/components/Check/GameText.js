// 게임 화면 상단에 있는 말

import * as S from "../../styled/Check/GameText.style"
import React from 'react';
function GameText() {
    return (
      <div id="GameText" className =' container mt-3'>
        <div className="row">
          <div className="col-1"></div>
            <div className="col-10">
              <S.GameTextH4><S.GameTextSpan>시뮬레이션</S.GameTextSpan>을 통해 강아지를 먼저 키워보세요!</S.GameTextH4>
            </div>
          <div className="col-1"></div>
        </div>
      </div>
    );
  }
  
  export default GameText;
  