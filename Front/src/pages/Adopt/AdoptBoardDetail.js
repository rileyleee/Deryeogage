import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import * as S from "../../styled/Adopt/AdoptBoardDetail.style";
import ResultPaw from "./../../components/ResultPaw";
import ReturnPrecosts from "../../components/Adopt/ReturnPreconsts";
import UserProfile from "../../components/User/UserProfile";
import ChatRoomsList from "../../pages/ChatVideo/ChatRoomsList";
function AdoptBoardDetail() {
  const [precostsData, setPrecostsData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false); // 사용자 프로필 모달 상태를 제어하는 상태 변수
  const [showModal, setShowModal] = useState(false);
  const [adoptData, setAdoptData] = useState(null);
  const { boardId } = useParams();
  const navigate = useNavigate();
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  
  const [showChatRoomsModal, setShowChatRoomsModal] = useState(false);

  const handleShowChatRoomsModal = () => {
    setShowChatRoomsModal(true);
};

const handleCloseChatRoomsModal = () => {
    setShowChatRoomsModal(false);
};

  const toggleProfileModal = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // 이 위치를 상태로 설정하여 모달의 위치로 사용합니다.
    setModalPosition({ x, y });
    setShowProfileModal(!showProfileModal);
  };

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
          console.log("게시판 상세조회 할 때 가져오는 것들 ~~~", response);
          console.log(
            "status를 보자 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
            response.data.data[0].status
          );

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
    return (
      !!insertedToken &&
      !adoptData.board.writer &&
      (adoptData.board.status === null || adoptData.board.adopter)
    );
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
        navigate(`/adopt/chatroom/${response.data.id}?boardId=${boardId}`, { state: { data } });
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
      <S.BoardTitle>{adoptData.board.title}</S.BoardTitle>
      <Container fluid>
        <Row>
          <S.Profile>
            <>
              <span onClick={toggleProfileModal}>
                작성자: {adoptData.board.userNickname}
              </span>
              <span>작성일시: {adoptData.board.createdDate.split("T")[0]}</span>
              {showProfileModal && (
                <S.ProfileModal x={modalPosition.x} y={modalPosition.y}>
                  <UserProfile data={adoptData.board.userId} />
                </S.ProfileModal>
              )}
            </>
          </S.Profile>
        </Row>
      </Container>
      <S.Total>
        <Container fluid>
          <S.TopRow>
            <Col xs={7}>
              <S.Status>
                {/* 입양 상태에 따른 메시지 표시 */}
                {adoptData.board.status === "depart" && (
                  <S.StatusMessage>
                    입양 진행 중인 강아지입니다.
                  </S.StatusMessage>
                )}
                {adoptData.board.status === "arrive" && (
                  <S.StatusMessage>입양 완료된 강아지입니다</S.StatusMessage>
                )}
              </S.Status>
            </Col>
            <Col xs={5}>
              <S.TopButtons>
                {!isWriter() && (
                  <S.Button onClick={handleFavorite}>
                    {isFavorited ? "찜 해제하기" : "찜하기"}
                  </S.Button>
                )}

{isWriter() && (
  <>
    <S.Button onClick={handleShowChatRoomsModal}>채팅방 목록보기</S.Button>
    {showChatRoomsModal && (
      <S.ModalContainer>
        <S.ModalContent>
          <ChatRoomsList boardId={boardId} onClose={handleCloseChatRoomsModal} />
        </S.ModalContent>
      </S.ModalContainer>
    )}
  </>
)}
                {canChat() && <S.Button onClick={handleChat}>채팅하기</S.Button>}
              </S.TopButtons>
            </Col>
          </S.TopRow>
        </Container>
        <Container fluid>
          <Row>
            <Col xs={7}>
              <S.ImageBox>
                <Carousel>
                  {Object.entries(adoptData.images).map(
                    ([fileName, fileUrl], index) => {
                      const isVideo = fileName.endsWith(".mp4");
                      return (
                        <Carousel.Item key={index}>
                          <S.StyledMedia>
                            {isVideo ? (
                              <video
                                controls
                                autoPlay
                                loop
                                muted
                                style={{
                                  width: "720px",
                                  height: "500px",
                                  objectFit: "cover",
                                }}
                              >
                                <source src={fileUrl} type="video/mp4" />
                              </video>
                            ) : (
                              <img src={fileUrl} alt="Dog" />
                            )}
                          </S.StyledMedia>
                        </Carousel.Item>
                      );
                    }
                  )}
                </Carousel>
              </S.ImageBox>
            </Col>
            <Col xs={5}>
              <S.BoardBox>
                {/* 강아지 기본 정보를 표시하는 섹션 */}
                <p>
                  <S.Span>이 름</S.Span> {adoptData.board.name}
                </p>
                <p>
                  <S.Span>나 이</S.Span> {adoptData.board.age}세
                </p>
                <p>
                  <S.Span>지 역</S.Span> {adoptData.board.regionCode}
                </p>
                <p>
                  <S.Span>성 별</S.Span>{" "}
                  {adoptData.board.gender ? "남자" : "여자"}
                </p>
                <p>
                  <S.Span>견 종</S.Span> {adoptData.board.dogTypeCode}
                </p>
                <p>
                  <S.Span>칩등록 </S.Span>{" "}
                  {adoptData.board.chipYn ? "등록" : "미등록(알 수 없음)"}
                </p>
              </S.BoardBox>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
                <S.DogTitle>{adoptData.board.name} 특성과 성격</S.DogTitle>
              <S.PawBox>
                {/* 강아지 특성 정보를 표시하는 섹션 */}
                <ResultPaw title="친화력" selected={adoptData.board.friendly} />
                <ResultPaw title="활동량" selected={adoptData.board.activity} />
                <ResultPaw
                  title="의존도"
                  selected={adoptData.board.dependency}
                />
                <ResultPaw title="왈왈왈" selected={adoptData.board.bark} />
                <ResultPaw title="털빠짐" selected={adoptData.board.hair} />
              </S.PawBox>
            </Col>
            <Col xs={8}>
              <Container>
                <Row>
                    <S.DogTitle>건강정보</S.DogTitle>
                  <S.HealthInfoBox>
                    <div>{adoptData.board.health}</div>
                  </S.HealthInfoBox>
                </Row>
                <Row>
                    <S.DogTitle>소개</S.DogTitle>
                  <S.IntroductionBox>
                    <div>{adoptData.board.introduction}</div>
                  </S.IntroductionBox>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>

        <Container fluid>
          <S.TopButtons>
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
              <S.Button>
                <S.StyledLink to={`/adopt/edit/${boardId}`}>
                  수정하기
                </S.StyledLink>
              </S.Button>
            )}
          </S.TopButtons>
        </Container>
      </S.Total>
    </S.Container>
  );
}

export default AdoptBoardDetail;
