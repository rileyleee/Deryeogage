import styled from "styled-components";

export const GameBasicHp = styled.div`
    background-image: ${({ hpPercentage, borderColor }) => {
        const rgbaBorderColor = `${borderColor}80`; // 80은 투명도를 나타내며, 16진수로 표현합니다.
        return `linear-gradient(to right, ${rgbaBorderColor} ${hpPercentage}%, rgba(255, 255, 255, 0.8) ${hpPercentage}%)`;
    }};
    width: 10vw;
    height: 1vw;
    border-radius: 10px;
    border: 1px black solid;
    margin-top: 1vw;
    margin-bottom: 1vw;
    font-size: 1vw;
    text-align: center;
    line-height: 1vw;
`

export const GameBasicIcon = styled.div`
    margin-right: 1vw;
`

export const GameBasicMenu = styled.div`
    border: 1px ${({ borderColor }) => borderColor} solid; // borderColor 프롭에 따라 테두리 색 변경
    background-color: white;
    border-radius: 15px;
    margin-bottom: 0.5vw;
    padding: 0.5vw 0.5vw 0 0.5vw;
`

export const GameIcon = styled.p`
    margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 12px;
`

export const GameText = styled.p`
    margin-top: 8px;
    margin-bottom: 8px;
`