import styled from "styled-components";

export const GameStartsecond = styled.div`
    &.second {
        height: 70vh;
        padding: 1vh;
        background-image: url("assets/emotion/Emote_Heart.png"), url("assets/things/bubble.png"), url(${props => `assets/${props.petType}/idlefast${props.petType}.gif`}),url("assets/background/treat.jpg");
        background-repeat: no-repeat;
        background-position: 81% 62%, 85% 65%,60% 80%, center;
        background-size: 10% 10%, 20% 20%, 30% 30%, cover;
    }
`

export const GameBasicButton = styled.button`
    border: 1px #6458F5 solid;
    background-color: white;
    border-radius: 30px;
    padding: 3px 1vw;
    margin-bottom: 1vh;
    font-weight: bold;
    text-align: center
`