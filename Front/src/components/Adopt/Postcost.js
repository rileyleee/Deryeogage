import React from "react";
import axios from "axios";
import * as S from "../../styled/Adopt/Precosts.style"

function Postcost({ boardId, goToReservation }) {
  const token = localStorage.getItem("accessToken"); // Assuming the token is stored in localStorage
  const boardIdAsInt = parseInt(boardId, 10);
  const handlePostCost = async () => {
    const data = {
      boardId: boardIdAsInt
    };
    console.log(data)

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/postcosts/${boardIdAsInt}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        },
      });
      console.log("Cost sent successfully");
      goToReservation();
    } catch (error) {
      console.error("Failed to send cost:", error);
    }
  };

  return (
    <S.ModalOverlay>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.Notification>
          <S.Title>책임비 납부 안내</S.Title>
          <S.MainText>
            <p>저희 데려가개를 통해 강아지를 입양하기 위해서는</p>
            <p>입양 일정을 예약하기 전에 책임비(금 십만원정)을 납부하여야 합니다.</p>
            <p>책임비는 일정을 취소하거나 입양 후 입양 미션을 모두 수행하는 경우에 한하여 반환받을 수 있습니다.</p>
          </S.MainText>
          <S.SubText>            
            <p>책임비는 모든 이해관계자가 강아지의 입양 절차를 책임감 있게 수행하기 위한 수단입니다.</p>
            <p>강아지와 가족으로서 함께하기 위한 최소한의 단계인 4개의 미션을 수행함으로써 책임감을 보여줄 수 있습니다.</p>
            <p>데려가개는 책임비를 통해 수익을 얻지 않으며, 입양 제반 절차 미수행으로 인해 반환되지 못한 책임비는 전국 유기동물 보호소에 전액 기부함을 알려드립니다.</p>
          </S.SubText>
          <S.AgreeMentText>
            <p> 위의 사실을 모두 인지하고 동의하는 경우 책임비를 납부하여 주시기 바랍니다.</p>
          </S.AgreeMentText>
        </S.Notification >
          <S.Media onClick={handlePostCost} src={process.env.PUBLIC_URL + "/assets/책임비 납부.png"} alt="후 책임비 납부" />
      </S.ModalContainer>
    </S.ModalOverlay>
    // <div>
    //   책임비를 내고 난 뒤 일정예약 가능
    //   <button onClick={handlePostCost}>책임비 납부하기</button>
    // </div>
  );
}

export default Postcost;