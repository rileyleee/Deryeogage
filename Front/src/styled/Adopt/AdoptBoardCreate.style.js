import styled from "styled-components";

export const Container = styled.div`
  border: 1px #ff914d solid;
  border-radius: 30px;
  padding: 2vw;
  margin-top: 4vh;
  background-color: white;
`;

export const TitleInput = styled.input`
  border: 1px #ff914d solid;
  border-radius: 30px;
  width: 100%;
  margin-top: 1vh;
  padding-left: 1vw;
  /* Style for the placeholder text */
  &::placeholder {
    color: #ccc;
  }
`;

export const ContentBox = styled.div`
  margin-top: 2vh;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 4px;
  margin-top: 1vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Box = styled.div`
  flex: 1;
  margin-right: 1vw;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1vh; // 원하는 세로 간격을 추가
  }
`;

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;

export const DogTextarea = styled.div`
  margin-top: 1%;
  margin-bottom: 1%;
  border: 1px #ff914d solid;
  border-radius: 30px;
  width: 100%;
  height: 10vw;
  padding: 2%;
  resize: none; /* Prevent textarea resizing */

  /* Style for the placeholder text */
  &::placeholder {
    color: rgba(255, 145, 77, 0.5);
  }
`;
export const Button = styled.div`
  /* 여기에 Container의 스타일을 적용하세요. */
`;
