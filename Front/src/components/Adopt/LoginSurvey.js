import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

function LoginSurvey() {
  const [dogs, setDogs] = useState([]); // Create a new state to hold the dog data
  const token = localStorage.getItem("accessToken"); // Get user token

  useEffect(() => {
    const REACT_APP_API_URL = "http://localhost:8080/api/boards/recommendation";
    axios
      .get(REACT_APP_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDogs(response.data); // Set the dog data from the response
      })
      .catch((error) => {
        console.error("Error fetching dog data:", error);
      });
  }, []);
  return (
    <div>
      <p>
        <Span>{localStorage.getItem("nickname")}</Span>님의 선호도조사를
        기반으로 강아지를 추천해드려요!
      </p>

      {/* 캐러셀로 강아지 추천 해줄거임 */}
      <Carousel>
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="carousel-inner">
            {dogs.map((dog, index) => (
              <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <ImageContainer>
                  <img
                    src={dog.imageURL} // Replace with your image URL property
                    className="d-block w-100"
                    alt={dog.name} // Replace with your alt text property
                  />
                </ImageContainer>
                <div className="carousel-caption d-none d-md-block">
                  <h5>{dog.name}</h5> {/* Replace with your title property */}
                  <p>{dog.description}</p>{" "}
                  {/* Replace with your description property */}
                </div>
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

export const ImageContainer = styled.div`
  position: relative;
  width: 50%; /* 이미지 컨테이너의 너비를 50%로 설정 (왼쪽에 배치) */
  height: 200px; /* 이미지 컨테이너의 높이를 원하는 크기로 설정 (예: 200px) */
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%; /* 이미지를 컨테이너의 너비에 맞게 자동 조절 */
  height: 100%; /* 이미지를 컨테이너의 높이에 맞게 자동 조절 */
  object-fit: cover;
`;

export const InnerText = styled.div`
  display: flex;
  border: 1px #ff914d solid;
  border-radius: 30px;
  left: 45% !important;
`;
