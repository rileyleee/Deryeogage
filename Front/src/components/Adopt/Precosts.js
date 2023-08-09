import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as S from "../../styled/Adopt/Precosts.style"

const Precost = ({ onClose, boardId }) => {
  const navigate = useNavigate();
  console.log(boardId);

  const handlePay = () => {
    const token = localStorage.getItem("accessToken");
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    // 데이터 객체를 생성합니다. 이 경우 boardId를 속성으로 가지고 있고 나머지는 빈 객체입니다.
    const data = {
      boardId: boardId
    };

    // POST 요청을 생성합니다.
    axios
      .post(`${REACT_APP_API_URL}/precosts/${boardId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // 인증 토큰을 헤더에 추가합니다.
          // 'Content-Type': 'application/json', // 이 부분은 필요한 경우 주석 해제해 사용하세요.
        },
      })
      .then((response) => {
        // 요청이 성공한 경우에 수행할 작업을 작성합니다.
        onClose();
        navigate(`/adopt/${boardId}`);
      })
      .catch((error) => {
        // 오류가 발생한 경우에 수행할 작업을 작성합니다.
        console.error("납부 실패:", error);
        alert("납부에 실패하였습니다. 다시 시도해주세요.");
      });
  };

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <h3>책임비를 납부한 뒤에 작성이 가능합니다.</h3>
        {/* 여기에 모달의 내용을 넣으세요 */}
        <button onClick={handlePay}>납부하기</button>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default Precost;