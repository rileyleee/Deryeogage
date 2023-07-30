import styled from "styled-components";

export const GameStartsecond = styled.div`
    &.second {
        height: 70vh;
        padding: 1vh;
        background-image: url("assets/corgi 2/idle2.gif"), url("assets/home/home2.png");
        background-repeat: no-repeat;
        background-position: 50% 95%, center;
        background-size: 35% 40%, cover;
    }
`

export const GameBasicButton = styled.button`
    border: 1px #FF914D solid;
    background-color: white;
    border-radius: 30px;
    padding: 3px 1vw;
    margin-bottom: 1vh;
    font-weight: bold;
    width: 8vw;
    text-align: center
`

export const GameBasicOver = styled.button`
    border:none;
    background-color: transparent;
    font-weight: bold;
    color: white;
`

export const GameBasicHp = styled.div`
    background-image: linear-gradient(to right, #FF914D 50%, white 50%);
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
    border: 1px #FF914D solid;
    background-color: white;
    border-radius: 15px;
    margin-bottom: 1vh;
    padding: 1vh 0.5vw 0 1vh;
`

/* export const GameDog = styled.div`
    background-image: url("assets/corgi 2/jump.gif");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 35% 40%;
` */