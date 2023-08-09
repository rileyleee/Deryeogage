import styled from "styled-components";

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;

export const Carousel = styled.div`
  display: flex;
  background-color: white;
  border: 1px #ff914d solid;
  border-radius: 30px;
  justify-content: center;
  padding: 1vw;
  margin-top: 1%;
  margin-bottom: 1%;
`;

export const ImageAndCaptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 50%;
  height: 500px;
  overflow: hidden;
`;

export const CaptionContainer = styled.div`
  width: 50%;
  padding: 10px;
`;
