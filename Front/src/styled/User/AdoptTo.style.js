import styled from "styled-components";

export const MissionButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

export const MissionModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const CloseButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #da190b;
  }
`;

export const MissionContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ConfirmButton = styled.button`
  background-color: #ff5722;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #e64a19;
  }
`;

export const AdoptToCard = styled.div`
  display: flex;
  align-items: center; // 세로 정렬
  margin: 10px 0;
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover; // 이미지 비율 유지
  margin-right: 20px; // 우측 여백
`;
export const Title = styled.h3`
  text-decoration: none; // 밑줄 표시
  cursor: pointer; // 포인터 마우스 커서
`;

export const ResponsibilityButton = styled.button`
  // 여기에 필요한 스타일을 적용하세요.
`;