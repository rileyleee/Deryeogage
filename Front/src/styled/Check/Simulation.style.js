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
export const CenterButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20vw;
  height: 15vh;
  background-color: white;
  border: 2px #FF914D solid;
`;