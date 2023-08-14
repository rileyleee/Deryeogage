import styled from "styled-components";

export const StyledContainer = styled.div`
  height: 90vh; // 원하는 높이로 설정
  display: flex;
  justify-content: space-between;
`;

export const StyledChatRoom = styled.div`
  border: 1px solid;
  width: 50%;
  box-sizing: border-box;
  margin: 10px; // add margin around the box
  padding: 10px; // add padding inside the box
  background-color: white; // set background color to white
`;

export const StyledDogDetail = styled.div`
  border: 1px solid;
  width: 50%;
  box-sizing: border-box;
  margin: 10px; // add margin around the box
  padding: 10px; // add padding inside the box
  background-color: white; // set background color to white
`;

export const ModalButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const Modal = styled.div`
  width: ${(props) => (props.modalType === 'reservation' ? '20vw' : '55vw')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; // 다른 요소 위에 나타나도록 z-index 설정
  height: 60vh;
  /* width: 30vw; */
  background-color: white; // 배경색을 흰색으로 설정
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // 모달에 그림자 효과 추가
  text-align: center;
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
