import styled from "styled-components";
import { Link } from "react-router-dom";
import { Link as BaseLink } from "react-router-dom";

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
  height: 500px;
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
    width: 720px; // 동영상 크기: 여기서는 안 먹고 인라인으로 작업 시에는 적용된다.(이미지는 여기서도 된다.)        
    height: 500px;         
    object-fit: cover;  
    object-position: center;    
    border-radius: 30px;
  }
`;

export const BoardBox = styled.div`
  font-size: 22px;
  text-align: left;
  line-height: 3;
  margin: 1vw 0;
  padding: 50px 20px 20px 40px;  
  border: none;
  border-radius: 30px;
  background-color: #FFF8E4;
  display: flex;
  flex-direction: column;
  height: 500px;
`;

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
  margin-right: 20px;
`;

export const Total= styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #FF914D;
  border-radius: 30px;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 7vh;
  background-color: white;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; // 컴포넌트를 중앙에 맞추려면 추가
`;


export const Status = styled.div`
  display: flex;
  align-items: flex-end; // 내부 아이템들을 바닥에 붙이기 위함
  margin-top: 2vh;
`;

export const TopButtons = styled.div`
  margin-top: 2vh;
  display: flex;
  justify-content: flex-end;
`;

// 찜하기 버튼 스타일
export const Button = styled.button`
  font-size: 20px;
  background-color: #ff914d;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  margin: 10px;
  border: none;
`;

export const StatusMessage = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 40px;
  color: #4A2511; // 원하는 색상을 사용
  text-align: left;
  margin: 10px;
  z-index: 1;
  font-weight: bold;
`;

export const StyledLink = styled(BaseLink)`
  text-decoration: none;
  color: inherit; // 부모 요소의 글자색을 상속
`;

export const PawBox = styled.div`
  padding: 2vh;
  border: none;
  border-radius: 30px;
  background-color: #FFF8E4;
  text-align: center;
  display: flex;
  align-items: center; /* SurveyPaw 컴포넌트들을 수직 방향으로 중앙 정렬 */
  flex-direction: column; /* SurveyPaw 컴포넌트들을 수직 방향으로 배치 */
  margin-right: 1vw;
  margin-top:1vh;
  height: auto;
`;

export const HealthInfoBox = styled.div`
  font-size: 18px;
  line-height: 1.5;
  border: none;
  padding: 2vh 40px;
  background-color: #FFF8E4;
  border-radius: 30px;
  margin-top:1vh;
  display: flex;
  flex-direction: column; // 수직 방향으로 내용을 정렬합니다.
  height: 180px;
`;

export const IntroductionBox = styled.div`
  font-size: 18px;
  line-height: 1.5;
  border: none;
  padding: 2vh 40px;
  background-color: #FFF8E4;
  border-radius: 30px;
  margin-top:3vh;
  display: flex;
  flex-direction: column; // 수직 방향으로 내용을 정렬합니다.
  height: 180px;
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


export const ProfileModal = styled.div`
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  transform: translate(-24%, 10%);  // X 축과 Y 축 모두 50%만큼 이동
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 10; // 다른 요소 위에 표시
  border-radius: 10px;
  width: 26 0px;
`;


export const DogTitle = styled.div`
  font-size: 22px;
  color: #FF914D; // 원하는 색상을 사용
  text-align: center;
  margin: 10px 0; // 상단 및 하단 여백 추가

`;

export const BoardTitle = styled.div`
  font-size: 30px;
  color: #4A2511; // 원하는 색상을 사용
  text-align: left;
  padding: 10px;
  margin-top: 70px;
  border-bottom: 1px solid #ff914d;  
`;

export const Profile = styled.div`
  cursor: pointer;
  font-size: large;
  display: flex;
  justify-content: space-between;
  align-items: center; // 수직 정렬을 중앙으로 지정 
`;

