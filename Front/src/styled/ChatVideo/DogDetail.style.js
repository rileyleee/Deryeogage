import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
display: flex;
flex-direction: column; // 세로 방향으로 아이템을 나열합니다.
justify-content: space-between; // 시작과 끝 사이에 최대 간격을 둡니다.
height: 100%; // 가능한 한 최대 높이를 사용합니다.
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

export const MediaBox = styled.div`
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
  background-color: white;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  margin-left: 1vw;
  margin-right: 1vw;
  word-wrap: break-word;
  white-space: normal;
  
  p {
    font-size: 12px; // 원하는 폰트 크기로 설정
  }
`;

export const DogInfo = styled.p`
  font-size: 12px; // 원하는 폰트 크기로 설정
  text-align: left; // 왼쪽 정렬
    margin-left: 0;

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

export const FixedButton = styled.button`
  align-self: flex-end; 
  padding: 10px 20px;
  background-color: #007BFF;  // 버튼의 배경 색상입니다. 원하는 색으로 변경하세요.
  color: #ffffff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  // position: fixed; /* 또는 absolute; 상황에 따라 적절하게 선택 */
  right: 10px;     /* 우측에서 10px 떨어진 위치 */
  bottom: 10px;    /* 하단에서 10px 떨어진 위치 */
  &:hover {
    background-color: #0056b3; // 호버 시의 배경 색상입니다.
  }
`;