import styled from "styled-components";

export const GameStartfirst = styled.div`
    &.first {
        padding: 2vw;
        margin-top: 1vw;
        margin-bottom: 1vw;
        border: 1px #FF914D solid; // borderColor 프롭에 따라 테두리 색 변경
        border-radius: 30px;
        background-color: white;
        height: 38vw;
    }
`
export const GameStartsecond = styled.div`
    &.second {
        height: 34vw;
        padding: 1.5vw;
        position: relative;
        /* background-color: beige; */
        /* padding-bottom: 35%; */
    }
    &::before {
        background-image: url("/assets/home/home0.png");
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

export const GameNoBox = styled.div`
    text-align: center;
    background-color: white;
    height: 12vw;
    font-size: 3vw;
    font-weight: bold;
`