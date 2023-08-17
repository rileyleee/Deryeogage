import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "../../styled/Adopt/Precosts.style";

function Postcost({
  roomId,
  boardId,
  scheduledDate,
  fromUserId,
  toUserId,
  onReservationComplete,
}) {
  const token = localStorage.getItem("accessToken");
  const boardIdAsInt = parseInt(boardId, 10);

  const [next_redirect_pc_url, setNextRedirectPcUrl] = useState("");
  const [tid, setTid] = useState("");

  const params = {
    cid: "TC0ONETIME",
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    item_name: "데려가개 책임비",
    quantity: 1,
    total_amount: 100000,
    vat_amount: 0,
    tax_free_amount: 0,
    approval_url: `https://i9b307.p.ssafy.io/adopt/chatroom/${roomId}?boardId=${boardId}`,
    fail_url: `https://i9b307.p.ssafy.io/adopt/chatroom/${roomId}?boardId=${boardId}`,
    cancel_url: `https://i9b307.p.ssafy.io/adopt/chatroom/${roomId}?boardId=${boardId}`,
  };

  const postData = {
    boardId: boardIdAsInt,
    scheduledDate,
    fromUserId,
    toUserId,
  };

  useEffect(() => {
    axios({
      url: "https://kapi.kakao.com/v1/payment/ready",
      method: "POST",
      headers: {
        Authorization: "KakaoAK e7cb853a9537243908236f15e2fce905",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params,
    })
      .then((response) => {
        const {
          data: { next_redirect_pc_url, tid },
        } = response;
        console.log(next_redirect_pc_url);
        console.log(tid);
        window.localStorage.setItem("tid", tid);
        setNextRedirectPcUrl(next_redirect_pc_url);
        setTid(tid);
      })
      .catch((error) => {
        console.error("Payment initialization failed:", error);
      });
  }, []);

  const handlePostCost = async () => {
    try {
      // 첫 번째 POST 요청
      await axios.post(
        `${process.env.REACT_APP_API_URL}/postcosts/${boardIdAsInt}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onReservationComplete(); // 예약이 성공적으로 완료되었다는 것을 상위 컴포넌트에 알림
    } catch (error) {
      console.error("Failed to send cost and post request:", error);
    }
  };

  return (
    <S.ModalOverlay>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.Notification>
          <S.Title>책임비 납부 안내</S.Title>
          <S.MainText>
            <p>저희 데려가개를 통해 강아지를 입양하기 위해서는</p>
            <p>
              입양 일정을 예약하기 전에 책임비(금 십만원정)을 납부하여야 합니다.
            </p>
            <p>
              책임비는 일정을 취소하거나 입양 후 입양 미션을 모두 수행하는
              경우에 한하여 반환받을 수 있습니다.
            </p>
          </S.MainText>
          <S.SubText>
            <p>
              책임비는 모든 이해관계자가 강아지의 입양 절차를 책임감 있게
              수행하기 위한 수단입니다.
            </p>
            <p>
              강아지와 가족으로서 함께하기 위한 최소한의 단계인 4개의 미션을
              수행함으로써 책임감을 보여줄 수 있습니다.
            </p>
            <p>
              데려가개는 책임비를 통해 수익을 얻지 않으며, 입양 제반 절차
              미수행으로 인해 반환되지 못한 책임비는 전국 유기동물 보호소에 전액
              기부함을 알려드립니다.
            </p>
          </S.SubText>
          <S.AgreeMentText>
            <p>
              {" "}
              위의 사실을 모두 인지하고 동의하는 경우 책임비를 납부하여 주시기
              바랍니다.
            </p>
          </S.AgreeMentText>
          <S.Div>
            <S.KakaoPay
              href={next_redirect_pc_url}
              onClick={handlePostCost}
            ></S.KakaoPay>
          </S.Div>
        </S.Notification>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
}

export default Postcost;
