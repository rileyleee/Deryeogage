import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  /* 여기에 Container의 스타일을 적용하세요. */
`;

export const Media = styled.div`
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

export const Box = styled.div`
  margin: 1vw 0;
  padding: 1vh;
  border: 1px #ff914d solid;
  border-radius: 30px;
  background-color: white;
  text-align: center;
  display: flex;
  align-items: center; /* SurveyPaw 컴포넌트들을 수직 방향으로 중앙 정렬 */
  flex-direction: column; /* SurveyPaw 컴포넌트들을 수직 방향으로 배치 */
  flex: 1;
  margin-right: 1vw;
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

// 찜하기 버튼 스타일
export const FavoriteButton = styled.button`
  /* 여기에 FavoriteButton의 스타일을 적용하세요. */
  background-color: #ff914d;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  margin: 10px;
`;

export const HealthInfoBox = styled.div`
  border: 1px solid rgba(255, 145, 77, 1); // 색상은 원하는 대로 조정하세요.
  padding: 10px;
  margin: 10px 0;
  border-radius: 30px;
  display: flex;
  flex-direction: column; // 수직 방향으로 내용을 정렬합니다.
`;

export const IntroductionBox = styled.div`
  border: 1px solid rgba(255, 145, 77, 1); // 색상은 원하는 대로 조정하세요.
  padding: 10px;
  margin: 10px 0;
  border-radius: 30px;
  display: flex;
  flex-direction: column; // 수직 방향으로 내용을 정렬합니다.
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const TitleContainer = styled.div`
`

export const ProfileModal = styled.div`
  position: absolute;
  top: ${props => props.y}px; // y 위치 적용
  left: ${props => props.x}px; // x 위치 적용
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 10; // 다른 요소 위에 표시
`;