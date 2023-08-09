import styled from "styled-components";

export const Button = styled.button`
  border: none;
  background-color: #ff914d;
  padding: 0.5vw 1vw;
  border-radius: 30px;
  color: white;
  margin-top: 1vw;
  cursor: pointer; /* 커서를 손가락 모양으로 변경 */
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 100vh;
`;

export const LoginBox = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;
  background-color: white;
  border: 1px #ff914d solid;
  border-radius: 30px;
  text-align: center;
  margin-top: 1%;
  padding: 1vw;
  width: 100%;
  max-width: 40vw;
  min-width: 300px;
  height: auto;
`;

export const Title = styled.h3`
  color: rgba(255, 145, 77, 1);
  margin-bottom: 1rem;
`;
