import styled from "styled-components";

export const GameStartsecond = styled.div`
    &.second {
        height: 70vh;
        padding: 1vh;
        background-image: url("assets/corgi 2/jump.gif"),url("assets/things/ground.png"),url("assets/training/gym.png");
        background-repeat: no-repeat;
        background-position: center, 50% 70%, center;
        background-size: 35% 40%, 35% 15%, cover;
    }
`

export const GameBasicHp = styled.div`
    background-image: linear-gradient(to right, #6458F5 50%, white 50%);
    width: 10vw;
    height: 2vh;
    border-radius: 10px;
    border: 1px black solid;
    margin-top: 2vh;
    margin-bottom: 2vh;
`

export const GameBasicIcon = styled.div`
    margin-right: 2vh;
`

export const GameBasicMenu = styled.div`
    border: 1px #6458F5 solid;
    background-color: white;
    border-radius: 15px;
    margin-bottom: 1vh;
    padding: 1vh 0.5vw 0 1vh;
`

export const GameTraningBox = styled.button`
    border: 1px #6458F5 solid;
    background-color: white;
    border-radius: 15px;
    height: 8vh;
`

export const GameTrainingBar = styled.div`
    border: 1px #6458F5 solid;
    border-radius: 15px;
    background-image: linear-gradient(to right, rgba(100, 88, 245, 0.5) 50%, white 50%);
    width: 6vw;
    height: 2vh;
    margin-top: 1vh;
`