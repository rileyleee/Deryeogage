import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "../../styled/Adopt/AdoptBoard.style";
import { useNavigate } from "react-router-dom";
import NotLogin from "../../components/Adopt/NotLogin";
import NotSurvey from "../../components/Adopt/NotSurvey";
import LoginSurvey from "../../components/Adopt/LoginSurvey";
import DogListItem from "./../../components/Adopt/DogListItem";
import Pagination from "react-js-pagination";
import ReactSelect from "react-select";
import { act } from "react-dom/test-utils";

function getColorForStatus(status) {
  switch (status) {
    case "depart":
      return "#ff914d";
    case "arrive":
      return "grey";
    case null:
      return "green";
    default:
      return "grey";
  }
}

function AdoptBoard() {
  // 초기 상태 설정: 세션 스토리지에서 값 가져오기
  const initialActivePage = Number(sessionStorage.getItem("activePage")) || 1;
  const initialSearchText = sessionStorage.getItem("searchText") || "";
  const initialSearchCategory =
    sessionStorage.getItem("searchCategory") || "title";

  const [activePage, setActivePage] = useState(initialActivePage);
  const [searchText, setSearchText] = useState(initialSearchText);
  const [searchCategory, setSearchCategory] = useState(initialSearchCategory);
  const itemsPerPage = 8; // 한 페이지에 표시할 게시글 수

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  // 페이지 번호 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    sessionStorage.setItem("activePage", pageNumber);
  };

  const navigate = useNavigate();
  const [adoptData, setAdoptData] = useState([]);
  const [hasSurvey, setHasSurvey] = useState(false);

  // 지역/거리 호버
  const [isHovered, setIsHovered] = useState(false);

  // 검색 기능
  const searchOptions = [
    { value: "title", label: "제목" },
    { value: "dogTypeCode", label: "견종" },
    { value: "regionCode", label: "지역" },
  ];

  // 검색 카테고리 및 검색 텍스트 변경 핸들러
  useEffect(() => {
    sessionStorage.setItem("searchCategory", searchCategory);
    sessionStorage.setItem("searchText", searchText);
  }, [searchCategory, searchText]);

  // 데이터 불러오기: 기존 useEffect에서 분리하여 페이지 및 검색 조건에 따라 호출
  useEffect(() => {
    //fetchDogs();
    checkSurvey();
  }, [activePage, searchCategory, searchText]);

  const filteredDogs = adoptData.filter((dog) => {
    return dog[searchCategory]
      ? dog[searchCategory].includes(searchText)
      : true;
  });

  const nonadoptedDogs = filteredDogs.filter((dog) => dog.status === null);
  const adoptedDogs = filteredDogs.filter((dog) => dog.status === "arrive");
  const beingadoptedDogs = filteredDogs.filter(
    (dog) => dog.status === "depart"
  );
  const combinedDogs = [...nonadoptedDogs, ...beingadoptedDogs, ...adoptedDogs];

  const insertedToken = localStorage.getItem("accessToken");

  const onClick = () => {
    if (!insertedToken) {
      localStorage.setItem("redirect", "/adopt/create");
      navigate("/login");
    } else {
      navigate("/adopt/create");
    }
  };

  const fetchDogs = async () => {
    setIsLoading(true); // 데이터를 불러오기 전에 로딩 상태를 true로 설정
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    const REACT_APP_TMAP_KEY = process.env.REACT_APP_TMAP_KEY;
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/boards/list`, {
        params: {
          page: activePage,
          per_page: itemsPerPage,
        },
      });
      //setAdoptData(response.data.data);

      //tmap
      const dogs = response.data.data;
      // Calculate distance for each dog
      const dogsWithDistance = await Promise.all(
        dogs.map(async (dog) => {
          try {
            const distanceResponse = await axios.get(
              `https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result&appKey=${REACT_APP_TMAP_KEY}`,
              {
                params: {
                  startX: localStorage.getItem("lon"), // Starting point (Seoul)
                  startY: localStorage.getItem("lat"),
                  endX: dog.lon, // Dog's lon
                  endY: dog.lat, // Dog's lat
                  reqCoordType: "WGS84GEO",
                  resCoordType: "WGS84GEO",
                },
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            );

            const distance =
              (
                distanceResponse.data.features[0].properties.totalDistance /
                1000
              ).toFixed(2) + "km";
            return { ...dog, distance };
          } catch (error) {
            console.error("Error fetching distance from TMAP:", error);
            return { ...dog, distance: "0km" }; // Set the distance to 0km if there's an error
          }
        })
      );
      setAdoptData(dogsWithDistance);

      //setAdoptData(response.data.data);
      // 세션 스토리지에 게시물 데이터 저장
      sessionStorage.setItem("adoptData", JSON.stringify(dogsWithDistance));
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false); // 데이터 불러오기가 끝나면 로딩 상태를 false로 설정
  };

  const handleRefreshClick = async () => {
    await fetchDogs();
  };

  const checkSurvey = async () => {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/surveys`, {
        headers: {
          Authorization: `Bearer ${insertedToken}`,
        },
      });
      if (response.data.length > 0) {
        setHasSurvey(true);
      }
    } catch (error) {
      setHasSurvey(true);
    }
  };

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dogsToShow = combinedDogs.slice(startIndex, endIndex);

  useEffect(() => {
    // 세션 스토리지에서 게시물 데이터 확인
    const storedAdoptData = sessionStorage.getItem("adoptData");

    if (storedAdoptData) {
      setAdoptData(JSON.parse(storedAdoptData));
    } else {
      fetchDogs();
    }

    checkSurvey();
  }, []);

  function handleDogClick(dog) {
    if (!insertedToken) {
      localStorage.setItem("redirect", `/adopt/${dog.id}`);
      navigate("/login");
    } else {
      navigate(`/adopt/${dog.id}`);
    }
  }

  return (
    <div>
      {insertedToken && !hasSurvey ? <LoginSurvey /> : null}
      {insertedToken && hasSurvey ? <NotSurvey /> : null}
      {!insertedToken ? <NotLogin /> : null}

      {isLoading ? (
        <S.VideoContainer>
          <video
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
              opacity: 0.5, // 50% 투명도 추가
            }}
            src="/assets/chatimg/dogs1.mp4"
            autoPlay
            loop
            muted
          ></video>
          <S.LoadingText>강아지들이 달려오고 있어요!!</S.LoadingText>
        </S.VideoContainer>
      ) : (
        <div>
          <S.BoardContainer>
            <S.TopBar>
              <S.SelectInputBox>
                <ReactSelect
                  name="category"
                  value={searchOptions.find(
                    (option) => option.value === searchCategory
                  )}
                  onChange={(option) => {
                    setSearchCategory(option.value);
                    setActivePage(1);
                    sessionStorage.setItem("activePage", activePage);
                    
                  }}
                  options={searchOptions}
                  styles={{
                    container: (provided) => ({
                      ...provided,
                      width: "120px",
                    }),
                    control: (provided) => ({
                      ...provided,
                      border: "none", // 경계선 제거
                      boxShadow: "none", // 그림자 제거
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? "#FFF7E7" : null, // 호버 시 색상 변경
                      color: "black",
                    }),
                  }}
                />
                <S.InputBox
                  type="text"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value)
                    setActivePage(1); // 페이지를 1로 초기화
                    sessionStorage.setItem("activePage", activePage);
                  }}
                />
              </S.SelectInputBox>

              <div>
                <S.RefreshButton onClick={handleRefreshClick}>새로고침</S.RefreshButton>
                <S.Button onClick={onClick}>글 작성</S.Button>
              </div>
            </S.TopBar>
            <S.BoardGrid>
              {dogsToShow.map((dog) => (
                <S.Media key={dog.id} onClick={() => handleDogClick(dog)}>
                  <DogListItem dog={dog} media={dog.fileList[0]} />
                  <S.DistanceLabel 
        onMouseEnter={() => setIsHovered(dog.id)} 
        onMouseLeave={() => setIsHovered(null)}>
          {isHovered === dog.id ? dog.distance : dog.regionCode}
      </S.DistanceLabel>
                  <S.DogStatus color={getColorForStatus(dog.status)}>
                    {dog.status === "depart"
                      ? "입양 중"
                      : dog.status === "arrive"
                      ? "입양 완료"
                      : dog.status === null
                      ? "입양 가능"
                      : "확인 중"}
                  </S.DogStatus>
                </S.Media>
              ))}
            </S.BoardGrid>
          </S.BoardContainer>
          <S.StyledPagination>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={combinedDogs.length}
              pageRangeDisplayed={5} // 표시될 페이지 링크 수를 조정
              prevPageText={"<"} // "이전"을 나타낼 텍스트
              nextPageText={">"} // "다음"을 나타낼 텍스트
              hideFirstLastPages={true}
              // firstPageText={"처음"}
              // lastPageText={"마지막"}
              onChange={handlePageChange}
              activeLinkClass="activePageLink"
            />
          </S.StyledPagination>
        </div>
      )}
    </div>
  );
}

export default AdoptBoard;

