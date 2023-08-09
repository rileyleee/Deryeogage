import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-bootstrap";

import * as S from "../../styled/Adopt/AdoptBoardDetail.style"
import ResultPaw from "./../../components/ResultPaw";
import ReturnPrecosts from "../../components/Adopt/ReturnPreconsts";

function AdoptBoardDetail() {
  const [precostsData, setPrecostsData] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [adoptData, setAdoptData] = useState(null);
  const { boardId } = useParams();
  const navigate = useNavigate();
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const handleReturnPrecosts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `${REACT_APP_API_URL}/precosts`,
        { boardId: parseInt(boardId) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("환급받기 성공");
        navigate("/adopt");
      } else {
        console.log("환급받기 실패");
      }
    } catch (error) {
      console.error("환급받기 중 에러 발생:", error);
    }
    setShowModal(false); // 요청 후 모달 창을 닫습니다.
  };

  // 사용자가 이 게시글을 찜했는지 여부를 저장하는 상태
  const [isFavorited, setIsFavorited] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };
  // 찜하기 버튼을 누르면 실행되는 함수
  const handleFavorite = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      // isFavorited 상태에 따라 찜하기 또는 찜 해제하기 요청을 보냅니다.
      const method = isFavorited ? "delete" : "post"; // 찜 상태면 DELETE 요청, 아니면 POST 요청

      const response = await axios({
        method,
        url: `${REACT_APP_API_URL}/boards/${boardId}/like`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setIsFavorited(!isFavorited); // 찜 상태 토글
        console.log("찜해제하기");
      } else {
        console.log("찜하기/찜 해제하기에 실패했습니다.");
      }
    } catch (error) {
      console.error("찜하기/찜 해제하기 중 에러 발생:", error);
    }
  };

  // 사용자가 로그인되어 있는지와 작성자인지를 확인하는 함수
  const isWriter = () => {
    const insertedToken = localStorage.getItem("accessToken");
    return !!insertedToken && adoptData.board.writer; // 토큰이 존재하고, writer가 true면 true, 아니면 false를 반환
  };

  useEffect(() => {
    const fetchAdoptData = async () => {
      if (boardId) {
        try {
          const token = localStorage.getItem("accessToken"); // 토큰을 가져옵니다
          const response = await axios.get(
            `${REACT_APP_API_URL}/boards/each/${boardId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰을 담아 요청을 보냅니다
              },
            }
          );
          console.log(response);
          setAdoptData({
            board: response.data.data[0],
            images: response.data.data[1],
          });
        } catch (error) {
          console.error(error);
        }
      }
    };

    const fetchFavoriteStatus = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${REACT_APP_API_URL}/boards/like`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // 해당 게시글의 boardId가 좋아요 목록에 있는지 확인합니다.
        const isCurrentBoardFavorited = response.data.data.some(
          (item) => item.boardId === parseInt(boardId)
        );

        setIsFavorited(isCurrentBoardFavorited);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPrecostsData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${REACT_APP_API_URL}/precosts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const filteredData = response.data.data.filter(
          (item) => item.boardId === parseInt(boardId)
        );
        setPrecostsData(filteredData[0].returnYn); // Set the filtered data to the state
        console.log("Filtered Precosts Data:", filteredData);
      } catch (error) {
        console.error("Failed to fetch Precosts data:", error);
      }
    };

    fetchAdoptData();
    fetchFavoriteStatus(); // 찜 상태도 함께 가져옵니다.
    fetchPrecostsData(); // Add this line to fetch the /precosts data.
  }, [boardId]);

  if (!adoptData) {
    return null; // or a loading component
  }

  // 채팅 버튼이 보여져야 하는지 확인하는 함수
  const canChat = () => {
    const insertedToken = localStorage.getItem("accessToken");
    return !!insertedToken && !adoptData.board.writer; // 토큰이 존재하고, writer가 false면 true, 아니면 false를 반환
  };

  // 채팅 버튼을 누르면 실행되는 함수
  const handleChat = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      // 서버에 보낼 데이터 객체를 생성
      const data = {
        boardId: boardId, // 게시글 ID
      };

      // 서버로 POST 요청 보내기
      const response = await axios.post(
        `${REACT_APP_API_URL}/chat/room/${boardId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 서버 응답 결과에 따라 처리
      if (response) {
        // 채팅 방 생성이 성공적으로 이루어진 경우
        // 채팅 방으로 이동하는 코드 작성
        console.log(response.data);
        navigate(`/adopt/chatroom/${response.data.id}`, { state: { data } });
      } else {
        // 실패한 경우에 대한 처리
        console.log("채팅 방 생성에 실패했습니다.");
      }
    } catch (error) {
      // 에러 처리
      console.error("채팅 방 생성 중 에러 발생:", error);
    }
  };

  return (
    <S.Container>
      {adoptData.board.title}
      {!isWriter() && (
        <S.FavoriteButton onClick={handleFavorite}>
          {isFavorited ? "찜 해제하기" : "찜하기"}
        </S.FavoriteButton>
      )}
      {isWriter() && (
        <S.ChatButton to="/adopt/chatlist">채팅방 목록보기</S.ChatButton>
      )}
      {canChat() && <S.Button onClick={handleChat}>채팅하기</S.Button>}
      <S.FlexContainer>
        <S.Box>
          {/* 강아지 특성 정보를 표시하는 섹션 */}
          <ResultPaw title="친화력" selected={adoptData.board.friendly} />
          <ResultPaw title="활동량" selected={adoptData.board.activity} />
          <ResultPaw title="의존도" selected={adoptData.board.dependency} />
          <ResultPaw title="왈왈왈" selected={adoptData.board.bark} />
          <ResultPaw title="털빠짐" selected={adoptData.board.hair} />
        </S.Box>
        <S.Box>
          <Carousel>
            {Object.entries(adoptData.images).map(
              ([fileName, fileUrl], index) => {
                const isVideo = fileName.endsWith(".mp4");
                return (
                  <Carousel.Item key={index}>
                    <S.Media>
                      {isVideo ? (
                        <video controls autoPlay loop muted>
                          <source src={fileUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img src={fileUrl} alt="Dog" />
                      )}
                    </S.Media>
                  </Carousel.Item>
                );
              }
            )}
          </Carousel>
          {/* 강아지 기본 정보를 표시하는 섹션 */}
          <p>이름 :{adoptData.board.name}</p>
          <p>나이 :{adoptData.board.age}세</p>
          <p>지역 :{adoptData.board.regionCode}</p>
          <p>성별 :{adoptData.board.gender ? "남자" : "여자"}</p>
          <p>
            칩 등록 여부 :
            {adoptData.board.chipYn ? "등록" : "미등록(알 수 없음)"}
          </p>
        </S.Box>
      </S.FlexContainer>
      <S.HealthInfoBox>
        <S.Span>건강정보</S.Span>
        <div>{adoptData.board.health}</div>
      </S.HealthInfoBox>
      <S.IntroductionBox>
        <S.Span>소개</S.Span>
        <div>{adoptData.board.introduction}</div>
      </S.IntroductionBox>

      {precostsData === null && isWriter() && (
        <S.Button onClick={handleDeleteClick}>삭제</S.Button>
      )}
      {showModal && (
        <S.ModalContainer>
          <S.ModalContent>
            <ReturnPrecosts onReturn={handleReturnPrecosts} />
          </S.ModalContent>
        </S.ModalContainer>
      )}

      {isWriter() && (
        <Link to={`/adopt/edit/${boardId}`}>
          <button>수정하기</button>
        </Link>
      )}
    </S.Container>
  );
}

export default AdoptBoardDetail;