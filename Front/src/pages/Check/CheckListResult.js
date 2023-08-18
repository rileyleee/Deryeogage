import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled, { css, keyframes } from 'styled-components';
import { InfoContainer } from "./CheckList";
import 'animate.css/animate.css';


// styled-components 추가
const ResultContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  border-radius: 25px;
  background-color: #FFF0D7;
  display: flex;
  flex-direction: column;
  justify-content: center;  /* 수평 가운데 정렬 */
  align-items: center;      /* 수직 가운데 정렬 */
  height: 100%;

  p {
    text-align: center;
  }
`;

const PledgeContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 20px;
  padding: 20px;
  width: 60%;
  height: 600px;
  background-image: url('/assets/paper-overlay.jpg');
  background-size: cover;
  background-position: center;
  vertical-align: middle;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  
  h3 {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  h6 {
    text-align: right;
  }

  &::before {
    pointer-events: none;
    position: absolute;
    content: '';
    height: 0;
    width: 0;
    top: 0;
    left: 0;
    background: #FFF0D7;
    /* IE9 */
    background: linear-gradient(135deg, #FFF0D7 45%, #e1e1e1 56%, #f9f9f9 80%);
    /*For IE7-8-9*/
    z-index: 1000;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.5s;
    -webkit-transition-property: width, height;
    transition-property: width, height;
  }
  &:hover:before,
  &:focus:before,
  &:active:before {
    width: 100px;
    height: 100px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  `;

const AnswersContainer = styled.div`
  ul {
    list-style-type: none;
    
    li {
      margin-bottom: 5px;
    }
  }
  `;

  const TextContainer = styled.div`
    margin-top: 20px;
    h6 {
      text-align: center;
      padding-top: 50px;
      white-space: pre-line;
    }
  `;
  
  const HoverButton = css`
    &:hover {
      background-color: #ff7140;
      display: inline-block;
      vertical-align: middle;
      -webkit-transform: perspective(1px) translateZ(0);
      transform: perspective(1px) translateZ(0);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0);
      overflow: hidden;
      -webkit-transition-duration: 0.3s;
      transition-duration: 0.5s;
      -webkit-transition-property: color, background-color;
      transition-property: color, background-color;
    } 
  `;

const DeleteButton = styled.button`
  padding: 10px;
  font-size: 1em;
  background-color: #ff914d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  ${HoverButton}
`;

const stampEffect = keyframes`
  0% {
    transform: translateY(-50%) scale(0.2);
    opacity: 0;
  }
  60% {
    transform: translateY(10%) scale(7.0);
    opacity: 1;
  }
  70% {
    transform: translateY(0%) scale(2.0);
    opacity: 1;
  }
  75% {
    transform: translateY(-8%) scale(2.0);
    opacity: 1;
  }
  80% {
    transform: translateY(8%) scale(2.0);
    opacity: 1;
  }
  85% {
    transform: translateX(-8%) scale(2.0);
    opacity: 1;
  }
  90% {
    transform: translateX(8%) scale(2.0);
    opacity: 1;
  }
  95% {
    transform: translateY(-8%) scale(2.0);
    opacity: 1;
  }
  100% {
    transform: translateY(0%) scale(2.0);
    opacity: 1;
  }
`;

const Stamp = styled.img`
  display: inline;
  position: absolute;
  top: -100px;
  right: -200px;
  width: 80px;
  height: auto;
  opacity: 0;
  transform: translateY(-60%) scale(0.8);
  transition: transform 0.7s ease-out, opacity 0.3s ease-out;
  will-change: transform, opacity;
  animation: ${stampEffect} 0.7s forwards;
`;

const StampWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 500px;
  height: auto;
  overflow: visible;

  @media (max-width: 768px) {  // 768px 미만의 화면 너비에서 적용될 스타일
    width: 300px;  // 변경된 크기
    // 필요한 다른 스타일도 여기에 추가
  }
`;

const AlignedText = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 50px;
  margin-left: 150px;
`;

const AlignedItem = styled.div`
    flex: 1;  /* flex-grow: 1, flex-shrink: 1, flex-basis: 0%의 축약형 */
    padding: 10px;            /* 아이템 내부 여백 */
    box-sizing: border-box;   /* 경계선과 패딩을 포함한 총 너비 계산 */
    
    h6 {
      text-align: left;
      margin-left: 60px;
    }

    pre {
      font-family: 'Nanum-hand-Font', sans-serif; 
    }
`;

function CheckListResult() {
  const navigate = useNavigate();

  // 답변을 표시할지 결정하는 상태 추가
  const [showAnswers, setShowAnswers] = useState(false);
  const [answers, setAnswers] = useState({});
  const [data, setData] = useState({ score: "", promise: "", date: "" });

  const handleDeleteClick = async () => {
    // 삭제 버튼 핸들러 추가
    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/pretests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/checklist"); // 삭제 후 체크리스트 페이지로 이동
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    // 토큰은 어떤 방식으로 저장되어 있는지에 따라 가져오는 방식이 달라집니다.
    // 아래의 코드는 localStorage에 'token' 이름으로 저장되어 있다고 가정한 것입니다.
    const token = localStorage.getItem("accessToken");
    // Get the stored answers from local storage
    const storedAnswers = JSON.parse(localStorage.getItem("answers") || "{}");
    setAnswers(storedAnswers);
    axios
      .get(`${process.env.REACT_APP_API_URL}/pretests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData({
          score: response.data.data.score,
          promise: response.data.data.promise,
          date: response.data.data.responseDate
        });
        console.log(response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const currDate = new Date(data.date);

  const getAnswerColor = (answer) => {
    switch (answer) {
      case '아주많이':
        return 'red';
      case '많이':
        return '#ff914d'; // 주황색
      default:
        return 'black'; // 기본 텍스트 색상
    }
  };

  
  return (
    <div className="animate__animated animate__fadeIn">
      <InfoContainer>
        {localStorage.getItem('nickname')}님의 사전테스트 결과를 확인해보세요
      </InfoContainer>
      <ResultContainer>
        <PledgeContainer>
          <h3>입양 서약서</h3>
          <StampWrapper>
            <Stamp src={data.score < 50 ? "/assets/rejected-stamp.png" : "/assets/approved-stamp.png"} alt="Stamp"></Stamp>
            <AlignedText>
              <AlignedItem></AlignedItem>
              <AlignedItem></AlignedItem>
              <AlignedItem>
                <h6>이름  :  {localStorage.getItem("nickname")}</h6>
                <h6>점수  :   {data.score}점</h6>
              </AlignedItem>  
            </AlignedText>
          </StampWrapper>
          <TextContainer>
            <h6>{data.promise}</h6>
            <h6>{currDate.getFullYear()}년 {currDate.getMonth() + 1}월 {currDate.getDate()}일</h6>
            <h6>서약자   :   {localStorage.getItem("nickname")}</h6>
          </TextContainer>
        </PledgeContainer>
        <p>입양서약서와 사전테스트 점수는 분양자가 <span>확인</span>할 수 있습니다.</p>
        <ButtonContainer>
          <DeleteButton onClick={handleDeleteClick}>다시 진행하기</DeleteButton> 
        </ButtonContainer>
          {showAnswers && (
            <AnswersContainer>
              <ul>
                {Object.entries(answers).map(([question, answer], index) => (
                  <li key={index} style={{ color: getAnswerColor(answer) }}>
                    {question}: {answer}
                  </li>
                ))}
              </ul>
            </AnswersContainer>
          )}
      </ResultContainer>
    </div>
  );
}

export default CheckListResult;
