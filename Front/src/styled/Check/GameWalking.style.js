import styled from "styled-components";

export const GameStartsecond = styled.div`
    position: relative;
    height: 70vh;
    padding: 1vh;
    background-image: url(${props => `/assets/${props.petType}/walk${props.petType}.gif`}), url("/assets/background/totoro.gif");
    background-repeat: no-repeat;
    background-position: 3% 61%, center;
    background-size: 25% 30%, cover;
    image-rendering: -webkit-optimize-contrast;/* Webkit (non-standard naming) */
    image-rendering: -o-crisp-edges;           /* OS X & Windows Opera (12.02+) */
    image-rendering: pixelated;                /* Chrome */
    image-rendering: optimizeSpeed;            /* Older versions of FF */

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${props => `/assets/${props.petType}/walk${props.petType}.gif`});
        background-repeat: no-repeat;
        background-position: 3% -7%;
        background-size: 25% 30%;
        transform: rotateX(180deg);
        z-index: 1;
        opacity: 0.7; /* 추가: 이미지 불투명도 설정 */
        image-rendering: -webkit-optimize-contrast;/* Webkit (non-standard naming) */
        image-rendering: -o-crisp-edges;           /* OS X & Windows Opera (12.02+) */
        image-rendering: pixelated;                /* Chrome */
        image-rendering: optimizeSpeed;            /* Older versions of FF */
    }

    & > * {
        position: relative;  // ensures children are positioned above the rotated image
        z-index: 2;
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

export const GameWalkingHp = styled.div`
    background-image: linear-gradient(to right, #FF914D ${props => props.width}%, white ${props => props.width}%);
    width: 30vw;
    height: 5vh;
    border-radius: 30px;
    border: 2px black solid;
    margin-top: 2vh;
`

export const GameWalkingPtag = styled.p`
    color: black;
    line-height: 5vh;
    margin-left: 1vw;
`

export const GameWalkingBtn = styled.button`
    width: 20vw;
    height: 10vh;
    border: 1px solid #FF914D;
    background-color: white;
    border-radius: 20px;
`