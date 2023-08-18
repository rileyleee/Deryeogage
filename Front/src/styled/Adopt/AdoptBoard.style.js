import styled from "styled-components";

export const LoadingText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1; // 비디오 위에 위치하도록 함
  font-size: 3vw;
  color: white; // 글자 색은 원하는대로 변경 가능
`;

export const VideoContainer = styled.div`
  position: relative; // 이 줄을 추가합니다.
  /* border: 1px solid #ff914d; */
  border-radius: 30px;
  padding-top: 2vw;
  margin-top: 1.3vw;
  background-color: white;
  overflow: hidden; // 비디오가 컨테이너 밖으로 넘치지 않게 합니다.
  height: 32vw; // 이 줄을 추가합니다.
`;

export const BoardContainer = styled.div`
  border: 1px solid #ff914d;
  border-radius: 30px;
  margin-top: 1.3vw;
  background-color: white;
`;

export const TopBar = styled.div`
  position: relative; // TopBar를 relative로 설정
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 2vw;
`;

export const Button = styled.button`
  position: absolute;
  top: 50%; // 상위 요소의 중앙에서 시작
  right: 0.5vw; // 화면의 5% 만큼 오른쪽에서 떨어져 시작
  transform: translateY(-50%); // 자신의 높이의 50%만큼 위로 올려서 중앙 정렬
  border: none;
  background-color: #ff914d;
  padding: 0.5vw 1vw;
  border-radius: 20px;
  color: white;
  margin-right: 2.3vw;
  display: block;
  width: fit-content;
  cursor: pointer;
  &:hover {
    background-color: #ff7140; // 버튼 호버 시 내부 색상 변경
    border-color: #ff7140; // 버튼 호버 시 테두리 색상 변경
  }
`;

export const SelectInputBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%; 
  transform: translate(-50%, -50%);
  width: 32vw;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid #ff914d;
  padding: 0.2vw;
  z-index: 1000; // 다른 요소보다 위에 위치하기 위해 높은 값 지정
`;

export const InputBox = styled.input`
  width: 100%;
  border: none;

  &:focus {
    outline: none;
  }
`;

export const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.3vw;
  padding: 2vw;
  border-radius: 20px;
`;

export const BoardItem = styled.div`
  border-color: white;
  background-color: white;
`;

export const Media = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  // 애니메이션 효과 지정
  transition: transform 0.3s, filter 0.3s; // filter 추가

  // 마우스 호버 시 효과
  &:hover {
    transform: translateY(-10px); 
    filter: brightness(1.1); // 밝기를 120%로 증가
  }
`;

export const StyledPagination = styled.div`
  padding-top: 1.2vw;
  padding-bottom: 1.2vw;
  .pagination {
    display: flex;
    justify-content: center; // 중앙 정렬
    list-style-type: none;
    padding: 0;
  }

  .pagination li {
    margin: 0 0.3vw;
  }

  .pagination li a {
    text-decoration: none;
    color: #4a2511;
    padding: 0.5vw 1vw;
    transition: background-color 0.3s;
  }

  .pagination li a.activePageLink {
    color: #ff914d;
  }

  .pagination li a.active {
    background-color: #ff914d;
    color: white;
    border-radius: 30px;
  }

  .pagination li a:hover:not(.active) {
    background-color: #ddd;
  }
`;

export const Smallspacer = styled.div`
  margin: 1vw;
`;

export const RefreshButton = styled.button`
  /* background: url("/assets/chatimg/reload.png") no-repeat center; */
  /* background-size: cover; // 이미지를 버튼 크기에 맞게 조정 */
  border: none;
  width: fit-content;
  cursor: pointer;
  margin-left: 2.5vw; // 좌우 여백을 주어 S.InputBox와의 간격 조정
  background-color: #ff914d;
  padding: 0.5vw 1vw;
  border-radius: 20px;
  color: white;
  &:hover {
    background-color: #ff7140; // 버튼 호버 시 내부 색상 변경
    border-color: #ff7140; // 버튼 호버 시 테두리 색상 변경
  }
`;

export const DistanceLabel = styled.div`
  position: absolute;
  bottom: 1vw; // 상단에서부터의 간격입니다. 필요에 따라 조절하세요.
  right: 1vw; // 오른쪽에서부터의 간격입니다. 필요에 따라 조절하세요.
  background-color: rgba(
    0,
    0,
    0,
    0.5
  ); // 배경을 약간 어둡게 해서 텍스트가 잘 보이게 합니다.
  padding: 0.25vw 0.5vw; // 내부 간격입니다. 필요에 따라 조절하세요.
  border-radius: 5px; // 모서리를 둥글게 합니다.
  color: white; // 텍스트 색상입니다.
  font-size: 0.3vw;
  width: 4vw; // 너비 고정
  height: 1vw; // 높이 고정
  // 텍스트 가운데 정렬을 위한 Flexbox 속성
  display: flex;
  justify-content: center; // 가로 중앙 정렬
  align-items: center; // 세로 중앙 정렬
`;

export const DogStatus = styled.span`
  font-size: 1vw;
  position: absolute;
  color: white;
  top: 1vw; // 상단에서부터의 간격입니다. 필요에 따라 조절하세요.
  left: 1vw; // 오른쪽에서부터의 간격입니다. 필요에 따라 조절하세요.
  background-color: ${(props) => props.color || "green"};
  border-radius: 10px;
  z-index: 10;
  padding: 0.2vw 0.4vw;
`;