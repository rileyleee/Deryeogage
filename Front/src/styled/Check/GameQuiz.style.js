import styled from "styled-components";

export const GameStartsecond = styled.div`
    &.second {
        height: 34vw;
        padding: 0.5vw;
        /* border: 1px #FF914D solid; */
        background-color: #FFF1D6;
    }
`

export const GameQuizButton = styled.button`
    margin-top: 4vw;
    border: 2px ${props => props.isCorrectAnswer ? 'blue' : props.isWrongAnswer ? 'red' : '#FF914D'} solid;
    height: 5vw;
    width: 16vw;
    background-color: white;
    border-radius: 15px;
    padding: 3px 1vw;
    font-weight: bold;
    text-align: center;
`;


export const GameQuiz = styled.div`
    background-color: white;
    height: 15vw;
    margin-top: 1vw;
    border-radius: 30px;
    text-align: center;
    padding: 0.5vw;
`

export const Quiz = styled.div`
    height: 5vw;
    margin-top: 1vw;
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
    margin-top: 0.5vw;
    margin-left: 1vw;
    border: none;
    background-color: #FF914D;
    border-radius: 30px;
    color: white;
    visibility: ${props => (props.isHidden ? 'hidden' : 'visible')};
    padding: 0.5vw 0;
  // 기타 스타일 속성
`