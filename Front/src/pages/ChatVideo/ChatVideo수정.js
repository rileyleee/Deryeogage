import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DogDetail from "./DogDetail";
import ChatRoomDetail from "./ChatRoomDetail";
import Reservation from "../../components/Adopt/Reservation";
import { useLocation } from "react-router-dom";
import axios from "axios"; // axios import
import Postcost from "../../components/Adopt/Postcost";

function ChatVideo() {
  const location = useLocation();
  const { boardId } = location.state.data;
  const { roomId } = useParams(); // URL에서 roomId 값을 얻음
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [isPostCost, setIsPostCost] = useState(false);
  const modalRef = useRef();

  const [isAuthor, setIsAuthor] = useState(false); // 작성자 여부 상태 추가
  const userId = localStorage.getItem("userId"); // 현재 로그인된 사용자 ID 가져오기
  useEffect(() => {
    // 글 작성자의 ID를 가져옵니다.
    // 이 부분은 실제 구현 방식에 따라 다를 수 있으며, 글 작성자의 ID를 어떻게 가져올지에 따라 변경됩니다.
    const fetchAuthorId = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/boards/each/${boardId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const authorId = response.data.data[0].userId; // 글 작성자의 ID를 가져옵니다. (데이터 구조에 따라 변경 필요)
        setIsAuthor(authorId === userId); // 글 작성자와 현재 사용자의 ID가 같은지 비교하여 상태 업데이트
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuthorId();
  }, [boardId, userId]); // boardId와 userId가 변경되면 다시 실행

  // 현재 보여주는 모달 컴포넌트의 상태 (reservation 또는 postCost)
  const [currentModalContent, setCurrentModalContent] = useState("reservation");

  // 예약 확정하기 버튼 클릭 시 처리 로직
  const handleReservationConfirmation = () => {
    setCurrentModalContent("postCost"); // PostCost 컴포넌트로 변환
  };

  // 책임비를 보내는 함수
  const sendPostCost = () => {
    const token = localStorage.getItem("accessToken");
    const data = {
      boardId: boardId
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/postcosts`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Cost sent successfully:", response.data);
        setIsPostCost(false); // 책임비 전송 후 예약 화면으로 돌아감
      })
      .catch((error) => {
        console.error("Failed to send cost:", error);
      });
  };

  const handleModalClick = (e) => {
    if (modalRef.current && modalRef.current.contains(e.target)) return;
    setShowReservationModal(false);
  };

  const handleFinalReservation = async (scheduledDate) => {
    try {
      const token = localStorage.getItem("accessToken");
      const data = { scheduledDate }; // 필요한 데이터 형식에 맞게 scheduledDate를 객체로 변환합니다.

      await axios.put(
        `${process.env.REACT_APP_API_URL}/chat/room/${roomId}/schedule`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // JSON 형식으로 보냅니다.
          },
        }
      );

      console.log("Date sent successfully");
      setShowReservationModal(false); // axios 요청 성공 후 모달 닫기
    } catch (error) {
      console.error("Failed to send date:", error);
    }
  };

  return (
    <StyledContainer>
    {showReservationModal && (
      <>
        <ModalBackground onClick={handleModalClick} />
        <Modal>
          <ModalContent ref={modalRef}>
            {isPostCost ? (
              <Postcost
                sendPostCost={sendPostCost}
                goBack={() => setIsPostCost(false)} // 추가된 goBack prop
              />
            ) : (
              <Reservation
                goToPostCost={() => setIsPostCost(true)} // 추가된 goToPostCost prop
              />
            )}
          </ModalContent>
        </Modal>
        </>
      )}
      {!isAuthor && ( // 작성자가 아닐 경우에만 버튼 표시
        <>
          <ModalButton onClick={() => setShowReservationModal(true)}>예약하기</ModalButton>
          {/* ... 나머지 코드 */}
        </>
      )}
      <StyledDogDetail>
        <DogDetail boardId={boardId} />
      </StyledDogDetail>
      <StyledChatRoom>
        <ChatRoomDetail />
      </StyledChatRoom>
    </StyledContainer>
  );
}

export default ChatVideo;

const StyledContainer = styled.div`
  max-height: 90vh; // 원하는 높이로 설정
  display: flex;
  justify-content: space-between;
`;

const StyledChatRoom = styled.div`
  border: 1px solid;
  width: 50%;
  box-sizing: border-box;
  margin: 10px; // add margin around the box
  padding: 10px; // add padding inside the box
  background-color: white; // set background color to white
`;

const StyledDogDetail = styled.div`
  border: 1px solid;
  width: 50%;
  box-sizing: border-box;
  margin: 10px; // add margin around the box
  padding: 10px; // add padding inside the box
  background-color: white; // set background color to white
`;

const ModalButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; // 다른 요소 위에 나타나도록 z-index 설정
  width: 30%; // 모달 창의 너비를 80%로 설정
  height: 60%; // 모달 창의 높이를 80%로 설정
  background-color: white; // 배경색을 흰색으로 설정
  padding: 20px; // 내부 패딩 추가
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // 모달에 그림자 효과 추가
  text-align: center;
`;

const CloseButton = styled.button`
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

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
  backdrop-filter: blur(5px); // 블러 처리
  z-index: 999; // 모달보다 낮은 z-index
`;
