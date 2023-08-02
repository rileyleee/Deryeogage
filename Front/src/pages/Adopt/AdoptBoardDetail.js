import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-bootstrap";

import styled from "styled-components";
import ResultPaw from "./../../components/ResultPaw";

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


function AdoptBoardDetail() {
  const [adoptData, setAdoptData] = useState(null);
  const { boardId } = useParams();
  const navigate = useNavigate();
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL
  useEffect(() => {
    const fetchAdoptData = async () => {
      if (boardId) {
        try {
          const response = await axios.get(
            `${REACT_APP_API_URL}/boards/${boardId}`
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

    fetchAdoptData();
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
  // 사용자가 로그인되어 있는지 여부를 확인하는 함수
  const isLoggedIn = () => {
    const insertedToken = localStorage.getItem("accessToken");
    return !!insertedToken; // 토큰이 존재하면 true, 없으면 false를 반환
  };

  return (
    <Container>
      {adoptData.board.title}

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

      <Span>건강정보</Span>
      {adoptData.board.health}
      <Span>소개</Span>
      {adoptData.board.introduction}

      {isLoggedIn() && <Button onClick={handleDelete}>삭제</Button>}
      {isLoggedIn() && <EditButton to={`/adopt/edit/${boardId}`}>편집</EditButton>}
    </Container>
  );
}

export default AdoptBoardDetail;
