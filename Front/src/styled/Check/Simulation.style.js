import styled from "styled-components";

export const GameStartfirst = styled.div`
    &.first {
        padding: 4.5vh;
        margin-top: 1vh;
        margin-bottom: 1vh;
        border: 1px ${({ borderColor }) => borderColor} solid; // borderColor 프롭에 따라 테두리 색 변경
        border-radius: 30px;
        background-color: white;
        height: 80vh;
    }
`
