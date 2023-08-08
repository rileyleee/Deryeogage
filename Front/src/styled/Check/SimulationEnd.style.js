import styled from "styled-components";

export const GameStartfirst = styled.div`
    &.first {
        padding: 4.5vh;
        margin-top: 1vh;
        margin-bottom: 1vh;
        border: 1px #FF914D solid; // borderColor 프롭에 따라 테두리 색 변경
        border-radius: 30px;
        background-color: white;
        height: 80vh;
    }
`
export const GameEnd = styled.div`
    padding: 3vh;
    height: 70vh;
    background-color: #FFF8E4;
`

export const GameResultBox = styled.div`
    background-color: white;
    height: 60vh;
    width: 30vw;
    font-weight: bold;
    border-radius: 30px;
    border: 1px #FF914D solid; 
    padding: 2vw 4vw;
`

export const GameResulth3 = styled.p`
    text-align: center;
    font-size: 2vw;
`
export const GameResultp = styled.p`
    font-size: 1.5vw;
`

export const GameResultli = styled.li`
    font-size: 1vw;
`

export const GameResultBtn = styled.button`
    background-color: #FF914D;
    color: white;
    padding-left: 2vw;
    padding-right: 2vw;
    border: none;
    border-radius: 30px;
    padding-bottom: 1vh;
    padding-top: 1vh;
`

export const CheckImg = styled.img`
    width: 1vw;
`