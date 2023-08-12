import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "../../styled/Adopt/LoginSurvey.style"
import BoardResultPaw from "./../../components/BoardResultPaw";
import { Link } from 'react-router-dom';
import { Carousel } from "react-bootstrap";

function getFileType(url) {
  const extension = url.split(".").pop().toLowerCase();
  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  const videoExtensions = ["mp4"];

  if (imageExtensions.includes(extension)) {
    return "image";
  } else if (videoExtensions.includes(extension)) {
    return "video";
  } else {
    return "unknown";
  }
}

function LoginSurvey() {
  const [dogs, setDogs] = useState([]);
  const token = localStorage.getItem("accessToken");
  const [surveyData, setSurveyData] = useState(null);

  useEffect(() => {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    // 첫 번째 요청
    const fetchBoardsRecommendation = axios.get(
      `${REACT_APP_API_URL}/boards/recommendation`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 두 번째 요청
    const fetchSurveys = axios.get(`${REACT_APP_API_URL}/surveys`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Promise.all([fetchBoardsRecommendation, fetchSurveys])
      .then(([boardsResponse, surveysResponse]) => {
        // 첫 번째 요청의 응답 처리
        if (Array.isArray(boardsResponse.data.data)) {
          setDogs(boardsResponse.data.data);
          console.log(boardsResponse.data.data);
        }

        // 두 번째 요청의 응답 처리
        if (surveysResponse.data.data) {
          console.log(surveysResponse.data.data);
          const surveyData = surveysResponse.data.data;
          setSurveyData(surveyData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <div>
        <S.Smallspacer></S.Smallspacer>
        <S.StyledText>
          <S.Span>{localStorage.getItem("nickname")}</S.Span>님의 선호도조사를
          기반으로 강아지를 추천해드려요!
        </S.StyledText>
        {dogs.length < 5 ? (
          <p>게시글이 부족합니다.</p>
        ) : (
          <S.CustomCarousel>
            <S.CarouselContainer>
              <Carousel controls={true} indicators={true} interval={3000}>
                {dogs.map((dog, index) => (
                  <Carousel.Item key={dog.id || index}>
                    <S.MediaAndCaptionContainer>
                      <S.MediaContainer>
                        {getFileType(dog.fileList[0]) === "image" ? (
                          <Link to={`${dog.id}`}>
                            <S.StyledMedia src={dog.fileList[0]} alt={dog.name} />
                          </Link>
                        ) : (
                          <video width="100%" controls>
                            <source src={dog.fileList[0]} type="video/mp4" />
                          </video>
                        )}
                      </S.MediaContainer>

                      <S.CaptionContainer>
                        <S.StyledText>이름: {dog.name}</S.StyledText>
                        <S.StyledText>나이: {dog.age}세</S.StyledText>
                        <S.StyledText>성별: {dog.gender ? "남자" : "여자"}</S.StyledText>
                        <S.StyledText>지역: {dog.regionCode}</S.StyledText>
                        <S.StyledText>칩: {dog.chipYn ? "등록" : "미등록(알 수 없음)"}</S.StyledText>
                      </S.CaptionContainer>
                      <S.Box>
                        {/* 강아지 특성 정보를 표시하는 섹션 */}
                        {dog.name}의 특성
                        <BoardResultPaw title="친화력" selected={dog.friendly} />
                        <BoardResultPaw title="활동량" selected={dog.activity} />
                        <BoardResultPaw title="의존도" selected={dog.dependency} />
                        <BoardResultPaw title="왈왈왈" selected={dog.bark} />
                        <BoardResultPaw title="털빠짐" selected={dog.hair} />
                      </S.Box>
                      <S.Box>
                        {/* 사용자 선호도조사를 표시하는 섹션 */}
                        {localStorage.getItem("nickname")}님의 선호도
                        <BoardResultPaw title="친화력" selected={surveyData.friendly} />
                        <BoardResultPaw title="활동량" selected={surveyData.activity} />
                        <BoardResultPaw title="의존도" selected={surveyData.dependency} />
                        <BoardResultPaw title="왈왈왈" selected={surveyData.bark} />
                        <BoardResultPaw title="털빠짐" selected={surveyData.hair} />
                      </S.Box>
                    </S.MediaAndCaptionContainer>
                  </Carousel.Item>
                ))}
              </Carousel>
            </S.CarouselContainer>
          </S.CustomCarousel>
        )}
      </div >
    </>
  );
}

export default LoginSurvey;
