import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  margin: 2vh 0;
  display: flex;
  flex-direction: column; // 세로 방향으로 아이템을 나열합니다.
  height: 82vh; // 가능한 한 최대 높이를 사용합니다.
`;

export const StyledVideo = styled.video`
  width: 100%;
  object-fit: cover;
  object-position: center;
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

export const DogPersonality = styled.div`
  margin-top: 2vh;
  text-decoration: none;
  text-align: center;
`;

export const Text = styled.div`
  margin-top: 2vh;
  font-size: 1.2rem;
`;

export const BoardTitle = styled.div`
  margin-left: 3vh;
  font-size: 1.3rem;
`;

export const DogHealth = styled.div`
  margin-top: 2vh;
  margin-left: 1vw;
  margin-right: 1vw;
`;

export const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MediaContainer = styled.div`
  width: 100%;
  height: 28vh;
  overflow: hidden;
`;

export const StyledMedia = styled.img`
  width: 100%; /* 이미지를 컨테이너 너비에 맞춤 */
  object-fit: cover;
  object-position: center; /* 이미지의 중앙 부분이 중점이 되도록 설정 */
  border-radius: 10px;
`;

export const ImageSection = styled.div`
  display: flex;
`;
export const FlexContainer = styled.div`
  display: flex;
  gap: 10px; /* Adjust this value as per your preference */
  margin-bottom: 4px; /* Add margin to separate sections */
  margin-top: 1vh;
`;

export const Box = styled.div`
  margin: 1vw 0;
  padding: 2vh 2vw; // 패딩을 증가시켰습니다
  border: 1px #ff914d solid;
  border-radius: 30px;
  background-color: white;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  margin-left: 1vw;
  margin-right: 1vw;

  p {
    font-size: 15px; // 원하는 폰트 크기로 설정
  }
`;

export const infoBox = styled.div`
  margin: 1vw 0;
  padding: 2vh 2vw; // 패딩을 증가시켰습니다
  border: 1px #ff914d solid;
  border-radius: 15px;
  display: flex;
  height: 17vh;
  word-wrap: break-word;
  white-space: normal;
`;

export const DogInfo = styled.div`
  font-size: 1.3rem; // 원하는 폰트 크기로 설정
  text-align: left; // 왼쪽 정렬
  margin-left: 0;
  margin-top: 1vh;
`;

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;

export const EditButton = styled(Link)`
  background-color: #ff914d;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
`;

export const FixedButton = styled.button`
  align-self: flex-end;
  padding: 10px 20px;
  background-color: #ff914d; // 버튼의 배경 색상입니다. 원하는 색으로 변경하세요.
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  // position: fixed; /* 또는 absolute; 상황에 따라 적절하게 선택 */
  margin-right: 1vw;
  margin-bottom: 2vh;
  &:hover {
    background-color: #ff7140; // 버튼 호버 시 내부 색상 변경
    border-color: #ff7140; // 버튼 호버 시 테두리 색상 변경
  }
`;
