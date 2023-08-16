import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios"; // axios import
import * as S from "../../styled/ChatVideo/ChatVideo.style";
import DogDetail from "./DogDetail";
import ChatRoomDetail from "./ChatRoomDetail";
import Reservation from "../../components/Adopt/Reservation";
import VideoRoom from "./openvidu/VideoRoom";

function ChatVideo() {
  const location = useLocation();
  const { boardId } = location.state?.data || {};
  const { roomId } = useParams(); // URL에서 roomId 값을 얻음
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [isReservationScheduled, setIsReservationScheduled] = useState(false);
  const modalRef = useRef();
  console.log("boardId!!!!!!!!!!!!!!!!!!!!!!!", boardId)
  const onReservationComplete = () => {
    setIsReservationScheduled(true);
  };

  const [isAuthor, setIsAuthor] = useState(false); // 작성자 여부 상태 추가
  const userId = localStorage.getItem("userId"); // 현재 로그인된 사용자 ID 가져오기
  const nickname = localStorage.getItem("nickname"); // 현재 로그인된 사용자 ID 가져오기

  const [showVideoRoom, setShowVideoRoom] = useState(false); //화상 채팅 열기 클릭시 이벤트 처리 위함
  const [className, setClassName] = useState('reservation')
  console.log(className)

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
    // 예약 상태를 확인하는 로직
    const fetchReservationStatus = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/chat/room/info/${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const scheduledDate = response.data.data.scheduledDate;
        console.log("!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@", response.data.data)
        if (scheduledDate) {
          setIsReservationScheduled(true);
        }
      } catch (error) {
        console.error("Failed to get reservation status:", error);
      }
    };
    fetchReservationStatus();
  }, [roomId, boardId, userId]);

  const handleModalClick = (e) => {
    if (modalRef.current && modalRef.current.contains(e.target)) return; // 모달 내부 클릭이면 반환
    setShowReservationModal(false); // 모달 외부 클릭이면 모달 닫기
  };
  console.log("boardId: ", boardId);

  return (
    <S.StyledContainer>
      {showReservationModal && (
        <>
          <S.ModalBackground onClick={handleModalClick} />{" "}
          {/* 배경 블러 처리 */}
          <S.Modal modalType={className}>
            <S.ModalContent ref={modalRef}>
              {" "}
              {/* 모달 내부 참조 추가 */}
              <Reservation 
                changeClass = {setClassName}
                roomId={roomId}
                boardId={boardId}
                closeModal={() => setShowReservationModal(false)}
                onReservationComplete={onReservationComplete} // 이렇게 prop으로 전달합니다.
              />{" "}
              {/* closeModal prop 추가 */}
            </S.ModalContent>
          </S.Modal>
        </>
      )}
      {!isAuthor && ( // 작성자가 아닐 경우에만 버튼 표시
        <>
          <S.ModalButton onClick={() => {
            setShowReservationModal(true);
            setClassName('reservation');
          }}>
            {isReservationScheduled ? "예약 수정하기" : "예약하기"}
          </S.ModalButton>
        </>
      )}
      <S.StyledDogDetail>
        {!showVideoRoom && (
          <DogDetail boardId={boardId} setShowVideoRoom={setShowVideoRoom} />
        )}
        {showVideoRoom && (
          <VideoRoom
            roomId={roomId}
            nickname={nickname}
            setShowVideoRoom={setShowVideoRoom}
          />
        )}
      </S.StyledDogDetail>
      <S.StyledChatRoom>
        <ChatRoomDetail />
      </S.StyledChatRoom>
    </S.StyledContainer>
  );
}

export default ChatVideo;