// 분양게시판 전체 보기에서 로그인이랑 선호도조사 둘 다 진행했을 때
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginSurvey() {
  return (
    <div>
      <p>OO님의 선호도조사를 기반으로 강아지를 추천해드려요!</p>

      {/* 캐러셀로 강아지 추천 해줄거임 */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="true"
      >
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
            <img src="asset/kkomi1.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="asset/kkomi2.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="asset/kkomi3.jpg" className="d-block w-100" alt="..." />
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
    </div>
  );
}

export default LoginSurvey;
