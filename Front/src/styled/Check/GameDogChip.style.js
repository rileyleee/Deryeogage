import styled from "styled-components";

export const GameStartsecond = styled.div`
    &.second {
        border: 1px #C5C1BF dashed;
        margin-top: 3vw;
        height: 32vw;
        position: relative;
        padding-bottom: 2.5vw;
        /* background-color: beige; */
        /* padding-bottom: 35%; */
    }
`

export const GameDogChipButton = styled.button`
    font-size: 2vw;
    font-weight: bold;
    color: white;
    text-align: center;
    background-color: #FF914D;
    border: none;
    border-radius: 30px;
    position: absolute;
    left: 35%;
    top: 30%;
    /* transform: translate(-50%, -50%); */
`

export const GameDogChipNum = styled.p`
    font-size: 2vw;
    position: absolute;
    left: 50%;
    top: 50%; 
    transform: translate(-50%, -50%);
    text-align: center;
    margin-top: 2vw;
`

export const GameButtonBox = styled.div`
    &.d-flex {
        height: 32vw;
    }
`

export const GamePick1Input = styled.input`
    height: 3vw;
    width: 15vw;
    border-radius: 30px;
    margin-top: 4vw;
    border: 1px #FF914D solid;
    outline: 1px #FF914D solid;
    text-align: center;
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

