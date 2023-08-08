// 게임 못들어감
import React, { useState, useEffect, useCallback } from 'react';
import GameText from '../../components/Check/GameText'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/NoSimulation.style"


function Simulation() {

return (
    <div className="container" id="Simulation">
      <GameText />
      <div className="row">
          <div className="col-1"></div>
          <S.GameStartfirst className="col-10 first">
            <div className="container">
              <div className="row">
                <div className="col-1"></div>
                {/* <div className='col-10'></div> */}
                <S.GameStartsecond className='col-10 second d-flex justify-content-center align-items-center'>
                    <S.GameNoBox>
                        <p>00:00 ~ 08:00</p>
                        <p>강아지가 자고있어요!</p>
                        <p>다음에 다시 찾아와주세요🐶</p>
                    </S.GameNoBox>
                </S.GameStartsecond>
                <div className="col-1"></div>
              </div>
            </div>
          </S.GameStartfirst>
          <div className="col-1"></div>
      </div>
    </div>
    );
  }
  
  export default Simulation;