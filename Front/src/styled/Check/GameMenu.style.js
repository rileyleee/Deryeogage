import styled from "styled-components";

export const GameBasicHp = styled.div`
    background-image: ${({ hpPercentage, ...rest }) => {
            return `linear-gradient(to right, #FF914D ${hpPercentage}%, white ${hpPercentage}%)`;
        }};
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