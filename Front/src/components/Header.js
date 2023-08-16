import "bootstrap/dist/css/bootstrap.min.css";
import * as S from "../styled/Header.style";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { SimulationExistAtom } from "../recoil/SimulationAtom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const { pathname } = location;
  // 토큰 유무에 따라 로그인 <-> 마이페이지 변경할 수 있게 쓸거임
  const insertedToken = localStorage.getItem("accessToken");
  const isLoggedIn = insertedToken !== null;
  // 새로 추가된 함수

  const cilckSurvey = useCallback(async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      // token이 없으면 localStorage에 redirect 경로를 저장하고 로그인 페이지로 리다이렉트합니다.
      localStorage.setItem("redirect", "/survey");
      window.location.href = "/login?redirect=/survey";
      return;
    }window.location.href = "/survey";
  }, []);


  const checkUserCheckList = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    if (!token) {
      // token이 없으면 localStorage에 redirect 경로를 저장하고 로그인 페이지로 리다이렉트합니다.
      localStorage.setItem("redirect", "/checklist");
      window.location.href = "/login?redirect=/checklist";
      return;
    }


    try {
      const response = await axios.get(`${REACT_APP_API_URL}/pretests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === "success") {
        console.log(response.data.message);
        window.location.href = "/checklist/result";
      } else {
        navigate("/checklist");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data.data ===
          "사전 테스트 결과 정보가 존재하지 않습니다."
      ) {
        console.log("체크리스트 확인 오류", error.response.data.message);
        window.location.href = "/checklist";
      } else {
        console.error("Unexpected error", error);
      }
    }
  }, []);

  const [existValue, setExistValue] = useRecoilState(SimulationExistAtom);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (existValue !== null) {
      console.log(existValue);
      localStorage.setItem("petType", existValue.petType);
      localStorage.setItem("background", existValue.background);
      localStorage.setItem("cost", existValue.cost);
      localStorage.setItem("petName", existValue.petName);
      localStorage.setItem("end", existValue.end);
      localStorage.setItem("endCheck", existValue.endCheck);
      localStorage.setItem("endTime", existValue.endTime);
      localStorage.setItem("id", existValue.id);
      localStorage.setItem("lastTime", existValue.lastTime);
      localStorage.setItem("quizNum", existValue.quizNum);
      localStorage.setItem("requirement", existValue.requirement);
      localStorage.setItem("startTime", existValue.startTime);
      localStorage.setItem("title", existValue.title);
      localStorage.setItem("train", existValue.train);
      localStorage.setItem("user", existValue.user);
      localStorage.setItem("hpPercentage", existValue.health);
    }
  }, []);

  const handleLinkClick = async (event, page) => {
    if (event) event.preventDefault();
    // 로그인 여부를 확인하여 이동할 페이지 결정
    if (localStorage.getItem("accessToken")) {
      // 로그인되어 있는 경우 해당 페이지로 이동
      const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
      if (page === "/simulations") {
        localStorage.setItem("afterLoginPage", page);
      } else {
        navigate(page);
      }
      if (page === "/simulations") {
        setLoading(true); // 로딩 시작
        try {
          const url = `${REACT_APP_API_URL}/simulations`;
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(url, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          const now = new Date();
          const currentHours = now.getHours();
          const currentMinutes = now.getMinutes();
          const simulationData = response.data;
          console.log(simulationData);
          if (currentHours >= 0 && currentHours < 8) {
            navigate("/nosimulations"); // NoSimulation 페이지로 이동
          } else if (response.data.end === true) {
            navigate("/simulations/end");
          } else {
            if (response.data === "Start a new simulation") {
              localStorage.setItem("activatedNum", 1);
              localStorage.setItem("hpPercentage", 100);
              localStorage.setItem(
                "timeDifference",
                JSON.stringify({
                  // 객체 데이터 등록할 때 무조건 stringify 활용
                  hours: 0,
                  minutes: 0,
                })
              );
            } else {
              setExistValue(simulationData); // SET하자마자 담기지 않아서 response.data로 해줌
              localStorage.setItem("activatedNum", 5);
              console.log(existValue);

              const startTimeHours = Number(
                simulationData.startTime.substr(11, 2)
              ); // 시작 시간
              const startTimeMinutes = Number(
                simulationData.startTime.substr(14, 2)
              ); // 시작 분
              const lastTimeHours = Number(
                simulationData.lastTime.substr(11, 2)
              ); // 최근 접속 시간
              const lastTimeMinutes = Number(
                simulationData.lastTime.substr(14, 2)
              ); // 최근 접속 분

              let diffHours = lastTimeHours - startTimeHours; // 게임을 진행한 시간의 시간
              let diffMinutes = lastTimeMinutes - startTimeMinutes; // 게임을 진행한 시간의 분

              if (diffMinutes < 0) {
                // 분이 0보다 작으면 시간을 1 빼고 분에 60분 더해
                diffHours--;
                diffMinutes += 60;
              }

              if (diffHours < 0) {
                // 시간이 0보다 작으면 시간에 24시 더해
                diffHours += 24;
              }
              // // 게임에 접속하지 않는동안 체력을 닳게 하기 위해
              // 게임 접속하지 않은 시간 계산 결과
              let hpHours = currentHours - lastTimeHours; // 게임을 접속하지 않은 시간의 시간만큼 hp를 줄여야 돼
              let hpMinutes = currentMinutes - lastTimeMinutes; // 게임을 접속하지 않은 시간의 분만큼 hp를 줄여야 돼
              if (hpMinutes < 0) {
                hpHours--;
                hpMinutes += 60;
              }

              if (hpHours < 0) {
                hpHours += 24;
              }
              //
              let Hours = diffHours + hpHours; // 게임을 시작한 이후로 지난 시간의 시간
              let Minutes = diffMinutes + hpMinutes; // 게임을 시작안 이후로 지난 시간의 분
              console.log(Hours, Minutes);
              if (Minutes >= 60) {
                Hours += 1;
                Minutes -= 60;
              }
              // 오전 12시 ~ 오전 8시 사이의 시간을 계산
              let recoveryHours = 0;
              for (
                let hour = lastTimeHours;
                hour !== currentHours;
                hour = (hour + 1) % 24
              ) {
                if (hour >= 0 && hour < 8) recoveryHours++;
              }

              // 체력 회복 및 감소 계산
              const totalHpMinutes = Math.round(
                ((hpHours - recoveryHours) * 60 + hpMinutes) / 10
              );
              const totalRecoveryMinutes = recoveryHours * 6;
              setExistValue((prevState) => ({
                ...prevState,
                health: Math.min(
                  100,
                  Math.max(
                    0,
                    prevState.health - totalHpMinutes + totalRecoveryMinutes
                  )
                ),
              }));

              localStorage.setItem(
                "timeDifference",
                JSON.stringify({
                  hours: Hours,
                  minutes: Minutes,
                })
              );
            }
            navigate("/simulations");
          }
        } catch (error) {
          console.log(error);
        }
        setLoading(false); // 로딩 완료
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
    if (localStorage.getItem("accessToken")) {
      const clickedPage = localStorage.getItem("clickedPage");
      const afterLoginPage = localStorage.getItem("afterLoginPage");

      if (clickedPage || afterLoginPage) {
        if (!isLoading) {
          // 시뮬레이션 페이지로 이동하려는 경우, handleLinkClick 함수를 호출합니다.
          handleLinkClick(null, clickedPage || afterLoginPage);
        }
      }

      localStorage.removeItem("clickedPage");
      localStorage.removeItem("afterLoginPage");
    }
  }, [navigate, isLoading]);

  // 이 부분에 useEffect를 추가합니다.  그래야 업데이트가 잘된다.
  useEffect(() => {
    console.log(existValue);
  }, [existValue]);
  
  const [adoptdata, setAdoptData] = useState(null);
  const [postcostdata, setpostcostdata] = useState(null);  
  console.log(adoptdata)
  console.log(postcostdata)
  const [dogToHome, setDogToHome] = useState('start')
  console.log(dogToHome)
  const fetchAdopts = async () => {
    const token = localStorage.getItem("accessToken");
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    try {
      const response = await axios.get(`${REACT_APP_API_URL}/adopts/to`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("adopt/to 값 +++++++++++++++++++++++ ", response);

      const boardResponse = await axios.get(
        `${REACT_APP_API_URL}/boards/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("====================adoptTo:", response.data.data)

      setAdoptData(response.data.data);
    } catch (error) {
      console.error("An error occurred while fetching the data:", error);
    }
  };
  useEffect(() => { // 분양 내역 get
    const getPostCost = async () => {
      const token = localStorage.getItem("accessToken");
      const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

      try {
        const response = await axios.get(`${REACT_APP_API_URL}/postcosts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("입양 내역: ",response);
        setpostcostdata(response.data.data)
      } catch (error) {
        console.error("An error occurred while fetching the data:", error);
      }
    };

    getPostCost();
  }, []);
  
  
  // 입양 데이터
  const AdoptDataComponent = (adoptdata, postcostdata) => {
    // Step 2: Status 값을 가져오는 함수 작성
    if (postcostdata !== null && adoptdata !== null) {
      for (let i=0; i < postcostdata.length; i++) {
        if (postcostdata[i].returnYn === null) {
          return adoptdata[i].status;
        }
      }
    }
  }
  
  useEffect(() => {
    fetchAdopts();
  }, []);

  useEffect(() => {
    setDogToHome(AdoptDataComponent(adoptdata, postcostdata))
  }, [adoptdata, postcostdata]);
  console.log(AdoptDataComponent(adoptdata, postcostdata))
  return (
    <S.HeaderWrapper className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img alt="Logo" src="/assets/Logo.png" height="50vh" />
        </a>
        <S.DogImg src={dogToHome ? `/assets/adopt/${dogToHome}.png` : `/assets/adopt/start.png`} alt="adopt" height="50vh" />
        <S.ButtonWrapper
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </S.ButtonWrapper>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <img src="/assets/adopt/start.png" alt="adopt" />
            </li> */}
            <li className="nav-item">
              <S.Navlink
                active={pathname.startsWith("/adopt")}
                aria-current="page"
                href="/adopt"
              >
                입양게시판
              </S.Navlink>
            </li>
            <li className="nav-item">
              <S.Navlink
                active={pathname === "/survey"}
                aria-current="page"
                href="/survey"
                onClick={(event) => {
                  event.preventDefault();
                  cilckSurvey(event);
                }}
              >
                선호도조사
              </S.Navlink>
            </li>
            <li className="nav-item">
              <S.Navlink
                active={
                  pathname === "/checklist" || pathname === "/checklist/result"
                }
                aria-current="page"
                href="/checklist"
                onClick={(event) => {
                  event.preventDefault();
                  checkUserCheckList(event);
                }}
              >
                사전테스트
              </S.Navlink>
            </li>
            <li className="nav-item">
              <S.Navlink
                active={
                  pathname === "/simulations" ||
                  pathname === "/simulations/end" ||
                  pathname === "/nosimulations"
                }
                aria-current="page"
                href="/simulations"
                onClick={(event) => {
                  event.preventDefault();
                  handleLinkClick(event, "/simulations");
                }}
              >
                시뮬레이션
              </S.Navlink>
            </li>

            {isLoggedIn ? (
              <li className="nav-item">
                <S.Navlink
                  active={pathname === "/profile"}
                  href="/profile"
                >
                  마이페이지
                </S.Navlink>
              </li>
            ) : (
              <li className="nav-item">
                <S.Navlink
                  active={pathname === "/login"}
                  href="/login"
                >
                  로그인
                </S.Navlink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </S.HeaderWrapper>
  );
}

export default Header;
