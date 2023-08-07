// 게임 시작 화면
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameBasicScreen.style"
import GameMenu from "./GameMenu"
import GameBtn from "./GameBtn"
import {useRecoilValue, useRecoilState} from "recoil"
import { SimulationExistAtom, SimulationWalkingCnt, SimulationCost, requirementImagesState, nextImageState, SimulationHp  } from "../../recoil/SimulationAtom"


function GameBasicScreen(props) { // 자식에서 부모로 데이터 보내기
    // const walkingCnt = useRecoilValue(SimulationWalkingCnt) // 산책 횟수
    const [cost, setCost] = useRecoilState(SimulationCost)
    // requirementImages Recoil 상태와 상태 업데이트 함수를 가져옴
    const [requirementImages, setRequirementImages] = useRecoilState(requirementImagesState); // 이미지 객체로 저장
    const [nextImage, setNextImage] = useRecoilState(nextImageState); // 다음 이미지(배변용)
    const [simulationExistValue, setSimulationExistValue] = useRecoilState(SimulationExistAtom)
    const [hpPercentage, setHpPercentage] = useState(simulationExistValue.health)
    const [requirement, setRequirement] = useState(simulationExistValue.requirement)
    // const [petname, setPetname] = useState('')
    // const [background, setBackground] = useState(0)
    // const [petType, setPetType] = useState(0)

    console.log(simulationExistValue)
      // 산책 횟수 카운트
    const walking = simulationExistValue.requirement
    ? simulationExistValue.requirement.substr(2, 1)
    : 0;
    useEffect(() => {
        // 처음 로드할 때 localStorage에서 hpPercentage를 가져와서 상태를 설정합니다.
        setRequirement(localStorage.getItem('requirement'));
        setHpPercentage(localStorage.getItem('hpPercentage'))
        setCost(localStorage.getItem('cost'))
        // setPetname(localStorage.getItem('petname'))
        // setBackground(localStorage.getItem('background'))
        // setPetType(localStorage.getItem('petType'))
      }, []);
    const move = (hp, pay) => {
        setSimulationExistValue(prevState => {
            const newHealth = parseInt(prevState.health) + hp;
            const newCost = Math.max(parseInt(prevState.cost) - pay, 0); // 
            
            return {
                ...prevState,
                health: newHealth,
                cost: newCost
            };
        });
    };
    

    const setHandleMove = (num) => {
        props.handleMove(num)
        if (num === 7) { // 산책
            move(5, 1000)
            setSimulationExistValue(prevState => ({
                ...prevState,
                requirement: (parseInt(simulationExistValue.requirement)+10).toString().padStart(4, '0')
              }));
            setHpPercentage(simulationExistValue.health)
            setCost(simulationExistValue.cost)
              localStorage.setItem('requirement', simulationExistValue.requirement);
        } else if (num === 8) { // 식사
            move(20, 2000)
            setSimulationExistValue(prevState => ({
                ...prevState,
                requirement: (parseInt(simulationExistValue.requirement)+1000).toString().padStart(4, '0')
              }));
              setHpPercentage(simulationExistValue.health)
              setCost(simulationExistValue.cost)
              localStorage.setItem('requirement', simulationExistValue.requirement);
        } else if (num === 9) { // 배변
            move(5, 500)
            setHpPercentage(simulationExistValue.health)
            setCost(simulationExistValue.cost)
        } else if (num === 10) { // 간식
            move(10, 1000)
            setSimulationExistValue(prevState => ({
                ...prevState,
                requirement: (parseInt(simulationExistValue.requirement)+100).toString().padStart(4, '0')
              }));
              setHpPercentage(simulationExistValue.health)
              setCost(simulationExistValue.cost)
              localStorage.setItem('requirement', simulationExistValue.requirement);
        } else if (num === 11) { // 장난감
            move(5, 500)
            setSimulationExistValue(prevState => ({
                ...prevState,
                requirement: (parseInt(simulationExistValue.requirement)+1).toString().padStart(4, '0')
              }));
              setHpPercentage(simulationExistValue.health)
              setCost(simulationExistValue.cost)
              localStorage.setItem('requirement', simulationExistValue.requirement);
        }
    }
    useEffect(() => {
        localStorage.setItem('hpPercentage', simulationExistValue.health);
        localStorage.setItem('cost', simulationExistValue.cost);
        }
      , [simulationExistValue]);

      const [showRandomImage, setShowRandomImage] = useState(null); // 어떤 이미지 보여줄건지
      const [requirementNum, setRequirementNum] = useState(0); // 요구사항 컴포넌트 번호
      const [isImageVisible, setIsImageVisible] = useState(false); // 이미지 보여줄건지 말건지
      const [req4Count, setReq4Count] = useState(0); // "assets/things/requirement4.png"의 출현 횟수
      const [emergency, setEmergency] = useState(0) // 응급상황 횟수

    useEffect(() => {
    const currentHour = new Date().getHours();
    let matchedImage = null;
    let matchedNum = 0;

    const updatedImages = requirementImages.map((img) => {
        // 시간 범위 내에 들고, check=0인 이미지
        const matchedTimeRange = img.timeRanges.find(
        (range) => currentHour >= range.startTime && currentHour < range.endTime && range.check === 0
        );
        if (matchedTimeRange) {
        matchedImage = img.image;
        matchedNum = img.num;
        const updatedTimeRanges = img.timeRanges.map((range) =>
            range.startTime === matchedTimeRange.startTime && range.endTime === matchedTimeRange.endTime
            ? { ...range, check: 1 } // check 1로 바꿔주기
            : range
        );
        return { ...img, timeRanges: updatedTimeRanges }; // 새로 만든 객체 리턴
        }
        return img;
    });

    setRequirementImages(updatedImages);
    if (matchedImage) {
        setShowRandomImage(matchedImage); // 현재 시간대에 해당하는 이미지 설정
        setRequirementNum(matchedNum);
        setIsImageVisible(!!matchedImage); // showRandomImage가 존재하면 이미지를 보이도록 설정
    }
    // 만약 matchedImage가 없고, "assets/things/requirement4.png"의 출현 횟수가 8 미만이면
    // 해당 이미지를 보여준다
    else if (req4Count < 8 && Math.random() < 0.5) { // 50%의 확률로 이미지가 보이게 설정, 확률은 조정 가능
        setShowRandomImage("assets/things/requirement4.png");
        setRequirementNum(11);
        setIsImageVisible(true);
        setReq4Count(req4Count + 1); // 출현 횟수 증가
    }

    // 이미지가 존재하면, 60초 후에 이미지를 사라지게 함
    if (matchedImage || req4Count < 8) {
        const timeoutId = setTimeout(() => {
        setIsImageVisible(false);
        }, 10 * 1000); // 60초 후에 실행
        return () => clearTimeout(timeoutId); // useEffect의 cleanup 함수에서 setTimeout을 clear함
    }
    }, []);

    
    
      const handleImageClick = () => {
        if (isImageVisible) {
          setIsImageVisible(false)
          if (requirementImages[0].image === "assets/things/requirement1.png" && showRandomImage === "assets/things/requirement1.png") {
            console.log(requirementImages[0].image, showRandomImage)
            setNextImage("assets/things/requirement3.png");
          }
        }
    };
    console.log(requirementNum)
    useEffect(() => {
      if (nextImage) {
        console.log('Next image set, starting timer...');  // 로그 추가
        const timeoutId = setTimeout(() => {
          console.log('Timer finished, showing next image:', nextImage);  // 로그 추가
          console.log(requirementNum)
          setRequirementNum(9)
          setShowRandomImage(nextImage);  // nextImage에 해당하는 이미지 설정
          setIsImageVisible(true);  // 변경된 이미지를 보이도록 설정
          setNextImage(null);  // nextImage 상태를 초기화
        }, 1 * 10 * 1000);  // 3분 후에 실행
    
        return () => clearTimeout(timeoutId);  // useEffect의 cleanup 함수에서 setTimeout을 clear함
      }
    }, [nextImage]);
    
  return (
    <S.GameStartsecond className="col-10 second d-flex flex-column justify-content-between"
    petType={simulationExistValue.petType}
    background={simulationExistValue.background}
    >
        <div className="d-flex justify-content-between">
            <div>
                <GameBtn className="orange" onClick={() => setHandleMove(6)} >훈련하러 가기</GameBtn> 
                {/* 바로 실행 안되게 하려면 화살표 함수 필수.. */}
                <br />
                <GameBtn 
                    className="orange"
                    data-bs-toggle={walking >= 3 ? "modal" : (simulationExistValue.cost === "0" ? "modal" : "")}
                    data-bs-target={walking >= 3 ? "#exampleModal2" : (simulationExistValue.cost === "0" ? "#exampleModal3" : "")}
                    onClick={() => {
                        if (walking < 3) {
                        setHandleMove(7);
                        }
                    }}
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
                <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-sm modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">산책 횟수 제한</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                돈이 없습니다!!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <GameBtn className="orange" as="div">{simulationExistValue.petName}네 집</GameBtn>
            </div>
            <div className="d-flex flex-column justify-content-between align-items-end">
                <div className="d-flex flex-column">
                    <GameMenu borderColor="#FF914D" time={props.time}/>
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
                    <GameBtn onClick={() => setHandleMove(12)} className="orange">돈 벌러 가기</GameBtn>
                    </div>
                </div>
            </div>
        </div>
        <div className='d-flex justify-content-center'>
            <S.DogImg src={`assets/${simulationExistValue.petType}/idle${simulationExistValue.petType}.gif`} alt="" />
            <S.DogBtn 
                onClick={() => {
                    if (simulationExistValue.cost !== "0") {
                        setHandleMove(requirementNum);
                    }
                }}
                data-bs-toggle={simulationExistValue.cost === "0" ? "modal" : ""}
                data-bs-target={simulationExistValue.cost === "0" ? "#exampleModal4" : ""}
            >
                {isImageVisible && (
                    <S.Requirement src={showRandomImage} alt="" onClick={handleImageClick} />
                )}
            </S.DogBtn>
                    <div class="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">돈이 부족합니다😥</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        퀴즈를 통해 돈을 벌어보세요🎉
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div className="d-flex justify-content-end">
            <S.GameBasicOver data-bs-toggle="modal" data-bs-target="#exampleModal1">중도포기하기</S.GameBasicOver>
        </div>
        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>❌중도 포기는 불가합니다❌</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h3>당신의 소중한 가족을 버리실건가요?</h3>
                        <S.ModalIMG src="assets/crying.jpg" alt="crying" />
                    </div>
                </div>
            </div>
        </div>
    </S.GameStartsecond>
    );
  }
  
  export default GameBasicScreen;