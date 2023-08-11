import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "../../styled/Adopt/LoginSurvey.style"
import ResultPaw from "./../../components/ResultPaw";

function LoginSurvey() {
  const [dogs, setDogs] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    axios
      .get(`${REACT_APP_API_URL}/boards/recommendation`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setDogs(response.data.data);
          console.log(response.data.data);
        }
      })
      .catch((error) => {

      });
  }, []);

  return (
    <>
      {/* <S.Background>
      </S.Background> */}
      <div>
        <S.StyledText>
          <S.Span>{localStorage.getItem("nickname")}</S.Span>님의 선호도조사를
          기반으로 강아지를 추천해드려요!
        </S.StyledText>
        {dogs.length < 5 ? (
          <p>게시글이 부족합니다.</p>
        ) : (
          <S.CustomCarousel>
            <S.Carousel>
              <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                  {dogs.map((dog, index) => (
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to={index}
                      className={index === 0 ? "active" : ""}
                      aria-current="true"
                      aria-label={`Slide ${index + 1}`}
                    ></button>
                  ))}
                </div>

                <div className="carousel-inner">
                  {dogs.map((dog, index) => (
                    <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
                      <S.ImageAndCaptionContainer>
                        <S.ImageContainer>
                          <S.StyledImage
                            src={dog.fileList[0]}
                            className="d-block w-100"
                            alt={dog.name}
                          />
                        </S.ImageContainer>
                        <S.CaptionContainer>
                          <S.StyledText>이름: {dog.name}</S.StyledText>
                          <S.StyledText>나이: {dog.age}세</S.StyledText>
                          <S.StyledText>성별: {dog.gender ? "남자" : "여자"}</S.StyledText>
                          <S.StyledText>지역: {dog.regionCode}</S.StyledText>
                          <S.StyledText>칩 등록: {dog.chipYn ? "등록" : "미등록(알 수 없음)"}</S.StyledText>
                        </S.CaptionContainer>
                        <S.Box>
                          {/* 강아지 특성 정보를 표시하는 섹션 */}
                          <ResultPaw title="친화력" selected={dog.friendly} />
                          <ResultPaw title="활동량" selected={dog.activity} />
                          <ResultPaw title="의존도" selected={dog.dependency} />
                          <ResultPaw title="왈왈왈" selected={dog.bark} />
                          <ResultPaw title="털빠짐" selected={dog.hair} />
                        </S.Box>
                      </S.ImageAndCaptionContainer>
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </S.Carousel>
          </S.CustomCarousel>
        )}
      </div>
    </>
  );
}

export default LoginSurvey;
