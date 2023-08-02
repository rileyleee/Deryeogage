import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { PiPawPrintFill } from "react-icons/pi";
import { useRecoilState } from "recoil";
import {
  SimulationExistAtom,
  SimulationStartAtom,
  SimulationNum,
} from "../recoil/SimulationAtom";
import { useNavigate } from "react-router-dom";

function Home() {
  const [existValue, setExistValue] = useRecoilState(SimulationExistAtom);
  const navigate = useNavigate();

  const handleLinkClick = async (event, page) => {
    event.preventDefault();

    // 로그인 여부를 확인하여 이동할 페이지 결정
    if (localStorage.getItem("accessToken")) {
      // 로그인되어 있는 경우 해당 페이지로 이동
      const REACT_APP_API_URL = process.env.REACT_APP_API_URL
      if (page === "/simulations") {
        try {
          const url = `${REACT_APP_API_URL}/simulations`;
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(url, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          console.log(response.data);
          if (response.data !== "Start a new simulation") {
            setExistValue(response.data);
            localStorage.setItem("activatedNum", 5);
          } else {
            localStorage.setItem("activatedNum", 1);
          }
          navigate("/simulations");
        } catch (error) {
          console.log(error);
        }
      } else {
        navigate(page);
      }
    } else {
      // 로그인되어 있지 않은 경우 로그인 페이지로 이동
      navigate("/login");
      // 로그인 후에 이동할 페이지 정보를 로컬 스토리지에 저장
      localStorage.setItem("clickedPage", page);
    }
  };

  // 컴포넌트가 렌더링될 때에 로그인 후에 이동할 페이지를 처리
  React.useEffect(() => {
    const clickedPage = localStorage.getItem("clickedPage");
    if (localStorage.getItem("accessToken") && clickedPage) {
      navigate(clickedPage);
      localStorage.removeItem("clickedPage"); // 이동한 페이지 정보를 삭제
    }
  }, [navigate]);

  return (
    <HomeContainer>
      <Main>
        <Span>데려가개</Span>
      </Main>
      <Text>
        데려가개는 강아지들의 <Span>행복한 미래</Span>를 최우선으로 성숙한
        반려문화를 도모합니다. <br />
      </Text>
      <Text>
        소중한 생명인 강아지와 오랜시간 함께할 <Span>인연</Span>을 만듭니다.
      </Text>
      <ContentContainer>
        <Div>
          <p>시뮬레이션을 통해 가상으로 강아지를 키워보세요!</p>
          <StyledLink
            onClick={(event) => handleLinkClick(event, "/simulations")}
          >
            <PiPawPrintFill /> 시뮬레이션하러 가기
          </StyledLink>
        </Div>
        <Div>
          <p>선호도 조사를 통해 나의 생활에 맞는 강아지를 찾아보세요!</p>
          <StyledLink onClick={(event) => handleLinkClick(event, "/survey")}>
            <PiPawPrintFill /> 선호도 조사하러 가기
          </StyledLink>
        </Div>
        <Div>
          <p>
            입양 전 사전테스트를 통해 강아지를 키울 준비가 되었는지
            확인해보세요!
          </p>
          <StyledLink onClick={(event) => handleLinkClick(event, "/checklist")}>
            <PiPawPrintFill /> 입양 전 사전테스트하러 가기
          </StyledLink>
        </Div>
      </ContentContainer>
      <ImageWrapper>
        <Image src="assets/main.png" />
      </ImageWrapper>
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  max-width: 1200px;
  height: 88vh;
  margin: 0 auto;
  padding: 20px;
  display: flex; /* Use flexbox to arrange the content */
  flex-direction: column; /* Arrange items vertically */
  position: relative; /* Set relative positioning for absolute elements */
`;

const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;

const Main = styled.div`
  padding-top: 20px;
  padding-bottom: 30px;
  font-size: 5vh;
`;

const Text = styled.div`
  padding-bottom: 10px;
  font-size: 3vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column; /* Arrange items vertically */
  align-items: flex-start;
  margin-top: 10vh; /* Add spacing between the content and the header */
`;

const Div = styled.div`
  margin: 10px;
  padding-top: 20px;
  font-size: 2.2vh;
`;

const ImageWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  right: 20px;
`;

const Image = styled.img`
  width: 500px; /* Set the width to a fixed size */
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: rgba(255, 145, 77, 1);
  margin: 1vw;
  cursor: pointer; /* Add cursor: pointer style */
`;
