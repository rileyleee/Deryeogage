import styled from "styled-components";

export const DogInfo = styled.div`
  margin: 1vw 0;
  padding: 1vh;
  border: 1px #ff914d solid;
  border-radius: 30px;
  background-color: white;
  /* text-align: center; */
`;
export const Div = styled.div`
  margin: 1vw 0;
  padding: 1vh;
`;

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;
export const P = styled.div`
  margin: 1vh;
  padding-top: 1vh;
`;

export const Warning = styled.span`
  color: red;
  font-size: small;
`;

export const StyledInput = styled.input`
  width: 12vw; // 원하는 width 값으로 변경 가능
  margin-left: 2vw;
`;

export const AgeInput = styled.input`
  margin-left: 2vw;
  text-align: center;
`;

export const StyledSelect = styled.select`
  width: 12vw; // 원하는 width 값으로 변경 가능
  margin-left: 2vw;
`;

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-left: 5px; //간격 조절

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

export const TooltipText = styled.span`
  visibility: hidden;
  width: 150px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 1vh;
  border-radius: 6px;

  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -75px;

  opacity: 0;
  transition: opacity 0.3s;

  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
`;
