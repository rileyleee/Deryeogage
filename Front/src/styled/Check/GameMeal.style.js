import styled from "styled-components";

export const GameStartsecond = styled.div`
    &.second {
        height: 70vh;
        padding: 1vh;
        background-image: url("assets/corgi 2/walk.gif"),url("assets/background/totoro.gif");
        background-repeat: no-repeat;
        background-position: 3% 61%, center;
        background-size: 25% 30%, cover;
    }
`

export const GameBasicButton = styled.button`
    border: 1px #6458F5 solid;
    background-color: white;
    border-radius: 30px;
    padding: 3px 1vw;
    margin-bottom: 1vh;
    font-weight: bold;
    width: 8vw;
    text-align: center
`

export const GameWalkingHp = styled.div`
    background-image: linear-gradient(to right, #FF914D 50%, white 50%);
    width: 30vw;
    height: 5vh;
    border-radius: 30px;
    border: 2px black solid;
    margin-top: 2vh;
`
export const GameWalkingPtag = styled.p`
    color: white;
    line-height: 5vh;
    margin-left: 1vw;
`