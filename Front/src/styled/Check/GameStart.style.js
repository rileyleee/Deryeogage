import styled from "styled-components";

export const GameStartsecond = styled.div`
    &.second {
        padding: 3vh;
        height: 70vh;
        position: relative;
        /* background-color: beige; */
        /* padding-bottom: 35%; */
    }
    &::before {
        background-image: url("assets/home/home2.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        opacity: 0.2;
      /* 배경 이미지만 투명하게 만들기 */
    }
`


export const GameStartTextbox = styled.div`
    &.text-box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        /* div 의 너비와 높이를 모를 때 유용한 기법으로 부모 기준으로 50% 위/왼쪽에서 떨어진다음 자신의 너비/높이의 50%를 다시 역방향으로 오게 하는 방법이다. */
    }
`

export const GameStartSpan = styled.span`
    color:#FF914D;
    font-weight: bold;
`

export const GameStartPtag = styled.p`
    width: 30vw;
    font-weight: bold;
    color: #4A2511;
    text-align: center;
    font-size: 2vw;
`

export const GameStartButton = styled.button`
    margin-top: 4vh;
    font-weight: bold;
    width: 13vw;
    height: 7vh;
    background-color: #FF914D;
    border-radius: 30px;
    border: none;
    color: white;
    /* font-size: 2vw; */
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
    /* 수평 정렬 */
`