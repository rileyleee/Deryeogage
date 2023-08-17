import styled from "styled-components";

export const GameStartfirst = styled.div`
    &.first {
        padding: 2vw;
        margin-top: 1vw;
        margin-bottom: 1vw;
        border: 1px #FF914D solid; // borderColor 프롭에 따라 테두리 색 변경
        border-radius: 30px;
        background-color: white;
        height: 38vw;
    }
`
export const GameEnd = styled.div`
    height: 34vw;
    padding: 1.5vw;
    background-color: #FFF8E4;
`

export const GameResultBox = styled.div`
    background-color: white;
    height: 30vw;
    width: 30vw;
    font-weight: bold;
    border-radius: 30px;
    border: 1px #FF914D solid; 
    padding: 2vw 4vw;
`

export const GameResulth3 = styled.p`
    text-align: center;
    font-size: 1.7vw;
    margin-bottom: 1vw;
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
    padding-bottom: 0.5vw;
    padding-top: 0.5vw;
`

export const CheckImg = styled.img`
    width: 1vw;
`

export const PTAG = styled.p`
    margin-top: 1vw;
`