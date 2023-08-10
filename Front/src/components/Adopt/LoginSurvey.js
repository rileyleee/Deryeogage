import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "../../styled/Adopt/LoginSurvey.style"

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
        }
      })
      .catch((error) => {

      });
  }, []);

  return (
    <>
      <S.Background>
        <p>
          <S.Span>{localStorage.getItem("nickname")}</S.Span>님의 선호도조사를
          기반으로 강아지를 추천해드려요!
        </p>
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
                          <h5>{dog.name}</h5>
                          <p>{dog.introduction}</p>
                        </S.CaptionContainer>
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
      </S.Background>
    </>
  );
}

export default LoginSurvey;
