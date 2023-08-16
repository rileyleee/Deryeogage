// Precost.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "../../styled/Adopt/Precosts.style";
import { useNavigate } from "react-router-dom";

const Precost = ({ onClose, boardId }) => {
  const [next_redirect_pc_url, setNextRedirectPcUrl] = useState("");
  const [tid, setTid] = useState("");
  const navigate = useNavigate();

  const params = {
    cid: "TC0ONETIME",
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    item_name: "데려가개 책임비",
    quantity: 1,
    total_amount: 100000,
    vat_amount: 0,
    tax_free_amount: 0,
    approval_url: `https://i9b307.p.ssafy.io/api/adopt/${boardId}`, // 변경된 부분
    fail_url: `https://i9b307.p.ssafy.io/api/adopt/${boardId}`, // 변경된 부분
    cancel_url: `https://i9b307.p.ssafy.io/api/adopt/${boardId}`, // 변경된 부분
  };

  useEffect(() => {
    axios({
      url: "/v1/payment/ready",
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

  const handlePay = () => {
    const token = localStorage.getItem("accessToken");
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    // 데이터 객체를 생성합니다. 이 경우 boardId를 속성으로 가지고 있고 나머지는 빈 객체입니다.
    const data = {
      boardId: boardId,
    };

    // POST 요청을 생성합니다.
    axios
      .post(`${REACT_APP_API_URL}/precosts/${boardId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
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
        <S.Notification>
          <S.Title>책임비 납부 안내</S.Title>
          <S.MainText>
            <p>저희 데려가개를 통해 강아지를 입양보내기 위해서는</p>
            <p>게시글 작성 전에 책임비(금 십만원정)을 납부하여야 합니다.</p>
            <p>
              책임비는 강아지가 완전히 입양되고 난 후, 또는 게시글을 삭제하는
              경우 반환받을 수 있습니다.
            </p>
          </S.MainText>
          <S.SubText>
            <p>
              강아지를 구조하거나 보호하는 경우에도 강아지에 대한 책임감을
              가져야합니다.
            </p>
            <p>
              책임비는 모든 이해관계자가 강아지의 입양 절차를 책임감 있게
              수행하기 위한 수단입니다.
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
            <S.KakaoPay href={next_redirect_pc_url} onClick={handlePay}>
              {/* 텍스트를 빈 문자열로 남겨두거나 아예 지우시면 됩니다. */}
            </S.KakaoPay>
          </S.Div>
        </S.Notification>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default Precost;
