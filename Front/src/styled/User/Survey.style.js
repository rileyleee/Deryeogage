import styled from "styled-components";

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;

export const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin-top: 4vh;
`;

export const Div = styled.div`
  padding: 1vw;
  width: 40vw;
  height: 82vh;
  background-color: white;
  border: 1px #ff914d solid;
  border-radius: 30px;
  text-align: center;
  overflow: auto;
  margin-bottom: 2vh;
`;

export const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1%;
  padding: 1vw;
`;

export const Button = styled.button`
  border: none;
  background-color: #ff914d;
  padding: 0.5vw 1vw;
  border-radius: 30px;
  color: white;
  margin-bottom: 1vh;
`;

export const Drag = styled.div`
  margin-top: 2vh;
  margin-bottom: 1vh;
  font-size: 1.3rem;
`;

export const SmallText = styled.div`
  margin-bottom: 4vh;
  font-size: 1.1rem;
`;

export const Survey = styled.div`
  font-size: 2rem;
  margin-bottom: 1vh;
  margin-top: 1vh;
  font-weight: bold;
`;
