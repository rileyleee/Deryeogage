import styled from "styled-components";

export const Background = styled.div`
  position: absolute; /* 상대적 위치를 기준으로 움직입니다 */
  top: 20%;     
  left: 0;          
  width: 100%;
  height: 300px;
  background: #FFFCF8;
`;

export const Span = styled.span`
  margin-left: 7.5%;
  color: rgba(255, 145, 77, 1);
`;

export const Carousel = styled.div`
  display: flex;
  background-color: #FFF7E7;
  border: 1px #ff914d none;
  justify-content: center;
  padding: 1vw;
  margin-top: 1%;
  margin-bottom: 1%;
`;

export const CustomCarousel = styled.div`
  /* 좌우 버튼 색 변경 */
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    filter: invert(1);  /* 색상 반전 */
    //background-color: #ff914d;  /* 활성화된 버튼 */
  }

  .carousel-control-prev {
    left: -20%;  /* 기본값은 0%입니다. */
  }

  .carousel-control-next {
    right: -20%; /* 기본값은 0%입니다. */
  }

  /* 순서를 나타내는 바(인디케이터) 색 변경 */
  .carousel-indicators button {
    background-color: #ff914d;  /* 기본 버튼 */
  }

  .carousel-indicators .active {
    background-color: #4A2511;  /* 활성화된 버튼 */
  }
`;

export const StyledImage = styled.img`
  width: 100%;          /* 이미지를 컨테이너 너비에 맞춤 */
  height: 100%;         /* 이미지를 컨테이너 높이에 맞춤 */
  object-fit: cover;    /* 이미지가 컨테이너에 맞게 잘릴 수 있게 설정 */
  object-position: center; /* 이미지의 중앙 부분이 중점이 되도록 설정 */
  border-radius: 10px;
`;


export const ImageAndCaptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 50%;
  height: 300px;
  margin-right: 50px; 
  overflow: hidden;
`;

export const CaptionContainer = styled.div`
  width: 50%;
  padding: 10px;
  height: 300px;
  background-color: #FFF7E7;
  color:#4A2511;
`;
