import styled from "styled-components";
import { PiPawPrintFill } from "react-icons/pi";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1vh;
`;

export const Span = styled.span`
  margin: 1vw;
  
`;

export const Rank = styled.span`
  margin: 1vw;
  font-weight: bold;
  font-size: 1.1rem;
`;

export const Paws = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  .orangePaw {
    color: #ff914d;
  }
`;

export const StyledPaw = styled(PiPawPrintFill)`
  width: 38px;
  height: 38px;
  
  @media (max-width: 992px) {  // 화면 크기가 768px 이하일 때
    width: 25px;
    height: 25px;
  }
`;
