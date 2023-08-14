import styled from "styled-components";

export const Container = styled.div`
  border: 1px #ff914d solid;
  border-radius: 30px;
  padding: 2vw;
  margin-top: 4vh;
  background-color: white;
`;

export const TitleInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 1vh;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => `${Math.max(33, props.valueLength)}%`};  // 1/3로 시작해서 입력 값에 따라 증가
    height: 1px;
    background-color: #ff914d;
    transition: width 0.3s;
  }
`;

export const TitleInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  padding-left: 1vw;

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
  margin-top: 1vh;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Box = styled.div`

  flex: 1;
  margin-right: 1vw;
  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1vh; // 원하는 세로 간격을 추가
  }
`;

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;

export const DogTextarea = styled.textarea`
  margin-top: 1%;
  margin-bottom: 1%;
  border: 1px #ff914d solid;
  border-radius: 30px;
  width: 100%;
  height: 10vw;
  padding: 2%;
  resize: none; /* Prevent textarea resizing */
  height: 12vh;

  /* Style for the placeholder text */
  &::placeholder {
    color: rgba(255, 145, 77, 0.5);
  }
`;

export const Button = styled.button`
  border: none;
  background-color: #ff914d;
  padding: 0.5vw 1vw;
  border-radius: 30px;
  color: white;
  margin-top: 1vh;
  left: 50%;
  transform: translateX(-50%); /* Add this to center the button horizontally */
  position: relative; /* Add this to enable the horizontal centering */

  /* Additional styles (optional) */
  display: block;
  width: fit-content;
  cursor: pointer;
`;

export const SamllText = styled.span`
  font-size: small;
  color: #ccc;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  text-align: center;

`;
