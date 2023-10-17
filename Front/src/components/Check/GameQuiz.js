// 게임 시작 화면
import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameQuiz.style"
import { useRecoilValue, useRecoilState } from "recoil"
import { SimulationExistAtom,  SelectedQuiz } from "../../recoil/SimulationAtom"

function GameQuiz(props) { // 자식에서 부모로 데이터 보내기
    const setHandleMove = (num) => {
        props.handleMove(num)
    }
    const [simulationExistValue, setSimulationExistValue] = useRecoilState(SimulationExistAtom)
    const Quiz = useRecoilValue(SelectedQuiz)
    const [userAnswer, setUserAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(null); // 답을 선택하지 않은 상태

    // 누른 값이 정답인지 판별하고 값 변경
    const handleAnswer = (answer) => {
        const isCorrect = Quiz["정답"] === answer; // 정답인지 확인
        setUserAnswer(answer);
        setIsAnswered(isCorrect);
    
        setSimulationExistValue(prevState => ({
            ...prevState,
            quizNum: prevState.quizNum + 1,
            cost: isCorrect ? prevState.cost + 5000 : prevState.cost // 정답일 경우만 cost를 증가
        }));
    };
    
    useEffect(() => {
        localStorage.setItem('quizNum', simulationExistValue.quizNum);
        localStorage.setItem('cost', simulationExistValue.cost)
        }
      , [simulationExistValue])
      
    const questionText = isAnswered === null ? "문제" : isAnswered ? "정답" : "틀렸어요";
    const descriptionText = isAnswered === null ? Quiz["문제"] : Quiz["해설"];

    return (
        <S.GameStartsecond className="col-10 second">
            <S.GameBackBtn isHidden={isAnswered === null} onClick={() => setHandleMove(5)}>돌아가기</S.GameBackBtn>
            <S.GameQuizText> 강아지 상식 Quiz</S.GameQuizText>
        <div className="container">
          <div className="row">
            <div className="col-1">
            </div>
            <div className="col-10">
              <S.GameQuiz>
                <S.GameQuizResult isAnswered={isAnswered}>{questionText}</S.GameQuizResult>
                <S.Quiz>
                  <div>{descriptionText}</div>
                </S.Quiz>
              </S.GameQuiz>
              <div className="d-flex justify-content-around">
              <S.GameQuizButton
                disabled={isAnswered !== null} // 답을 이미 선택한 경우 버튼 비활성화
                isCorrectAnswer={userAnswer === "O" && Quiz["정답"] === "O"}
                isWrongAnswer={userAnswer === "O" && Quiz["정답"] !== "O"}
                onClick={() => handleAnswer("O")}
            >
                O
            </S.GameQuizButton>
            <S.GameQuizButton
                disabled={isAnswered !== null} // 답을 이미 선택한 경우 버튼 비활성화
                isCorrectAnswer={userAnswer === "X" && Quiz["정답"] === "X"}
                isWrongAnswer={userAnswer === "X" && Quiz["정답"] !== "X"}
                onClick={() => handleAnswer("X")}
            >
                X
            </S.GameQuizButton>
            </div>
            </div>
            <div className="col-1"></div>
          </div>
          </div>
        </S.GameStartsecond>
      );
  }
  
  export default GameQuiz;
