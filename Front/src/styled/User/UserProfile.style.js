import styled from "styled-components"; // 스타일드 컴포넌트 import

export const ProfileTop = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; 
  margin-bottom: 10px;
`;

export const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%; // 이 부분을 추가합니다.
`;

export const ProfileUser = styled.div`
  font-size: 25px; 
  display: flex;
  flex-grow: 1;  
  justify-content: center;
`;

export const Button = styled.button`
  font-size: 13px;
  background-color: #ff914d;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  margin: 10px;
  border: none;
`;

export const ProfileInfo = styled.div`
padding-left: 5px;
display: flex;
flex-direction: column;
align-items: flex-start;
`;

export const PromiseBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #ddd; // 테두리 추가
  padding: 10px; // 내부 여백 추가
  background-color: #f9f9f9; // 배경색 추가
  border-radius: 5px; // 둥근 테두리 적용
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); // 그림자 효과 추가
  margin-top: 15px; // 상단 여백 추가
  text-align: left;
`;

