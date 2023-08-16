// 게임 강아지 고르는 화면
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GamePick2.style"
import {useRecoilState} from "recoil"
import { SimulationBGI } from "../../recoil/SimulationAtom"

function GamePick2(props) {
  const {onNextPage, onPreviousPage} = props
  const [currentButton, setCurrentButton] = useState(null);
  const [BGIValue, setBGIValue] = useRecoilState(SimulationBGI) // 선택한 배경 번호 저장

  const handleButtonPick = buttonIndex => {
    setCurrentButton(buttonIndex);
    setBGIValue(buttonIndex)
  };
  // console.log(BGIValue)
    return (
      <S.GameStartsecond className="col-10 second d-flex flex-column justify-content-around">
          <S.GamePick1Text className='bgi'>강아지를 키울 집을 골라주세요!</S.GamePick1Text>
          <div className='d-flex justify-content-around align-items-center'>
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-label="Slide 6"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="6" aria-label="Slide 7"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <S.GamePick2BGI className={`d-block one ${currentButton === 1 ? 'clicked' : ''}`} onClick={() => handleButtonPick(1)} isclicked={currentButton === 1}></S.GamePick2BGI>
              </div>
              <div className="carousel-item">
                <S.GamePick2BGI className={`d-block two ${currentButton === 2 ? 'clicked' : ''}`} onClick={() => handleButtonPick(2)} isclicked={currentButton === 2}></S.GamePick2BGI>
              </div>
              <div className="carousel-item">
                <S.GamePick2BGI className={`d-block three ${currentButton === 3 ? 'clicked' : ''}`} onClick={() => handleButtonPick(3)} isclicked={currentButton === 3}></S.GamePick2BGI>
              </div>
              <div className="carousel-item">
                <S.GamePick2BGI className={`d-block four ${currentButton === 4 ? 'clicked' : ''}`} onClick={() => handleButtonPick(4)} isclicked={currentButton === 4}></S.GamePick2BGI>
              </div>
              <div className="carousel-item">
                <S.GamePick2BGI className={`d-block five ${currentButton === 5 ? 'clicked' : ''}`} onClick={() => handleButtonPick(5)} isclicked={currentButton === 5}></S.GamePick2BGI>
              </div>
              <div className="carousel-item">
                <S.GamePick2BGI className={`d-block six ${currentButton === 6 ? 'clicked' : ''}`} onClick={() => handleButtonPick(6)} isclicked={currentButton === 6}></S.GamePick2BGI>
              </div>
              <div className="carousel-item">
                <S.GamePick2BGI className={`d-block seven ${currentButton === 7 ? 'clicked' : ''}`} onClick={() => handleButtonPick(7)} isclicked={currentButton === 7}></S.GamePick2BGI>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          </div>
          <div className="d-flex justify-content-between">
              <S.GamePick1Btn className='btn' type="submit" onClick={onPreviousPage}>이전으로</S.GamePick1Btn>
              <S.GamePick1Btn className='btn' type="submit" onClick={onNextPage}>다음으로</S.GamePick1Btn>
          </div>
      </S.GameStartsecond>
    );
  }
  
  export default GamePick2;
  