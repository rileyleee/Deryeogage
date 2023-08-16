import { useState, useEffect } from "react";
import axios from "axios";
import * as S from "../../styled/ChatVideo/DogDetail.style";
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
  }, []);

  return (
    <>
    
      {adoptData ? (
        <S.Container>
          <S.TopBox>
            <S.BoardTitle>
              게시글 제목 : {adoptData.board.title} <br />
              작성자 : {adoptData.board.userNickname}
            </S.BoardTitle>
            <S.FixedButton
              onClick={() => {
                // 화상 채팅을 시작하면 showVideoRoom을 true로 설정
                props.setShowVideoRoom(true);
              }}
            >
              화상채팅 열기
            </S.FixedButton>
          </S.TopBox>
          <S.FlexContainer>
            <S.Box>
              <Carousel>
                {Object.entries(adoptData.images).map(
                  ([fileName, fileUrl], index) => {
                    const isVideo = fileName.endsWith(".mp4");
                    return (
                      <Carousel.Item key={index}>
                        <S.MediaContainer>
                          {isVideo ? (
                            <S.StyledVideo controls autoPlay loop muted>
                              <source src={fileUrl} type="video/mp4" />
                              Your browser does not support the video tag.
                            </S.StyledVideo>
                          ) : (
                            <S.StyledMedia src={fileUrl} alt="Dog" />
                          )}
                        </S.MediaContainer>
                      </Carousel.Item>
                    );
                  }
                )}
              </Carousel>
              <S.DogInfo>
                {/* 강아지 기본 정보를 표시하는 섹션 */}
                <p>이 름 : {adoptData.board.name}</p>
                <p>나 이 : {adoptData.board.age} 세</p>
                <p>지 역 : {adoptData.board.regionCode}</p>
                <p>성 별 : {adoptData.board.gender ? "수컷" : "암컷"}</p>
                <p>
                  칩 등록 여부 :{" "}
                  {adoptData.board.chipYn ? "등록" : "미등록(알 수 없음)"}
                </p>
              </S.DogInfo>
            </S.Box>
            <S.Box>
              <S.Text>
                {adoptData.board.name}의 <S.Span>성격</S.Span>과{" "}
                <S.Span>특성</S.Span>을 확인하세요
              </S.Text>
              <S.DogPersonality>
                {/* 강아지 특성 정보를 표시하는 섹션 */}
                <ResultPaw title="친화력" selected={adoptData.board.friendly} />
                <ResultPaw title="활동량" selected={adoptData.board.activity} />
                <ResultPaw
                  title="의존도"
                  selected={adoptData.board.dependency}
                />
                <ResultPaw title="왈왈왈" selected={adoptData.board.bark} />
                <ResultPaw title="털빠짐" selected={adoptData.board.hair} />
              </S.DogPersonality>
            </S.Box>
          </S.FlexContainer>
          <S.DogHealth>
            {adoptData.board.name}의 <S.Span>건강정보</S.Span>를 확인하세요
            <S.infoBox>{adoptData.board.health}</S.infoBox>
          </S.DogHealth>
        </S.Container>
      ) : (
        <p>Loading...</p>
      )}
  </>
  );
}

export default DogDetail;
