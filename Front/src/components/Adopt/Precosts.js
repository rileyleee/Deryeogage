import React from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <S.ModalOverlay onClick={onClose} >
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.Notification>
          <S.Title>책임비 납부 안내</S.Title>
          <S.MainText>
            <p>저희 데려가개를 통해 강아지를 입양보내기 위해서는</p>
            <p>게시글 작성 전에 책임비(금 십만원정)을 납부하여야 합니다.</p>
            <p>책임비는 강아지가 완전히 입양되고 난 후, 또는 게시글을 삭제하는 경우 반환받을 수 있습니다.</p>
          </S.MainText>
          <S.SubText>
            <p>강아지를 구조하거나 보호하는 경우에도 강아지에 대한 책임감을 가져야합니다.</p>
            <p>책임비는 모든 이해관계자가 강아지의 입양 절차를 책임감 있게 수행하기 위한 수단입니다.</p>
            <p>데려가개는 책임비를 통해 수익을 얻지 않으며, 입양 제반 절차 미수행으로 인해 반환되지 못한 책임비는 전국 유기동물 보호소에 전액 기부함을 알려드립니다.</p>
          </S.SubText>
          <S.AgreeMentText>
            <p> 위의 사실을 모두 인지하고 동의하는 경우 책임비를 납부하여 주시기 바랍니다.</p>
          </S.AgreeMentText>
        </S.Notification>
        <Link to={"/adopt"} onClick={handlePay}>
          <S.Media src={process.env.PUBLIC_URL + "/assets/책임비 납부.png"} alt="선 책임비 납부" />
        </Link>
        {/* <button onClick={handlePay}>납부하기</button> */}
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default Precost;