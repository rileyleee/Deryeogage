import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

function LoginSurvey(props) {
  return (
    <div>
      <p>{props.user}님의 선호도조사를 기반으로 강아지를 추천해드려요!</p>

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
            <div className="carousel-item active">
              <ImageContainer>
                <img
                  src="assets/kkomi1.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </ImageContainer>
            </div>
            <div className="carousel-item">
              <ImageContainer>
                <img
                  src="assets/kkomi2.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </ImageContainer>
            </div>
            <div className="carousel-item">
              <ImageContainer>
                <img
                  src="assets/kkomi3.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </ImageContainer>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </Carousel>
    </div>
  );
}

export default LoginSurvey;

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
