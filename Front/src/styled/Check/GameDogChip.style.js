import styled from "styled-components";

export const GameStartsecond = styled.div`
    &.second {
        border: 1px #C5C1BF dashed;
        height: 34vw;
        padding: 1.5vw;
        /* background-color: beige; */
        /* padding-bottom: 35%; */
    }
`

export const GameDogChipButton = styled.button`
    width: 20vw;
    font-size: 2vw;
    font-weight: bold;
    color: white;
    text-align: center;
    background-color: #FF914D;
    border: none;
    border-radius: 30px;
    /* transform: translate(-50%, -50%); */
`

export const GameDogChipNum = styled.p`
    font-size: 2vw;
    text-align: center;
    display: ${props => (props.show ? "block" : "none")}
`

export const GamePick1Btn = styled.button`
    &.btn {
        font-weight: bold;
        border: none;
        background-color: #FF914D;
        padding: 0.5vw 1vw;
        border-radius: 30px;
        color: white;
        margin-top: 1vw;
    }
`

