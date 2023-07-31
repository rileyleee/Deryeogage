import styled from "styled-components";

export const GameBasicHp = styled.div`
    background-image: ${({ hpPercentage, borderColor }) => {
        const rgbaBorderColor = `${borderColor}80`; // 80은 투명도를 나타내며, 16진수로 표현합니다.
        return `linear-gradient(to right, ${rgbaBorderColor} ${hpPercentage}%, rgba(255, 255, 255, 0.8) ${hpPercentage}%)`;
    }};
    width: 10vw;
    height: 2vh;
    border-radius: 10px;
    border: 1px black solid;
    margin-top: 2vh;
    margin-bottom: 2vh;
    font-size: 1vw;
    text-align: center;
    line-height: 2vh;
`

export const GameBasicIcon = styled.div`
    margin-right: 2vh;
`

export const GameBasicMenu = styled.div`
    border: 1px ${({ borderColor }) => borderColor} solid; // borderColor 프롭에 따라 테두리 색 변경
    background-color: white;
    border-radius: 15px;
    margin-bottom: 1vh;
    padding: 1vh 0.5vw 0 1vh;
`