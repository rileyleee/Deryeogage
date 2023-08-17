import styled, { keyframes } from 'styled-components';

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;
export const DraggableItem = styled.div`
  opacity: ${props => (props.isDragging ? 0.5 : 1)};
`;
export const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 74vh;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin-top: 2vw;
`;

export const Div = styled.div`
  padding: 1vw;
  width: 40vw;
  height: auto;
  background-color: white;
  border: 1px #ff914d solid;
  border-radius: 30px;
  text-align: center;
  overflow: auto;
  margin-bottom: 1vw;
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
  margin-bottom: 0.5vw;
  &:hover {
    background-color: #ff7140; // 버튼 호버 시 내부 색상 변경
    border-color: #ff7140; // 버튼 호버 시 테두리 색상 변경
  }
`;

export const Drag = styled.div`
  margin-top: 1vw;
  margin-bottom: 0.5vw;
  font-size: 1.3rem;
`;

export const SmallText = styled.div`
  margin-bottom: 2vw;
  font-size: 1.1rem;
`;

export const Survey = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5vw;
  margin-top: 0.5vw;
  font-weight: bold;
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const PageContainer = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
`;