import styled from "styled-components";

export const GameStartsecond = styled.div`
    &.second {
        border: 1px #C5C1BF dashed;
        height: 70vh;
        padding: 3vh;
        /* background-color: beige; */
        /* padding-bottom: 35%; */
    }
`

export const GamePick2BGI = styled.button`
    height:45vh;
    width: 40vw;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border: none;
    /* background-color: bisque; */
    &.one {
        background-image: url("assets/home/home1.png");
        border: ${props => (props.isclicked ? '3px #FF914D solid' : 'none')};
    }
    &.two {
        background-image: url("assets/home/home2.png");
        border: ${props => (props.isclicked ? '3px #FF914D solid' : 'none')};
    }
    &.three {
        background-image: url("assets/home/home3.png");
        border: ${props => (props.isclicked ? '3px #FF914D solid' : 'none')};
    }
`

export const GamePick1Text = styled.p`
    font-size: 2vw;
    font-weight: bold;
    color: #4A2511;
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
        /* margin-top: 1vw; */
    }
`

export const GamePick2Arrow = styled.img`
    width: 2vw;
    height: 2vw;
`