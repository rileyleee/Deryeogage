import styled from "styled-components";

export const GameStartsecond = styled.div`
    &.second {
        height: 34vw;
        padding: 0.5vw;
        background-image: url("/assets/emotion/Emote_Heart.png"), url("/assets/things/bubble.png"), url(${props => `/assets/${props.petType}/idlefast${props.petType}.gif`}),url("/assets/background/treat.jpg");
        background-repeat: no-repeat;
        background-position: 81% 62%, 85% 65%,60% 80%, center;
        background-size: 10% 10%, 20% 20%, 30% 30%, cover;
        image-rendering: -webkit-optimize-contrast;/* Webkit (non-standard naming) */
        image-rendering: -o-crisp-edges;           /* OS X & Windows Opera (12.02+) */
        image-rendering: pixelated;                /* Chrome */
        image-rendering: optimizeSpeed;            /* Older versions of FF */
    }
`

export const GameBasicButton = styled.button`
    border: 1px #6458F5 solid;
    background-color: white;
    border-radius: 30px;
    padding: 3px 1vw;
    margin-bottom: 0.5vw;
    font-weight: bold;
    text-align: center
`