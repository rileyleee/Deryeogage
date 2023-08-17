import styled from "styled-components";
import { Link } from "react-router-dom";
import { Link as BaseLink } from "react-router-dom";

export const Container = styled.div`
  margin-bottom: 1vw;
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
  margin-top: 0.6vw;
  background-color: #ff914d;
  color: white;
  padding: 0.6vw 1.2vw;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  &:hover {
    background-color: #ff7140; // 버튼 호버 시 내부 색상 변경
    border-color: #ff7140; // 버튼 호버 시 테두리 색상 변경
  }
`;

export const ImageSection = styled.div`
  display: flex;
`;

export const StretchedBox = styled.div`
  flex: 1; 
  display: flex;
  flex-direction: column;
`;

export const ImageBox = styled.div`
  width: auto;
  height: 30vw;
  overflow: hidden;
  margin: 1vw 0;
  border: none;
  border-radius: 30px;
  background-color: #FFF8E4;
  text-align: center;
  display: flex;
  align-items: center; 
  justify-content: center;
  flex-direction: column; 
  margin-right: 1vw;
`;

export const StyledMedia = styled.div`
  img, video {
    width: 46vw; // 동영상 크기: 여기서는 안 먹고 인라인으로 작업 시에는 적용된다.(이미지는 여기서도 된다.)        
    height: 32vw;         
    object-fit: cover;  
    object-position: center;    
    border-radius: 30px;
  }
`;

export const BoardBox = styled.div`
  font-size: 1.2rem;
  text-align: left;
  line-height: 3;
  margin: 1vw 0;
  padding: 3.2vw 1.3vw 1.3vw 2.6vw;  
  border: none;
  border-radius: 30px;
  background-color: #FFF8E4;
  display: flex;
  flex-direction: column;
  height: 30vw;
`;

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
  margin-right: 1.3vw;
`;

export const Total= styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #FF914D;
  border-radius: 30px;
  padding-left: 0.6vw;
  padding-right: 0.6vw;
  margin-top: 2vw;
  background-color: white;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; // 컴포넌트를 중앙에 맞추려면 추가
`;


export const Status = styled.div`
  display: flex;
  padding-left: 2vw;
  margin-top: 1vw;
`;

export const TopButtons = styled.div`
  margin-top: 1vw;
  display: flex;
  justify-content: flex-end;

`;

export const TopButtonsLeft = styled.div`
  margin-top: 1vw;
  display: flex;
  justify-content: flex-start;
  
`;

// 찜하기 버튼 스타일
export const Button = styled.button`
  font-size: 1.3rem;
  background-color: #ff914d;
  color: white;
  padding: 0.3vw 1vw;
  border-radius: 20px;
  text-decoration: none;
  cursor: pointer;
  margin: 0.6vw;
  border: none;
  &:hover {
    background-color: #ff7140; // 버튼 호버 시 내부 색상 변경
    border-color: #ff7140; // 버튼 호버 시 테두리 색상 변경
  }
`;

export const StatusMessage = styled.div`
  font-size: 1.5rem;
  color: #4A2511; // 원하는 색상을 사용
  z-index: 1;
`;

export const StyledLink = styled(BaseLink)`
  text-decoration: none;
  color: inherit; // 부모 요소의 글자색을 상속
`;

export const PawBox = styled.div`
  padding: 2vw 0;
  border: none;
  border-radius: 30px;
  background-color: #FFF8E4;
  text-align: center;
  display: flex;
  align-items: center; 
  flex-direction: column;
  margin-right: 1vw;
  margin-top: 0.5vw;

  @media (max-width: 100vw) { 
    padding: 1.5vw 0; // 패딩 크기 줄임
    font-size: 0.8rem; // 글자 크기 줄임
    margin-right: 0.5vw;
    margin-top: 0.2vw;
  }
`;

export const HealthInfoBox = styled.div`
  font-size: 1.1rem;
  line-height: 1.5;
  border: none;
  padding: 3vh 2.6vw;
  background-color: #FFF8E4;
  border-radius: 30px;
  display: flex;
  flex-direction: column; // 수직 방향으로 내용을 정렬합니다.
  height: 12vw;
  overflow: auto; // 여기에 추가합니다.
  word-wrap: break-word;
`;

export const IntroductionBox = styled.div`
  font-size: 1.1rem;
  line-height: 1.5;
  border: none;
  padding: 3vh 2.6vw;
  background-color: #FFF8E4;
  border-radius: 30px;
  display: flex;
  flex-direction: column; // 수직 방향으로 내용을 정렬합니다.
  height: 12vw;
  overflow: auto; // 여기에 추가합니다.
  word-wrap: break-word;
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
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 1.3vw;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;


export const ProfileModal = styled.div`
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  transform: translate(-24%, 10%);  // X 축과 Y 축 모두 50%만큼 이동
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 0.6vw;
  z-index: 10; // 다른 요소 위에 표시
  border-radius: 10px;
  width: 17vw;
`;


export const DogTitle = styled.div`
  font-size: 1.2rem;
  color: #FF914D; // 원하는 색상을 사용
  text-align: center;
  margin: 0.5vw 0; // 상단 및 하단 여백 추가

`;
export const ResultPawText = styled.div`
  margin: 1vw 0; // 상단 및 하단 여백 추가
`;

export const BoardTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #4A2511; // 원하는 색상을 사용
  text-align: left;
  padding: 0.3vw;
  margin-top: 2vw;
  border-bottom: 1px solid #ff914d;  
`;

export const Profile = styled.div`
  cursor: pointer;
  font-size: large;
  display: flex;
  justify-content: space-between;
  align-items: center; // 수직 정렬을 중앙으로 지정 
  margin-top: 0.8vw;
`;

