import styled, {keyframes} from "styled-components"; // 스타일드 컴포넌트 import
import { Link } from "react-router-dom";

export const ChatRoomBox = styled.div`
border: 1px solid #e1e1e1;
padding: 1vh;
margin: 1vh 1vh;
border-radius: 8px;
background-color: ${props => props.schedule ? "#FFE7BA" : "#D8D8D8"}; // schedule 값에 따른 조건부 배경색 설정
transition: background-color 0.3s;
&:hover {
  background-color: ${props => props.schedule ? "#FAAC58" : "#e6e6e6"}; // schedule 값에 따른 조건부 배경색 설정
}

    a {
        text-decoration: none;
        color: #333;
        font-weight: 500;
        font-size: 1.1em;
    }

    .unread-count {
        color: red;
        font-weight: bold;
        margin-left: 5px;
    }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ChatRoomsContainer = styled.div`
//   animation: ${fadeIn} 1s;
//   overflow-y: auto; // 내용이 넘치면 스크롤 표시
//   border-radius: 10px; // 모달 창 모서리 둥글게 설정 (선택 사항)
`;

export const Reloadbutton = styled.button`
  background-image: url('/assets/chatimg/reload.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: transparent; // 배경색을 제거
  border: none;
  width: 3vh; // 원하는 크기로 조절
  height: 3vh; // 원하는 크기로 조절
  cursor: pointer;

//   &:hover, &:focus {
//     background-color: white; // 만약 transparent가 작동하지 않을 때 흰색으로 변경
//   }
`;

export const CloseButton = styled.button`
  margin: 0 1vw;  // ReloadButton과의 간격 조절
  background-color: transparent;
  border: none;
  color: #333;  // 원하는 색상으로 변경 가능
  cursor: pointer;


  &:hover, &:focus {
    text-decoration: underline; // hover 시 밑줄 표시
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1vh; // 필요에 따라 조절 가능
`;


export const UserImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%; // 이미지를 원형으로 표시
    margin-right: 10px; // 이미지와 닉네임 사이의 간격
    float: left; // 왼쪽 정렬
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .created-date {
    font-size: 0.8em;
    color: #aaa;
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .last-message {
    margin-top: 5px;
    font-size: 0.9em;
    color: #555;
}
.dday {
  font-weight: bold;
  color: red; // 또는 원하는 색상
}
`

export const Image = styled.img`
  width: 3vw;
  height: 3vw;
  object-fit: cover; // 이미지 비율 유지
  border-radius: 10px;
`;


export const TitleLink = styled(Link)`
  text-decoration: none; // 밑줄 표시
  color: black;
  &:hover{
    color: #FF914D;
  }
`

export const BoardRow = styled.div`
  &.list {
    margin: 0 2vw;
    border-top: 2px solid #CCCCCC;
    border-bottom: 2px solid #CCCCCC;
    background-color: #F2F2F2;
    padding: 0.5vw 0 0.5vw 2vw;
  }
  &.item {
    border-bottom: 2px solid #CCCCCC;
    margin: 0 0 0 2vw;
  }
  &.box {
    margin: 0.5vw 0 0.5vw 2vw;
  }
`

export const ScrollBar = styled.div`
  max-height: 21vw; /* 원하는 높이 설정 */
  overflow-y: auto;  /* 세로 스크롤 표시 */
  margin-right: 2vw;
`

export const AdoptComfirm = styled.button`
  background-color: #ff5722;
  width: 12vw;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #e64a19;
  }
`;

export const AdoptComfirmed = styled.button`
  background-color: #FF914D;
  width: 12vw;
  color: white;
  border: none;
  &[disabled] {
    background-color: #ddd; // 변경할 색상
    color: white; // 변경할 글자 색상
    cursor: not-allowed; // 마우스 커서 변경
  }
`;

export const ModalText = styled.div`
  font-size: 2vw;
  text-align: center;
  margin: 1vw;

`

export const RoomName = styled.div`
  margin-left: 1vw;
  font-weight: bold;
`