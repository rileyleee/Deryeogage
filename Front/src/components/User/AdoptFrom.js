import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "../../styled/User/AdoptFrom.style"

function AdoptFrom() {
  const [adopts, setAdopts] = useState([]);
  const [confirmedAdopts, setConfirmedAdopts] = useState({});
  const nickname = localStorage.getItem('nickname')
  console.log(adopts)
  console.log(confirmedAdopts)



  const handleConfirmAdoption = async (adoptId, toUserId) => {
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
      setConfirmedAdopts({
        ...confirmedAdopts,
        [adoptId]: true,
      });
    } catch (error) {
      console.error("Failed to confirm adoption:", error);
    }
  };

  const handleRefundResponsibility = async (boardId) => { // 책임비
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
      // 필요한 추가 로직
    } catch (error) {
      console.error("Failed to refund responsibility fee:", error);
    }
  };

  useEffect(() => {
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

  return (
    <div className="container">
      <S.BoardRow className="row list">
        <div className="col-4 text-center">입양글 제목</div>
        <div className="col-2 text-center">입양 확정 내역</div>
        <div className="col-2 text-center">분양자</div>
        <div className="col-2 text-center">입양자</div>
        <div className="col-2 text-center">책임비 현황</div>
      </S.BoardRow>
      <S.ScrollBar>
      {adopts.length === 0 ? (
        <div className="text-center">입양 내역이 없습니다.</div>
      ) : (
        adopts.map((adopt, index) => (
          <S.BoardRow className="row item" key={index}>
            {/* <Media src={adopt.imageUrl} /> */}
            <S.TitleLink className="col-4 text-center" to={`/adopt/${adopt.boardId}`}>{adopt.boardInfo?.title}</S.TitleLink>
            {adopt.toConfirmYn ? ( // toConfirmYn 값에 따라 버튼을 표시
              <S.ConfirmedButton className="col-2 text-center">입양 확정 완료</S.ConfirmedButton>
            ) : (
              <S.ConfirmButton className="col-2 text-center"
                onClick={() => handleConfirmAdoption(adopt.id, index)}
              >
                입양 확정하기
              </S.ConfirmButton>
            )}
            <div className="col-2 text-center">{adopts[0].boardInfo.userNickname}</div>
            <div className="col-2 text-center">{nickname}</div>
            {confirmedAdopts[adopt.id] ? (
              <button
                onClick={() => handleRefundResponsibility(adopt.boardId)}
              >
                책임비 반환하기
              </button>
            ) : adopt.toConfirmYn ? (
              <button
                onClick={() => handleConfirmAdoption(adopt.id, adopt.toUserId)}
              >
                분양 확정하기
              </button>
            ) : null}
          </S.BoardRow>
        ))
      )}
      </S.ScrollBar>
      {/* {showMissionModal && (
        <S.MissionModal>
          <S.MissionContent>
            <MissionList
              missionId={selectedMissionId}
              completedMissions={adopts[selectedIndex]?.completedMissions}
              fetchAdopts={fetchAdopts} // 이 줄을 추가하세요
            />
            <S.CloseButton onClick={closeModal}>닫기</S.CloseButton>
          </S.MissionContent>
        </S.MissionModal>
      )} */}
    </div>
    // <div>
    //   <h2>분양 내역</h2>
    //   {adopts.length === 0 ? (
    //     <p>분양 내역이 없습니다.</p>
    //   ) : (
    //     adopts.map((adopt, index) => (
    //       <div key={index}>
    //         분양 날짜: {adopt.scheduledDate} <br />
    //         게시글 제목: {adopt.boardInfo.title} <br />
    //         강아지 이름: {adopt.boardInfo.name} <br />
    //         나이: {adopt.boardInfo.age} <br />
    //         <S.Image
    //           src={adopt.imageUrl}
    //           alt={`${adopt.boardInfo.name}의 이미지`}
    //         />
    //         {confirmedAdopts[adopt.id] ? (
    //           <button
    //             onClick={() => handleRefundResponsibility(adopt.boardId)}
    //           >
    //             책임비 반환하기
    //           </button>
    //         ) : adopt.toConfirmYn ? (
    //           <button
    //             onClick={() => handleConfirmAdoption(adopt.id, adopt.toUserId)}
    //           >
    //             분양 확정하기
    //           </button>
    //         ) : null}
    //       </div>
    //     ))
    //   )}
    // </div>
  );
}

export default AdoptFrom;
