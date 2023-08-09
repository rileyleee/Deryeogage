import styled from "styled-components";

export const GameStartsecond = styled.div`
    &.second {
        height: 70vh;
        padding: 1vh;
        /* border: 1px #FF914D solid; */
        background-color: #FFF1D6;
    }
`

export const GameQuizButton = styled.button`
    margin-top: 5vh;
    border: 2px ${props => props.isCorrectAnswer ? 'blue' : props.isWrongAnswer ? 'red' : '#FF914D'} solid;
    height: 10vh;
    width: 17vw;
    background-color: white;
    border-radius: 15px;
    padding: 3px 1vw;
    font-weight: bold;
    text-align: center;
`;


export const GameQuiz = styled.div`
    background-color: white;
    height: 30vh;
    margin-top: 2vh;
    border-radius: 30px;
    text-align: center;
    padding: 1vh;
`

export const Quiz = styled.div`
    height: 10vh;
    margin-top: 2vh;
`

export const GameQuizText = styled.h1`
    text-align: center;
`

export const GameQuizResult = styled.div`
    font-size: 2.5vw;
    color: ${props => props.isAnswered === null ? 'black' : props.isAnswered ? 'blue' : 'red'};
`;

export const GameBackBtn = styled.button`
    width: 8vw;
    margin-top: 1vh;
    margin-left: 1vw;
    border: none;
    background-color: #FF914D;
    border-radius: 30px;
    color: white;
    visibility: ${props => (props.isHidden ? 'hidden' : 'visible')};
  // 기타 스타일 속성
`