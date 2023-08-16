// 게임 시작 화면
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameBasicScreen.style"
import GameMenu from "./GameMenu"
import GameBtn from "./GameBtn"
import {useRecoilValue, useRecoilState} from "recoil"
import { SimulationExistAtom, SimulationWalkingCnt, SimulationCost, requirementImagesState, nextImageState, SimulationHp, GameQuiz, SelectedQuiz } from "../../recoil/SimulationAtom"


function GameBasicScreen(props) { // 자식에서 부모로 데이터 보내기
    const [cost, setCost] = useRecoilState(SimulationCost)
    // requirementImages Recoil 상태와 상태 업데이트 함수를 가져옴
    const [requirementImages, setRequirementImages] = useRecoilState(requirementImagesState); // 이미지 객체로 저장
    const [nextImage, setNextImage] = useRecoilState(nextImageState); // 다음 이미지(배변용)
    const [simulationExistValue, setSimulationExistValue] = useRecoilState(SimulationExistAtom)
    const [hpPercentage, setHpPercentage] = useState(simulationExistValue.health)
    const [requirement, setRequirement] = useState(simulationExistValue.requirement)
    const Quiz = useRecoilValue(GameQuiz);
    const [quizCount, setQuizCount] = useState(simulationExistValue.quizNum);
    const [selectedQuiz, setSelectedQuiz] = useRecoilState(SelectedQuiz);
    console.log(quizCount)
    console.log(requirement)

      // 산책 횟수 카운트
    let walking = simulationExistValue.requirement ? simulationExistValue.requirement.substr(3, 1) : 0;

    useEffect(() => {
        // 처음 로드할 때 localStorage에서 hpPercentage를 가져와서 상태를 설정합니다.
        setRequirement(localStorage.getItem('requirement'));
        setHpPercentage(parseInt(localStorage.getItem('hpPercentage')))
        setCost(parseInt(localStorage.getItem('cost')))
        setQuizCount(localStorage.getItem('quizNum'))
      }, [setRequirement, setHpPercentage, setCost, setQuizCount]);

      const move = (hp, pay) => {
        setSimulationExistValue(prevState => {
            let newHealth = parseInt(prevState.health) + hp;
            newHealth = Math.min(newHealth, 100); // health가 100을 넘지 않도록 함
            const newCost = Math.max(parseInt(prevState.cost) - pay, 0);
    
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
            move(10, 1000)
            setSimulationExistValue(prevState => ({
                ...prevState,
                requirement: (parseInt(simulationExistValue.requirement)+10).toString().padStart(5, '0')
              }));
            setHpPercentage(simulationExistValue.health)
            setCost(simulationExistValue.cost)
            //   localStorage.setItem('requirement', simulationExistValue.requirement);
        } else if (num === 8) { // 식사
            move(20, 3000)
            setSimulationExistValue(prevState => ({
                ...prevState,
                requirement: (parseInt(simulationExistValue.requirement)+1000).toString().padStart(5, '0')
              }));
              setHpPercentage(simulationExistValue.health)
              setCost(simulationExistValue.cost)
            //   localStorage.setItem('requirement', simulationExistValue.requirement);
        } else if (num === 9) { // 배변
            move(5, 500)
            setHpPercentage(simulationExistValue.health)
            setCost(simulationExistValue.cost)
        } else if (num === 10) { // 간식
            move(10, 1500)
            setSimulationExistValue(prevState => ({
                ...prevState,
                requirement: (parseInt(simulationExistValue.requirement)+100).toString().padStart(5, '0')
              }));
              setHpPercentage(simulationExistValue.health)
              setCost(simulationExistValue.cost)
              
            //   localStorage.setItem('requirement', simulationExistValue.requirement);
        } else if (num === 11) { // 장난감
            move(5, 500)
            setSimulationExistValue(prevState => ({
                ...prevState,
                requirement: (parseInt(simulationExistValue.requirement)+1).toString().padStart(5, '0')
              }));
              setHpPercentage(simulationExistValue.health)
              setCost(simulationExistValue.cost)
              setReq4Count(req4Count + 1)
            //   localStorage.setItem('requirement', simulationExistValue.requirement);
        } else if (num === 13) { // 응급상황
            move(0, 120000)
            setSimulationExistValue(prevState => ({
                ...prevState,
                requirement: (parseInt(simulationExistValue.requirement)+10000).toString().padStart(5, '0')
              }));
              setCost(simulationExistValue.cost)
              setEmergency(emergency+1)
            //   localStorage.setItem('requirement', simulationExistValue.requirement);
        }
    }
    useEffect(() => {
        localStorage.setItem('hpPercentage', simulationExistValue.health);
        localStorage.setItem('cost', simulationExistValue.cost);
        localStorage.setItem('requirement', simulationExistValue.requirement);
        }
      , [simulationExistValue]);

      const [showRandomImage, setShowRandomImage] = useState(null); // 어떤 이미지 보여줄건지
      const [requirementNum, setRequirementNum] = useState(0); // 요구사항 컴포넌트 번호
      const [isImageVisible, setIsImageVisible] = useState(false); // 이미지 보여줄건지 말건지
      const [req4Count, setReq4Count] = useState(parseInt(simulationExistValue.requirement.substr(4, 1))); // "assets/things/requirement4.png"의 출현 횟수
      const [emergency, setEmergency] = useState(parseInt(simulationExistValue.requirement.substr(0, 1))) // 응급상황 횟수
      console.log(emergency, req4Count, requirementNum)
    
        
      const getPayValue = (requirementNum) => {
        switch (requirementNum) {
          case 7: return 1000;
          case 8: return 3000;
          case 9: return 500;
          case 10: return 1500;
          case 11: return 500;
          case 13: return 120000;
          default: return 0;
        }
      }

    const currentPayValue = getPayValue(requirementNum);
    console.log(currentPayValue)
    
    // 60초동안 클릭 안하면 -30을 위한
    const requirementNumRef = useRef(0);
    useEffect(() => {
        requirementNumRef.current = requirementNum; // 매번 업데이트 될 때마다 현재 값을 ref에 저장
      }, [requirementNum]);
    
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
        }
        else if (emergency < 2 && Math.random() < 0.2) {
          setShowRandomImage("assets/things/sick.png");
          setRequirementNum(13);
          setIsImageVisible(true);
        }
      
        // 이미지가 존재하면, 60초 후에 이미지를 사라지게 함
        if (matchedImage || req4Count < 8 || emergency < 2) {
            const timeoutId = setTimeout(() => {
              console.log(requirementNumRef.current) // ref의 현재 값을 출력
              if (requirementNumRef.current === 13) {
                  console.log("작동 되니?");
                setSimulationExistValue(prevState => {
                  let newHealth = Math.max(parseInt(prevState.health) - 30, 0);
                  return {
                    ...prevState,
                    health: newHealth,
                    requirement: (parseInt(simulationExistValue.requirement)+10000).toString().padStart(5, '0')
                  };
                });
              }
              setIsImageVisible(false);
            }, 60 * 1000);
        
            return () => clearTimeout(timeoutId); // useEffect의 cleanup 함수에서 setTimeout을 clear함
          }
        }, []);
      
    // 배변
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
        }, 3 * 60 * 1000);  // 3분 후에 실행
    
        return () => clearTimeout(timeoutId);  // useEffect의 cleanup 함수에서 setTimeout을 clear함
      }
    }, [nextImage]);

  const showRandomQuiz = (num) => {
    if (quizCount < 5) {
      const randomIndex = Math.floor(Math.random() * 20)+1; // 범위 조정
      console.log(randomIndex)
      const selected = Quiz[randomIndex];
      console.log(selected)
      setSelectedQuiz(selected);
      props.handleMove(num);
    } else {
      console.log("퀴즈가 모두 끝났습니다.");
    }
  };

  useEffect(() => {
    console.log(selectedQuiz);
  }, [selectedQuiz]);
      
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
                    data-bs-toggle={walking >= 3 ? "modal" : (simulationExistValue.cost < currentPayValue ? "modal" : "")}
                    data-bs-target={walking >= 3 ? "#exampleModal2" : (simulationExistValue.cost < currentPayValue ? "#exampleModal4" : "")}
                    onClick={(e) => {
                        if (walking >= 3 || parseInt(simulationExistValue.cost) < currentPayValue) {
                            e.preventDefault(); // 클릭 동작 막기
                            // 조건에 따라 필요한 모달 띄우는 코드 (이미 data-bs-toggle 및 data-bs-target 속성을 사용하고 있으므로 별도 처리는 필요 없을 수 있음)
                        } else {
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
            </div>
            <div>
                <GameBtn className="orange" as="div">{simulationExistValue.petName}네 집</GameBtn>
            </div>
            <div className="d-flex flex-column justify-content-between align-items-end">
                <div className="d-flex flex-column">
                    <GameMenu borderColor="#FF914D" time={props.time}/>
                    <div className="d-flex flex-column align-items-end">
                    <GameBtn className="orange" data-bs-toggle="modal" data-bs-target="#exampleModal">게임 설명</GameBtn>
                    <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">게임 설명</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <S.GameModalBody>
                                    <p>▪ 체력은 100 이상 넘어가지 않음</p>
                                    <p>▪ 게임은 24시간 후 종료, 체력 0이 되면 사망</p>
                                    <p>▪ 밥 3000원 / 체력 +20 / 총 2회 (8~9시, 17~18시)</p>
                                    <p>▪ 간식 1500원 / 체력 +10 / 총 2회 (12시~13시, 20시~21시)</p>
                                    <p>▪ 배변패드 500원 / 체력 +5 / 총 2회 (식사 후 3분 후에)</p>
                                    <p>▪ 장난감 500원 / 체력 +5 / 총 8회(랜덤)</p>
                                    <p>▪ 산책 1000원 / 체력 +5 / 총 3회 (원할 때 가능)</p>
                                    <p>▪ 병원비 120000원 / 미수행 시 체력 -30 / 최대 2회 (랜덤)</p>
                                </S.GameModalBody>
                            </div>
                            </div>
                        </div>
                    </div>
                    <GameBtn disabled={quizCount === 5} onClick={() => showRandomQuiz(12)} className="orange">돈 벌러 가기</GameBtn>
                    </div>
                </div>
            </div>
        </div>
        <div className='d-flex justify-content-center'>
            <S.DogImg src={`assets/${simulationExistValue.petType}/idle${simulationExistValue.petType}.gif`} alt="" />
            <S.DogBtn 
                onClick={(e) => {
                    if (parseInt(simulationExistValue.cost) < currentPayValue) {
                        e.preventDefault(); // 클릭 동작 막기

                        // 응급상황일 경우
                        if (requirementNum === 13) {
                            setSimulationExistValue(prevState => {
                                let newHealth = Math.max(parseInt(prevState.health) - 30, 0); // health가 0 미만이 되지 않도록 함
                                return {
                                    ...prevState,
                                    health: newHealth,
                                    requirement: (parseInt(simulationExistValue.requirement)+10000).toString().padStart(5, '0')
                                };
                            });
                            setEmergency(emergency+1)
                        }

                        // 모달을 띄우는 코드, 필요한 경우
                    } else {
                        setHandleMove(requirementNum);
                    }
                }}
                data-bs-toggle={parseInt(simulationExistValue.cost) < currentPayValue ? "modal" : ""}
                data-bs-target={parseInt(simulationExistValue.cost) < currentPayValue ? "#exampleModal4" : ""}
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