import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Precost = ({ onClose, boardId }) => {
  const navigate = useNavigate();
  console.log(boardId);

  const handlePay = () => {
    onClose(); // 기존의 닫기 로직을 실행하고
    navigate(`/adopt/${boardId}`);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <h3>책임비를 납부한 뒤에 작성이 가능합니다.</h3>
        {/* 여기에 모달의 내용을 넣으세요 */}
        <button onClick={handlePay}>납부하기</button>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Precost;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
`;
