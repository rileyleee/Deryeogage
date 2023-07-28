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
      <S.GameStartsecond className="col-10 second">
          <S.GamePick1Text className='bgi'>강아지를 키울 집을 골라주세요!</S.GamePick1Text>
          <div className='d-flex justify-content-around align-items-center'>
          {/* <S.GamePick2Arrow src="assets/things/left-arrow.png" alt="left-arrow" /> */}
          <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <S.GamePick2BGI className={`d-block one ${currentButton === 0 ? 'clicked' : ''}`} onClick={() => handleButtonPick(0)} isClicked={currentButton === 0}></S.GamePick2BGI>
              </div>
              <div class="carousel-item">
                <S.GamePick2BGI className={`d-block two ${currentButton === 1 ? 'clicked' : ''}`} onClick={() => handleButtonPick(1)} isClicked={currentButton === 1}></S.GamePick2BGI>
              </div>
              <div class="carousel-item">
                <S.GamePick2BGI className={`d-block three ${currentButton === 2 ? 'clicked' : ''}`} onClick={() => handleButtonPick(2)} isClicked={currentButton === 2}></S.GamePick2BGI>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          </div>
          <div class="d-flex justify-content-between">
              <S.GamePick1Btn className='btn' type="submit" onClick={onPreviousPage}>이전으로</S.GamePick1Btn>
              <S.GamePick1Btn className='btn' type="submit" onClick={onNextPage}>다음으로</S.GamePick1Btn>
          </div>
      </S.GameStartsecond>
    );
  }
  
  export default GamePick2;
  