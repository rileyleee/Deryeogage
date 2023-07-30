// 게임 강아지 고르는 화면
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GamePick2.style"

function GamePick2(props) {
  const {onNextPage, onPreviousPage} = props
  const [currentButton, setCurrentButton] = useState(null);

  const handleButtonPick = buttonIndex => {
    setCurrentButton(buttonIndex);
  };
    return (
      <S.GameStartsecond className="col-10 second d-flex flex-column justify-content-around">
          <S.GamePick1Text className='bgi'>강아지를 키울 집을 골라주세요!</S.GamePick1Text>
          <div className='d-flex justify-content-around align-items-center'>
          {/* <S.GamePick2Arrow src="assets/things/left-arrow.png" alt="left-arrow" /> */}
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <S.GamePick2BGI className={`d-block one ${currentButton === 0 ? 'clicked' : ''}`} onClick={() => handleButtonPick(0)} isclicked={currentButton === 0}></S.GamePick2BGI>
              </div>
              <div className="carousel-item">
                <S.GamePick2BGI className={`d-block two ${currentButton === 1 ? 'clicked' : ''}`} onClick={() => handleButtonPick(1)} isclicked={currentButton === 1}></S.GamePick2BGI>
              </div>
              <div className="carousel-item">
                <S.GamePick2BGI className={`d-block three ${currentButton === 2 ? 'clicked' : ''}`} onClick={() => handleButtonPick(2)} isclicked={currentButton === 2}></S.GamePick2BGI>
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
  