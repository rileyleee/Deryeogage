import styled from "styled-components";

export const GameStartsecond = styled.div`
    position: relative;
    height: 34vw;
    padding: 0.5vw;
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

export const GameWalkingHp = styled.div`
    background-image: linear-gradient(to right, #FF914D ${props => props.width}%, white ${props => props.width}%);
    width: 30vw;
    height: 2.5vw;
    border-radius: 30px;
    border: 2px black solid;
    margin-top: 1vw;
`

export const GameWalkingPtag = styled.p`
    color: black;
    line-height: 2.5vw;
    margin-left: 1vw;
`

export const GameWalkingBtn = styled.button`
    width: 20vw;
    height: 5vw;
    margin-top: 5vw;
    border: 1px solid #FF914D;
    background-color: white;
    border-radius: 20px;
`

export const WalkingText = styled.div`
    margin-top: 2vw;
    font-size: 3vw;
    font-weight: bold;
`