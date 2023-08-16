import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "../../styled/User/AdoptFrom.style"
import 'bootstrap/dist/css/bootstrap.min.css';

function AdoptFrom() {
  const [adopts, setAdopts] = useState([]);
  const [precost, setPrecost] = useState([])
  console.log(precost)




  const handleConfirmAdoption = async (adoptId, toUserId, index) => {
    const token = localStorage.getItem("accessToken");
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    try {
      await axios.put(
        `${REACT_APP_API_URL}/adopts/fromconfirm`,
        {
          id: adoptId,
          toUserId: toUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Adoption confirmed successfully!");
      const updatedAdopts = [...adopts];
      updatedAdopts[index].fromConfirmYn = true;
      setAdopts(updatedAdopts);
    } catch (error) {
      console.error("Failed to confirm adoption:", error);
    }
  };

  const handleRefundResponsibility = async (boardId, index) => {
    const token = localStorage.getItem("accessToken");
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    try {
      await axios.put(
        `${REACT_APP_API_URL}/precosts/confirm/`,
        {boardId :boardId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Responsibility fee refunded successfully!");
      
      const updatedAdopts = [...adopts];
      updatedAdopts[index].responsibilityRefunded = true;
      setAdopts(updatedAdopts);

      // Update the returnYn for the given boardId
      const updatedPrecost = [...precost];
      const targetIndex = updatedPrecost.findIndex(item => item.boardId === boardId);
      if (targetIndex !== -1) {
          updatedPrecost[targetIndex].returnYn = true;
          setPrecost(updatedPrecost);
      }

    } catch (error) {
      console.error("Failed to refund responsibility fee:", error);
    }
};


  useEffect(() => { // 분양 내역 get
    const fetchAdopts = async () => {
      const token = localStorage.getItem("accessToken");
      const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

      try {
        const response = await axios.get(`${REACT_APP_API_URL}/adopts/from`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("분양내역: ",response);
        const adoptRequests = response.data.data.map(async (adopt) => {
          const boardResponse = await axios.get(
            `${REACT_APP_API_URL}/boards/each/${adopt.boardId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return {
            ...adopt,
            boardInfo: boardResponse.data.data[0],
            imageUrl: Object.values(boardResponse.data.data[1])[0],
            // responsibilityRefunded: adopt.responsibilityRefunded !== undefined ? adopt.responsibilityRefunded : false
          };
        });

        const adoptsWithBoardInfo = await Promise.all(adoptRequests);
        setAdopts(adoptsWithBoardInfo);
      } catch (error) {
        console.error("An error occurred while fetching the data:", error);
      }
    };

    fetchAdopts();
  }, []);
  

  useEffect(() => { // 분양 내역 get
    const getPreCost = async () => {
      const token = localStorage.getItem("accessToken");
      const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

      try {
        const response = await axios.get(`${REACT_APP_API_URL}/precosts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("분양내역: ",response);
        setPrecost(response.data.data)
      } catch (error) {
        console.error("An error occurred while fetching the data:", error);
      }
    };

    getPreCost();
  }, []);

  return (
    <div className="container">
      <S.BoardRow className="row list">
        <div className="col-2 text-center">대표 이미지</div>
        <div className="col-4 text-center">분양글 제목</div>
        <div className="col-3 text-center">분양 날짜</div>
        <div className="col-3 text-center">책임비 현황</div>
      </S.BoardRow>
      <S.ScrollBar>
      {adopts.length === 0 ? (
        <div className="text-center">분양 내역이 없습니다.</div>
      ) : (
        adopts.map((adopt, index) => (
          <S.BoardRow className="row item align-items-center " key={index}>
            <div className="col-2 d-flex justify-content-center align-items-center">
              <S.Image
                src={adopt.imageUrl}
                alt={`${adopt.boardInfo.name}의 이미지`}
              />
            </div>
            <S.TitleLink className="col-4 text-center" to={`/adopt/${adopt.boardId}`}>{adopt.boardInfo?.title}</S.TitleLink>
            <div className="col-3 text-center">{adopt.scheduledDate}</div>
            {adopt.fromConfirmYn ? (
            <div className="col-3 d-flex justify-content-center">
              <S.AdoptComfirmed className="col-3 text-center"
                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                onClick={() => handleRefundResponsibility(adopt.boardId, index)}
                disabled={precost[index].returnYn}
              >
                {precost[index].returnYn ? "반환 완료" : "책임비 반환하기"}
              </S.AdoptComfirmed>
              </div>  
            ) : adopt.toConfirmYn ? (
              <div className="col-3 d-flex justify-content-center">
              <S.AdoptComfirm className="col-3 text-center"
                onClick={() => handleConfirmAdoption(adopt.id, adopt.toUserId, index)}
              >
                분양 확정하기
              </S.AdoptComfirm>
              </div>  
            ) : null}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog modal-sm modal-dialog-centered">
                <div className="modal-content">
                  <S.ModalText className="modal-body">
                    책임비 반환 완료!
                  </S.ModalText>
                  <div className="modal-footer d-flex justify-content-center">
                    <button type="button" style={{backgroundColor:'#FF914D', color: 'white', border : 'none', padding: '1vh 1vw', borderRadius: '30px'}} data-bs-dismiss="modal">확인</button>
                  </div>
                </div>
              </div>
            </div>
          </S.BoardRow>
        ))
      )}
      </S.ScrollBar>
    </div>
  );
}

export default AdoptFrom;
