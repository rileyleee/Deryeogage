import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

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
    <div>
      <p>
        <Span>{localStorage.getItem("nickname")}</Span>님의 선호도조사를
        기반으로 강아지를 추천해드려요!
      </p>
      {dogs.length < 5 ? (
        <p>게시글이 부족합니다.</p>
      ) : (
        <Carousel>
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
                  <ImageAndCaptionContainer>
                    <ImageContainer>
                      <img
                        src={dog.fileList[0]}
                        className="d-block w-100"
                        alt={dog.name}
                      />
                    </ImageContainer>
                    <CaptionContainer className="bg-dark text-white">
                      <h5>{dog.name}</h5>
                      <p>{dog.introduction}</p>
                    </CaptionContainer>
                  </ImageAndCaptionContainer>
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
        </Carousel>
      )}
    </div>
  );
}

export default LoginSurvey;

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;

export const Carousel = styled.div`
  display: flex;
  background-color: white;
  border: 1px #ff914d solid;
  border-radius: 30px;
  justify-content: center;
  padding: 1vw;
  margin-top: 1%;
  margin-bottom: 1%;
`;

export const ImageAndCaptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 50%;
  height: 500px;
  overflow: hidden;
`;

export const CaptionContainer = styled.div`
  width: 50%;
  padding: 10px;
`;
