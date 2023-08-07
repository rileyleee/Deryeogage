import styled from "styled-components";

export const GameStartsecond = styled.div`
    &.second {
        height: 70vh;
        padding: 1vh;
        background-color: black;
        background-image: url("assets/emotion/Emote_X.png"), url("assets/things/bubble.png"), url(${props => `assets/${props.petType}/death${props.petType}.png`});
        background-repeat: no-repeat;
        background-position: 57% 49%, 55% 50%,50% 80%;
        background-size: 10% 10%, 20% 20%, 30% 30%;
    }
`

export const GameBasicButton = styled.button`
    border: 2px red solid;
    background-color: white;
    height: 10vh;
    padding: 3px 1vw;
    margin-bottom: 1vh;
    font-weight: bold;
    text-align: center
`