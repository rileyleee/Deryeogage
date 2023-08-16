import styled from 'styled-components';

export const MainContainer = styled.div`
    max-width: 100vw;
    height: 89vh;
`

export const HomeContainer = styled.div`
  width: 100vw;
  height: 89vh;
  padding: 3vw;
  display: flex; /* Use flexbox to arrange the content */
  flex-direction: column; /* Arrange items vertically */
  position: relative; /* Set relative positioning for absolute elements */
`;

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
  font-weight: bold;
`;

export const Main = styled.div`
  padding: 3vh 0;
  font-size: 3vw;
`;

export const Text = styled.div`
  padding-bottom: 1vh;
  font-size: 1.5vw;;
  &.text {
    margin-bottom: 1.5vw;
  }
`;

export const RowWrap = styled.div`
  height: 60vh;
`

export const pTag = styled.p`
  height: ${props => (props.show ? '2vw' : '0')};
  font-size: 2vw;
  margin: ${props => (props.show ? '1vw' : '0')};
  text-align: center;
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.3s ease, height 0.3s ease, margin 0.3s ease;
`;



export const Name = styled.p`
  font-size: 1vw;
  &.purple {
    color: #9A5BFF;
  }
  &.green {
    color: #6B9C5A;
  }
  &.blue {
    color: #738BDD;
  }
`

export const Banner = styled.div`
  background-color: white;
`

export const ImgDiv = styled.div`
  position: relative;
  width: 13vw;  // 이미지의 실제 너비값
  height: 9.7vw; // 이미지의 실제 높이값
  overflow: hidden; // Add this line
`;

export const ImgBtn = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  
  &.adopt{
    background-image: url('/assets/adopt_btn.png');
  }
  &.simulation{
    background-image: url('/assets/simulation_btn.png');
  }
  &.survey{
    background-image: url('/assets/survey_btn.png');
  }
  &.checklist{
    background-image: url('/assets/pre-test_btn.png');
  }

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.7);
    color: black;
    border-radius: 5px;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.5)
    );
    transform: skewX(-25deg);
    opacity: 0;
    transition: left 0.7s ease, opacity 0.7s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover::after {
    left: 75%;
    opacity: 1;
  }
`;
