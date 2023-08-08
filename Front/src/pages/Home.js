import React, {  useState, useEffect } from 'react';
import axios from "axios";
import styled from "styled-components";
import { PiPawPrintFill } from "react-icons/pi";
import { useRecoilState } from "recoil";
import {
  SimulationExistAtom,
  SimulationNum,
} from "../recoil/SimulationAtom";
import { useNavigate } from "react-router-dom";

function Home() {
  const [existValue, setExistValue] = useRecoilState(SimulationExistAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (existValue !== null) {
      console.log(existValue)
      localStorage.setItem('petType', existValue.petType)
        localStorage.setItem('background', existValue.background)
        localStorage.setItem('cost', existValue.cost)
        localStorage.setItem('petName', existValue.petName)
        localStorage.setItem('end', existValue.end)
        localStorage.setItem('endCheck', existValue.endCheck)
        localStorage.setItem('endTime', existValue.endTime)
        localStorage.setItem('id', existValue.id)
        localStorage.setItem('lastTime', existValue.lastTime)
        localStorage.setItem('quizNum', existValue.quizNum)
        localStorage.setItem('requirement', existValue.requirement)
        localStorage.setItem('startTime', existValue.startTime)
        localStorage.setItem('title', existValue.title)
        localStorage.setItem('train', existValue.train)
        localStorage.setItem('user', existValue.user)
        localStorage.setItem('hpPercentage', existValue.health)
    }
  }, [existValue]);
  const handleLinkClick = async (event, page) => {
    event.preventDefault();
    // 로그인 여부를 확인하여 이동할 페이지 결정
    if (localStorage.getItem("accessToken")) {
      // 로그인되어 있는 경우 해당 페이지로 이동
      const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
      if (page === "/simulations") {
        try {
          const url = `${REACT_APP_API_URL}/simulations`;
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(url, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          const now = new Date()
          const currentHours = now.getHours()
          const currentMinutes = now.getMinutes()
          console.log(currentHours)
          if (currentHours >= 0 && currentHours < 8) {
            navigate("/nosimulations"); // NoSimulation 페이지로 이동
          } else if (response.data.end === "true") {
            navigate("/simulations/end")
          }
          else {
          if (response.data === "Start a new simulation") {
            localStorage.setItem("activatedNum", 1);
            localStorage.setItem('hpPercentage', 100);
            localStorage.setItem('timeDifference', JSON.stringify({ // 객체 데이터 등록할 때 무조건 stringify 활용
              hours:0,
              minutes:0
            }));
          } else {
            setExistValue(response.data); // SET하자마자 담기지 않아서 response.data로 해줌
            console.log(existValue)
            console.log(response.data)
            localStorage.setItem("activatedNum", 5);

            const startTimeHours = Number(response.data.startTime.substr(11, 2));
            const startTimeMinutes = Number(response.data.startTime.substr(14, 2));
            const lastTimeHours = Number(response.data.lastTime.substr(11, 2));
            const lastTimeMinutes = Number(response.data.lastTime.substr(14, 2));
            
            let diffHours = lastTimeHours - startTimeHours;
            let diffMinutes = lastTimeMinutes - startTimeMinutes;
            
            if (diffMinutes < 0) {
              diffHours--;
              diffMinutes += 60;
            }

            if (diffHours < 0) {
              diffHours += 24;
            }
            // // 게임에 접속하지 않는동안 체력을 닳게 하기 위해
            // 게임 접속하지 않은 시간 계산 결과
            let hpHours = currentHours - lastTimeHours
            let hpMinutes = currentMinutes - lastTimeMinutes
            if (hpMinutes < 0) {
              hpHours--;
              hpMinutes += 60;
            }

            if (hpHours < 0) {
              hpHours += 24;
            }
            // 
            let Hours = diffHours + hpHours
            let Minutes = diffMinutes + hpMinutes
            if (Minutes >= 60) {
              Hours += 1
              Minutes -= 60
            }
            // 오전 12시 ~ 오전 8시 사이의 시간을 계산
            let recoveryHours = 0;
            for (let hour = lastTimeHours; hour !== currentHours; hour = (hour + 1) % 24) {
                if (hour >= 0 && hour < 8) recoveryHours++;
            }

            // 체력 회복 및 감소 계산
            const totalHpMinutes = (hpHours - recoveryHours) * 60 + hpMinutes;
            const totalRecoveryMinutes = recoveryHours * 60;
            setExistValue(prevState => ({
              ...prevState,
              health: Math.min(
                100,
                Math.max(
                  0,
                  prevState.health - totalHpMinutes + totalRecoveryMinutes
                )
              ),
            }));
            
            console.log(hpHours, hpMinutes)
            localStorage.setItem('timeDifference', JSON.stringify({
              hours: Hours,
              minutes: Minutes
            }));
          }
          navigate("/simulations");
        }
        } catch (error) {
          console.log(error);
        }
      } else if (page === "/checklist") {
        // 체크리스트 페이지를 선택한 경우
        try {
          const url = `${REACT_APP_API_URL}/pretests`;
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(url, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          console.log(response.data);
          if (response.data.status === "success") {
            console.log(response.data.message);
            window.location.href = "/checklist/result";
          }
        } catch (error) {
          if (
            error.response.data.data ===
            "사전 테스트 결과 정보가 존재하지 않습니다."
          ) {
            console.log("체크리스트 확인 오류", error.response.data.message);
            window.location.href = "/checklist";
          }
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
  // 이 부분에 useEffect를 추가합니다.  그래야 업데이트가 잘된다.
  useEffect(() => {
    console.log(existValue);
  }, [existValue]);

  // 컴포넌트가 렌더링될 때에 로그인 후에 이동할 페이지를 처리
  React.useEffect(() => {
    const clickedPage = localStorage.getItem("clickedPage");
    if (localStorage.getItem("accessToken") && clickedPage) {
      navigate(clickedPage);
      localStorage.removeItem("clickedPage"); // 이동한 페이지 정보를 삭제
    }
  }, [navigate]);







  //준 위치/날씨, 동 위치
  //날씨
   // 상태 변수 정의
   const [state, setState] = useState({
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    humidity: 0,
    desc: '',
    icon: '',
    loading: true,
    lat: null, // 위도
    lon: null, // 경도
  });

  // 컴포넌트 생성 후 날씨 정보 조회
  useEffect(() => {
    // 위에서 만든 상태 변수에 값을 전달
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    // 사용자의 위치를 기반으로 날씨 정보를 가져오는 함수
    const getWeather = (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiKey = process.env.REACT_APP_WEATHER_KEY;
      const lang = 'kr'; // 한국어 설정
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lang}`;

      axios
        .get(url)
        .then((responseData) => {
          const data = responseData.data;
          setState({
            temp: data.main.temp,
            temp_max: data.main.temp_max,
            temp_min: data.main.temp_min,
            humidity: data.main.humidity,
            desc: data.weather[0].description,
            icon: data.weather[0].icon,
            loading: false,
            lat: lat,
            lon:lon,
          });
        })
        .catch((error) => console.log(error));
    };

    getLocation();
  }, []);

  const imgSrc = `https://openweathermap.org/img/wn/${state.icon}@2x.png`;
  
  localStorage.setItem('humidity', state.desc);
  localStorage.setItem('imgSrc', imgSrc);
  localStorage.setItem('lat', state.lat);
  localStorage.setItem('lon', state.lon);







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
