import styled from "styled-components";
import { Link } from "react-router-dom";
// 스타일 컴포넌트 정의
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
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #e64a19;
  }
`;

export const ConfirmedButton = styled.button`
  background-color: #ccc;
  color: white;
  border: none;
`;

// export const MediaContainer = styled.div`
//   width: 100%;
//   height: 100%;
// `;

export const StyledImage = styled.img`
  width: 3vw;
  height: 3vw;
  object-fit: cover; // 이미지 비율 유지
  border-radius: 10px;
`;

export const StyledVideo = styled.video`
  width: 3vw;
  height: 3vw;
  object-fit: cover; // 비디오 비율 유지
  border-radius: 10px;
`;

export const TitleLink = styled(Link)`
  text-decoration: none; // 밑줄 표시
  color: #4A2511;
  &:hover{
    color: #FF914D;
  }
`

export const ResponsibilityButton = styled.button`
  // 여기에 필요한 스타일을 적용하세요.
`;

export const BoardList = styled.div`
    margin: 0 2vw;
`

export const Hr = styled.hr`
    margin: 0 2vw;
    height: 2px;
    color: #FF914D;
    background-color : #FF914D;
`

export const BoardRow = styled.div`
  padding: 1vh 2vw;
  margin: 1vh 2vw;
  &.list {
    border-top: 2px solid #CCCCCC;
    border-bottom: 2px solid #CCCCCC;
    background-color: #F2F2F2;
  }
  &.item {
    border-bottom: 2px solid #CCCCCC;
  }
`

export const ScrollBar = styled.div`
  max-height: 500px; /* 원하는 높이 설정 */
  overflow-y: auto;  /* 세로 스크롤 표시 */
`