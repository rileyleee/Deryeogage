import styled from "styled-components";

export const MainContainer = styled.div`
  &.slide {
    max-width: 100vw;
    height: 90vh;
    overflow: auto;
    scroll-snap-type: y mandatory;
  }
  &.slide::-webkit-scrollbar-thumb {
  background-color: orange;
  border-radius: 5px;
}
  &.slide::-webkit-scrollbar {
    /* display: none; */
    /* background-color: white; */
    width: 5px;
    margin-left: 5vw;
  }
  &.slide::-webkit-scrollbar-track {
    background-color : white;
  }
`

export const HomeContainer = styled.div`
  scroll-snap-align: center;
  width: 100vw;
  height: 90vh;
  padding: 3vw;
  display: flex; /* Use flexbox to arrange the content */
  flex-direction: column; /* Arrange items vertically */
  position: relative; /* Set relative positioning for absolute elements */
  /* &.page3 {
    background-color: blue;
  } */
`;

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
  font-weight: bold;
`;

export const Main = styled.div`
  padding: 3vh 0;
  font-size: 4vw;
`;

export const Text = styled.div`
  padding-bottom: 1vh;
  font-size: 2vw;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column; /* Arrange items vertically */
  align-items: flex-start;
  margin-top: 2vh; /* Add spacing between the content and the header */
`;

export const Div = styled.div`
  margin: 1vh;
  padding-top: 2vh;
  font-size: 3vh;
`;

export const ImageWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 45vw;
`;

export const Image = styled.img`
  width: 30vw; /* Set the width to a fixed size */
`;

export const StyledLink = styled.a`
  text-decoration: none;
  font-size: 1.5vw;
  color: rgba(255, 145, 77, 1);
  margin: 1vw;
  font-weight: bold;
  cursor: pointer; /* Add cursor: pointer style */
  &:hover {
    color: #4A2511;
  }
`;

export const VideoContainer = styled.div`
  overflow: hidden; // 초과 부분은 숨김
  border-radius: 15px;
  width: 100%
  /* height: 70%; */
`

export const VideoContent = styled.video`
  position: relative;  // 위치를 조정하기 위해 relative 설정
  left: -5%; // 왼쪽으로 5%만큼 이동하여 양 옆을 동일하게 5%씩 잘라내기
  width: 110%; // 원래의 100% + 왼쪽 5% + 오른쪽 5% = 110%
  /* height: 95%; */
`
export const TextPtag = styled.p`
  font-size: 2vw;
  margin-bottom: 2vh;
`

export const ColumnContent = styled.div`
  height: 80vh;
`

export const MediaContainer = styled.div`
  margin-top: 5vh;
`

export const SurveyContainer = styled.video`
  border-radius: 20px;
  border: 2px dashed #FF914D;
`