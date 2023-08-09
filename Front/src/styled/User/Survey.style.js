import styled from "styled-components";
import Modal from "react-modal"; // import react-modal

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;

 export const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  padding: 0;
`;

export const Div = styled.div`
  margin-top: 1%;
  padding: 1vw;
  width: 100%;
  max-width: 40vw;
  min-width: 300px;
  height: auto;
  min-height: 70vh;
  background-color: white;
  border: 1px #ff914d solid;
  border-radius: 30px;
  text-align: center;
  overflow: auto;
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
  margin-top: 1vw;
`;

export const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  width: 40vw;
  height: 60vh;
  border: 1px solid #ff914d;
  border-radius: 30px;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CloseButton = styled.button`
  background-color: white;
  position: absolute;
  right: 15px;
  top: 15px;
  border: none;
`;
