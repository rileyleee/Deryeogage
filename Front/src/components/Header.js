import "bootstrap/dist/css/bootstrap.min.css";
import * as S from "../styled/Header.style";
import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  SimulationExistAtom,
  SimulationNum,
} from "../recoil/SimulationAtom";
import { useNavigate } from "react-router-dom";

function Header() {
  // 토큰 유무에 따라 로그인 <-> 마이페이지 변경할 수 있게 쓸거임
  const insertedToken = localStorage.getItem("accessToken");
  const isLoggedIn = insertedToken !== null;
  // 새로 추가된 함수
  const checkUserCheckList = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    try {
      const response = await axios.get(`${REACT_APP_API_URL}/pretests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // 응답을 기반으로 체크리스트 제출 여부 판단
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
  }, []);
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
          } 
          else if (response.data.end === true) {
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
            const totalHpMinutes = Math.round(((hpHours - recoveryHours) * 60 + hpMinutes)/10)
            const totalRecoveryMinutes = recoveryHours * 6;
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
      }
    }
  }
  return (
    <S.HeaderWrapper className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img alt="Logo" src="/assets/Logo.png" width="40" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/adopt">
                입양게시판
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/checklist">
              체크리스트
              </a>
            </li>
            <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/simulations" onClick={(event) => {
                event.preventDefault();
                handleLinkClick(event, "/simulations");
            }}>
                시뮬레이션
            </a>
            </li>

            {isLoggedIn ? ( // 토큰이 있으면 마이페이지 버튼을 보여줌
              <li className="nav-item">
                <a className="nav-link" href="/profile">
                  마이페이지
                </a>
              </li>
            ) : (
              // 토큰이 없으면 로그인 버튼을 보여줌
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  로그인
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </S.HeaderWrapper>
  );
}

export default Header;
