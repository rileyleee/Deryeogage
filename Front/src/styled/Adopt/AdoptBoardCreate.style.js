import styled from "styled-components";

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;

export const AddPic = styled.div`
  display: flex;

  background-color: white;
  border: 1px #ff914d solid;
  border-radius: 30px;

  justify-content: center;

  padding: 1vw;
  margin-top: 1%;
  margin-bottom: 1%;
`;

export const DogCheck = styled.div`
  background-color: white;
  border: 1px #ff914d solid;
  border-radius: 30px;

  padding: 2%;
  margin-top: 1%;
  margin-bottom: 1%;
`;

export const DogInfo = styled.div`
  background-color: white;
  border: 1px #ff914d solid;
  border-radius: 30px;

  padding: 2%;
  margin-top: 1%;
  margin-bottom: 1%;
`;

export const DogTextarea = styled.textarea`
  margin-top: 1%;
  margin-bottom: 1%;
  border: 1px #ff914d solid;
  border-radius: 30px;
  width: 100%;
  height: 10vw;
  padding: 2%;
`;


export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Box = styled.div`
  flex: 1; /* 각 박스가 동일한 크기를 가지도록 설정 */
  margin-right: 1vw; /* 각 박스 사이에 간격을 주기 위한 margin 설정 */
`;
