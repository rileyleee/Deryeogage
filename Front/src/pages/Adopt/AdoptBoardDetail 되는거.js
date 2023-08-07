import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-bootstrap";

import styled from "styled-components";
import ResultPaw from "./../../components/ResultPaw";

function AdoptBoardDetail() {
  const [precostsData, setPrecostsData] = useState(null);
  const [adoptData, setAdoptData] = useState(null);
  const { boardId } = useParams();
  const navigate = useNavigate();
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  // 사용자가 이 게시글을 찜했는지 여부를 저장하는 상태
  const [isFavorited, setIsFavorited] = useState(false);

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
          (item) => (item.boardId === parseInt(boardId)),
          
        );
        setPrecostsData(filteredData); // Set the filtered data to the state
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

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${REACT_APP_API_URL}/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // 삭제가 성공적으로 이루어지면, 사용자를 다른 페이지로 리다이렉트하거나 필요한 다른 작업을 수행합니다.
      navigate("/adopt");
    } catch (error) {
      console.error(error);
      // 필요에 따라 에러를 처리합니다.
    }
  };

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
    <Container>
      {adoptData.board.title}
      {!isWriter() && (
        <FavoriteButton onClick={handleFavorite}>
          {isFavorited ? "찜 해제하기" : "찜하기"}
        </FavoriteButton>
      )}
      {canChat() && (
        <ChatButton to="/adopt/chatlist">채팅방 목록보기</ChatButton>
      )}
      {canChat() && <Button onClick={handleChat}>채팅하기</Button>}
      <FlexContainer>
        <Box>
          {/* 강아지 특성 정보를 표시하는 섹션 */}
          <ResultPaw title="친화력" selected={adoptData.board.friendly} />
          <ResultPaw title="활동량" selected={adoptData.board.activity} />
          <ResultPaw title="의존도" selected={adoptData.board.dependency} />
          <ResultPaw title="왈왈왈" selected={adoptData.board.bark} />
          <ResultPaw title="털빠짐" selected={adoptData.board.hair} />
        </Box>
        <Box>
          <Carousel>
            {Object.entries(adoptData.images).map(
              ([fileName, fileUrl], index) => {
                const isVideo = fileName.endsWith(".mp4");
                return (
                  <Carousel.Item key={index}>
                    <Media>
                      {isVideo ? (
                        <video controls autoPlay loop muted>
                          <source src={fileUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img src={fileUrl} alt="Dog" />
                      )}
                    </Media>
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
        </Box>
      </FlexContainer>
      <HealthInfoBox>
        <Span>건강정보</Span>
        <div>{adoptData.board.health}</div>
      </HealthInfoBox>
      <IntroductionBox>
        <Span>소개</Span>
        <div>{adoptData.board.introduction}</div>
      </IntroductionBox>

      {isWriter() && <Button onClick={handleDelete}>삭제</Button>}
      {isWriter() && (
        <Link to={`/adopt/edit/${boardId}`}>
          <button>수정하기</button>
        </Link>
      )}
    </Container>
  );
}

export default AdoptBoardDetail;

export const Container = styled.div`
  /* 여기에 Container의 스타일을 적용하세요. */
`;

const Media = styled.div`
  width: 100%;
  height: 100%;
  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ChatButton = styled(Link)`
  margin-top: 10px;
  background-color: #ff914d;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
`;

const MediaBox = styled.div`
  width: 100%;
  height: 500px; // 원하는 높이를 설정하세요.
`;

export const ImageSection = styled.div`
  display: flex;
`;
export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Adjust this value as per your preference */
  margin-bottom: 4px; /* Add margin to separate sections */
  margin-top: 1vh; /* 간격을 좁게 조정하려면 더 작은 값으로 변경하세요. */
`;

export const Box = styled.div`
  margin: 1vw 0;
  padding: 1vh;
  border: 1px #ff914d solid;
  border-radius: 30px;
  background-color: white;
  text-align: center;
  display: flex;
  align-items: center; /* SurveyPaw 컴포넌트들을 수직 방향으로 중앙 정렬 */
  flex-direction: column; /* SurveyPaw 컴포넌트들을 수직 방향으로 배치 */
  flex: 1;
  margin-right: 1vw;
`;

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;

export const DogTextarea = styled.textarea`
  /* 여기에 DogTextarea의 스타일을 적용하세요. */
`;

export const Button = styled.button`
  /* 여기에 Button의 스타일을 적용하세요. */
`;

export const EditButton = styled(Link)`
  background-color: #ff914d;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
`;

// 찜하기 버튼 스타일
export const FavoriteButton = styled.button`
  /* 여기에 FavoriteButton의 스타일을 적용하세요. */
  background-color: #ff914d;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  margin: 10px;
`;

export const HealthInfoBox = styled.div`
  border: 1px solid rgba(255, 145, 77, 1); // 색상은 원하는 대로 조정하세요.
  padding: 10px;
  margin: 10px 0;
  border-radius: 30px;
  display: flex;
  flex-direction: column; // 수직 방향으로 내용을 정렬합니다.
`;

export const IntroductionBox = styled.div`
  border: 1px solid rgba(255, 145, 77, 1); // 색상은 원하는 대로 조정하세요.
  padding: 10px;
  margin: 10px 0;
  border-radius: 30px;
  display: flex;
  flex-direction: column; // 수직 방향으로 내용을 정렬합니다.
`;
