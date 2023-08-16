import styled from "styled-components";

export const StyledContainer = styled.div`
  min-height: 50vh; // 원하는 높이로 설정
  display: flex;
  justify-content: space-between;
`;

export const StyledChatRoomDetail = styled.div`
  // flex-grow: 1; // 이 속성을 추가하여 가능한 모든 공간을 차지하게 합니다.
  height: 100%; // 필요하다면 추가
`;

export const StyledChatRoom = styled.div`
  position: relative;
  border: 1px #ffe7ba solid;
  border-radius: 10px;
  width: 35%;
  box-sizing: border-box;
  margin: 10px; // add margin around the box
  padding: 10px; // add padding inside the box
  background-color: white; // set background color to white
  // flex-direction: column;  // 추가
`;

export const StyledDogDetail = styled.div`
  border: 1px #ff914d solid;
  border-radius: 10px;
  width: 65%;
  box-sizing: border-box;
  margin: 10px; // add margin around the box
  padding: 10px; // add padding inside the box
  background-color: white; // set background color to white
`;

export const ModalButton = styled.button`
  position: absolute;
  border: 1px #ff914d solid;
  border-radius: 5px;
  color: #ffffff;
  background-color: #ff914d;
  padding: 8px 12px;
  transition: 0.3s; // 마우스 호버 시 부드럽게 스타일 변화
  top: 10px;
  right: 10px;

  &:hover {
    background-color: #ff7140; // 버튼 호버 시 내부 색상 변경
    border-color: #ff7140; // 버튼 호버 시 테두리 색상 변경
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; // 다른 요소 위에 나타나도록 z-index 설정
  height: 60%; // 모달 창의 높이를 80%로 설정
  background-color: white; // 배경색을 흰색으로 설정
  padding: 20px; // 내부 패딩 추가
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // 모달에 그림자 효과 추가
  text-align: ${(props) =>
    props.modalType === "reservation" ? "center" : "inherit"};
  width: ${(props) => (props.modalType === "reservation" ? "30vw" : "1000px")};
`;

export const CloseButton = styled.button`
  position: absolute; // 상위 요소인 Modal에 대해 절대 위치 설정
  bottom: 10px; // 하단에서 10px 떨어지도록 설정
  left: 50%; // 왼쪽에서 50% 위치하도록 설정
  transform: translateX(
    -50%
  ); // 정확한 가운데 정렬을 위해 자신의 너비의 50%만큼 왼쪽으로 이동
  padding: 5px 10px; // 버튼 내부의 패딩
  cursor: pointer; // 마우스 커서를 포인터로 설정
  background-color: #f3f3f3; // 버튼의 배경색 설정 (원하는 색상으로 변경 가능)
  border: none; // 경계선 제거
  border-radius: 5px; // 버튼의 모서리 둥글게 처리
  font-size: 16px; // 글자 크기 설정
  :hover {
    background-color: #e6e6e6; // 마우스 오버시 배경색 변경
  }
`;

export const ModalContent = styled.div`
  width: 100%;
  height: 100%;
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
  backdrop-filter: blur(5px); // 블러 처리
  z-index: 999; // 모달보다 낮은 z-index
`;
