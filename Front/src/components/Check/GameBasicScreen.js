// 게임 시작 화면
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameBasicScreen.style"
import GameMenu from "./GameMenu"
import GameBtn from "./GameBtn"
import {useRecoilValue, useRecoilState} from "recoil"
import { SimulationExistAtom, SimulationWalkingCnt, SimulationCost, requirementImagesState, nextImageState  } from "../../recoil/SimulationAtom"


function GameBasicScreen(props) { // 자식에서 부모로 데이터 보내기
    const existData = useRecoilValue(SimulationExistAtom) // 선택한 data
    const walkingCnt = useRecoilValue(SimulationWalkingCnt) // 산책 횟수
    const [cost, setCost] = useRecoilState(SimulationCost)
    // requirementImages Recoil 상태와 상태 업데이트 함수를 가져옴
    const [requirementImages, setRequirementImages] = useRecoilState(requirementImagesState);
    console.log(requirementImages)
    const [nextImage, setNextImage] = useRecoilState(nextImageState);
    // 산책 돈 계산 코드
    const setHandleMove = (num) => {
        props.handleMove(num)
        if (num === 7) {
            setCost(cost-1000)
            localStorage.setItem('cost', cost-1000)
        }
    }
    
      const [showRandomImage, setShowRandomImage] = useState(null);
      const [requirementNum, setRequirementNum] = useState(0);
      const [isImageVisible, setIsImageVisible] = useState(false);
    
      useEffect(() => {
        const currentHour = new Date().getHours();
        let matchedImage = null;
        let matchedNum = 0;
    
        const updatedImages = requirementImages.map((img) => {
          const matchedTimeRange = img.timeRanges.find(
            (range) => currentHour >= range.startTime && currentHour < range.endTime && range.check === 0
          );
          if (matchedTimeRange) {
            matchedImage = img.image;
            matchedNum = img.num;
            // 이미지를 보여준 시간대의 check를 1로 변경
            const updatedTimeRanges = img.timeRanges.map((range) =>
              range.startTime === matchedTimeRange.startTime && range.endTime === matchedTimeRange.endTime
                ? { ...range, check: 1 }
                : range
            );
            return { ...img, timeRanges: updatedTimeRanges };
          }
          return img;
        });
        // requirementImages 상태를 업데이트
        setRequirementImages(updatedImages);
        setShowRandomImage(matchedImage); // 현재 시간대에 해당하는 이미지 설정
        setRequirementNum(matchedNum);
        setIsImageVisible(!!matchedImage); // showRandomImage가 존재하면 이미지를 보이도록 설정
    
        // 이미지가 존재하면, 60초 후에 이미지를 사라지게 함
        if (matchedImage) {
          const timeoutId = setTimeout(() => {
            setIsImageVisible(false);
          }, 60 * 1000); // 60초 후에 실행
    
          // useEffect의 cleanup 함수에서 setTimeout을 clear함
          return () => clearTimeout(timeoutId);
        }
      }, []);
    
    
      const handleImageClick = () => {
        if (isImageVisible) {
          setIsImageVisible(false);
          if (requirementImages[0].image === "assets/things/requirement1.png" && showRandomImage === "assets/things/requirement1.png") {
            console.log(requirementImages[0].image, showRandomImage)
            setNextImage("assets/things/requirement3.png");
          }
        }
    };
    
    useEffect(() => {
      if (nextImage) {
        console.log('Next image set, starting timer...');  // 로그 추가
        const timeoutId = setTimeout(() => {
          console.log('Timer finished, showing next image:', nextImage);  // 로그 추가
          setShowRandomImage(nextImage);  // nextImage에 해당하는 이미지 설정
          setIsImageVisible(true);  // 변경된 이미지를 보이도록 설정
          setNextImage(null);  // nextImage 상태를 초기화
        }, 1 * 30 * 1000);  // 3분 후에 실행
    
        return () => clearTimeout(timeoutId);  // useEffect의 cleanup 함수에서 setTimeout을 clear함
      }
    }, [nextImage]);
    
  return (
    <S.GameStartsecond className="col-10 second d-flex flex-column justify-content-between"
    petType={existData.petType}
    background={existData.background}
    >
        <div className="d-flex justify-content-between">
            <div>
                <GameBtn className="orange" onClick={() => setHandleMove(6)} >훈련하러 가기</GameBtn> 
                {/* 바로 실행 안되게 하려면 화살표 함수 필수.. */}
                <br />
                <GameBtn 
                    className="orange"
                    data-bs-toggle={walkingCnt >= 3 ? "modal" : ""}
                    data-bs-target={walkingCnt >= 3 ? "#exampleModal2" : ""}
                    onClick={() => {
                        if (walkingCnt < 3) {
                        props.walkingIncreaseHp(walkingCnt); 
                        setHandleMove(7);
                        }
                    }}
                    // disabled={walkingCnt >= 3}
                    >
                    산책하러 가기
                </GameBtn>
                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-sm modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">산책 횟수 제한</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                하루에 산책은 3번만 가능합니다🐶
                                <S.ModalIMG src="assets/walking.jpg" alt="walking" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <GameBtn className="orange" as="div">{existData.petName}네 집</GameBtn>
            </div>
            <div className="d-flex flex-column justify-content-between align-items-end">
                <div className="d-flex flex-column">
                    <GameMenu borderColor="#FF914D" existData={existData} time={props.time} hp={props.hp}/>
                    <div className="d-flex flex-column align-items-end">
                    <GameBtn className="orange" data-bs-toggle="modal" data-bs-target="#exampleModal">가격표 보기</GameBtn>
                    <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-sm modal-dialog-centered">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">가격표</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <S.GameModalBody>
                                    <p>▪ 밥 2000원</p>
                                    <p>▪ 간식 1000원</p>
                                    <p>▪ 배변패드 500원</p>
                                    <p>▪ 장난감 500원</p>
                                    <p>▪ 산책 1000원</p>
                                    <p>▪ 병원비 100000원</p>
                                </S.GameModalBody>
                            </div>
                            </div>
                        </div>
                    </div>
                    <GameBtn className="orange">돈 벌러 가기</GameBtn>
                    </div>
                </div>
            </div>
        </div>
        <div className='d-flex justify-content-center'>
            <S.DogImg src={`assets/${existData.petType}/idle${existData.petType}.gif`} alt="" />
            <S.DogBtn onClick={() => setHandleMove(requirementNum)}>
      {isImageVisible && (
        <S.Requirement src={showRandomImage} alt="" onClick={handleImageClick} />
      )}
    </S.DogBtn>
        </div>
        <div className="d-flex justify-content-end">
            <S.GameBasicOver data-bs-toggle="modal" data-bs-target="#exampleModal1">중도포기하기</S.GameBasicOver>
        </div>
        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>중도 포기는 불가합니다ㅠㅠ</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <S.ModalIMG src="assets/crying.jpg" alt="crying" />
                    </div>
                </div>
            </div>
        </div>
    </S.GameStartsecond>
    );
  }
  
  export default GameBasicScreen;