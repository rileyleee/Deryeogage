import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

export const Span = styled.span`
  margin: 1vw;
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
