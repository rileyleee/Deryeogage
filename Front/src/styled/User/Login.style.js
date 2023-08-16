import styled from "styled-components";

export const Button = styled.button`
  border: none;
  background-image: url("/assets/kakao_login_medium_narrow.png");
  background-color: transparent;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 30px;
  width: 12vw; // 이미지의 너비에 맞게 조절하세요
  height: 6vh; // 이미지의 높이에 맞게 조절하세요
  margin-top: 12vh;
  cursor: pointer;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4vh;
`;

export const LoginBox = styled.div`
  background-color: white;
  background-image: url("/assets/loginpage.png");

  background-position: bottom;
  background-repeat: no-repeat;
  border: 1px #ff914d solid;
  border-radius: 30px;
  text-align: center;
  margin-top: 1%;
  padding: 1vw;
  height: 70vh;
  width: 32vw;
`;

export const Title = styled.p`
  color: rgba(255, 145, 77, 1);
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 8vh;
  margin-top: 4vh;
`;

export const Content = styled.div`
  margin-bottom: 4vh;
  margin-top: 5vh;
`;

