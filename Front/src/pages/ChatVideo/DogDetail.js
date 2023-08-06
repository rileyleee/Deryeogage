import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import ResultPaw from "./../../components/ResultPaw";
import { Carousel } from "react-bootstrap";

function DogDetail(props) {
  const [adoptData, setAdoptData] = useState(null);
  const { boardId } = props;
  const token = localStorage.getItem("accessToken");
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchAdoptData = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_URL}/boards/each/${boardId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAdoptData({
          board: response.data.data[0],
          images: response.data.data[1],
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdoptData();
  }, [boardId]);

  return (
    <div>
      {adoptData ? (
        <Container>
          강쥐 상세정보 보여줄거임
          {adoptData.board.title}
          <FlexContainer>
            <Box>
              {/* 강아지 특성 정보를 표시하는 섹션 */}
              <ResultPaw title="친화력" selected={adoptData.board.friendly} small={true} />
              <ResultPaw title="활동량" selected={adoptData.board.activity} small={true} />
              <ResultPaw title="의존도" selected={adoptData.board.dependency} small={true} />
              <ResultPaw title="왈왈왈" selected={adoptData.board.bark} small={true} />
              <ResultPaw title="털빠짐" selected={adoptData.board.hair} small={true} />
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
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DogDetail;


export const Container = styled.div`
  height: 75vh;
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

const Box = styled.div`
  margin: 1vw 0;
  padding: 2vh 2vw; // 패딩을 증가시켰습니다
  border: 1px #ff914d solid;
  border-radius: 30px;
  background-color: white;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  margin-right: 1vw;
  
  p {
    font-size: 12px; // 원하는 폰트 크기로 설정
  }
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
