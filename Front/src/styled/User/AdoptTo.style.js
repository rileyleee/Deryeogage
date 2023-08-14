import styled from "styled-components";
import { Link } from "react-router-dom";
// 스타일 컴포넌트 정의
export const MissionButton = styled.button`
  background-color: #4caf50;
  width: 12vw;
  color: white;
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
  background-color: #D6D6D6;
  color: black;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius : 10px;
  &:hover {
    background-color: #ccc;
  }
`;

export const MissionContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35vw;
`;

export const ConfirmButton = styled.button`
  background-color: #ff5722;
  width: 12vw;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #e64a19;
  }
  &[disabled] {
    background-color: #ddd; // 변경할 색상
    color: white; // 변경할 글자 색상
    cursor: not-allowed; // 마우스 커서 변경
  }
`;

export const ConfirmedButton = styled.button`
  background-color: #ccc;
  width: 12vw;
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
  color: black;
  &:hover{
    color: #FF914D;
  }
`

export const ResponsibilityButton = styled.button`
  border: none;
  width: 12vw;
  background-color: #2C6BCA;
  color: white;
  &[disabled] {
    background-color: #ddd; // 변경할 색상
    color: white; // 변경할 글자 색상
    cursor: not-allowed; // 마우스 커서 변경
  }
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
  padding: 1vh 0 1vh 2vw;
  &.list {
    margin: 0 2vw;
    border-top: 2px solid #CCCCCC;
    border-bottom: 2px solid #CCCCCC;
    background-color: #F2F2F2;
  }
  &.item {
    border-bottom: 2px solid #CCCCCC;
    margin: 0 0 0 2vw;
  }
`

export const ScrollBar = styled.div`
  max-height: 40vh; /* 원하는 높이 설정 */
  overflow-y: auto;  /* 세로 스크롤 표시 */
  margin-right: 2vw;
`

export const ModalText = styled.div`
  font-size: 2vw;
  text-align: center;
  margin: 1vw;
`