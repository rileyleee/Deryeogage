
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
        window.location.href = "/checklist";
      } else {
        console.error("Unexpected error", error);
      }
    }
  }, []);

  const navigate = useNavigate();
  const [adoptdata, setAdoptData] = useState(null);
  const [postcostdata, setpostcostdata] = useState(null);  
  const [dogToHome, setDogToHome] = useState('start')

  const fetchAdopts = async () => {
    const token = localStorage.getItem("accessToken");
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    try {
      const response = await axios.get(`${REACT_APP_API_URL}/adopts/to`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const boardResponse = await axios.get(
        `${REACT_APP_API_URL}/boards/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
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
  
  return (
    <S.HeaderWrapper className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <S.DogImg alt="Logo" src={dogToHome ? `/assets/${dogToHome}.png` : `/assets/start.png`} height="50vh" />
        </a>
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
            {/* <li className="nav-item">
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
            </li> */}

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
