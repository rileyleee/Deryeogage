import styled from "styled-components";

export const GameStartsecond = styled.div`
    &.second {
        height: 34vw;
        padding: 0.5vw;
        background-image: url(${props => `/assets/${props.petType}/${props.changingWord}${props.petType}.gif`}),url("/assets/things/ground.png"),url("/assets/training/gym.png");
        background-repeat: no-repeat;
        background-position: center, 50% 70%, center;
        background-size: 35% 40%, 35% 15%, cover;
        image-rendering: -webkit-optimize-contrast;/* Webkit (non-standard naming) */
        image-rendering: -o-crisp-edges;           /* OS X & Windows Opera (12.02+) */
        image-rendering: pixelated;                /* Chrome */
        image-rendering: optimizeSpeed;            /* Older versions of FF */
    }
`

export const GameTraningBox = styled.button`
    border: 1px #6458F5 solid;
    background-color: white;
    border-radius: 15px;
    height: 4vw;
`

export const GameTrainingBar = styled.div`
    border: 1px #6458F5 solid;
    border-radius: 15px;
    background-image: ${(props) => `linear-gradient(to right, rgba(100, 88, 245, 0.5) ${props.score}%, white ${props.score}%)`};
    width: 6vw;
    height: 1vw;
    margin-top: 0.5vw;
    font-size: 0.7vw;
    line-height: 1vw;
`