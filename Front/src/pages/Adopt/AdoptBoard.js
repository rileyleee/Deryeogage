import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "../../styled/Adopt/AdoptBoard.style";
import { useNavigate } from "react-router-dom";
import NotLogin from "../../components/Adopt/NotLogin";
import NotSurvey from "../../components/Adopt/NotSurvey";
import LoginSurvey from "../../components/Adopt/LoginSurvey";
import DogListItem from "./../../components/Adopt/DogListItem";
import Pagination from "react-js-pagination";
import ReactSelect from 'react-select';


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
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 8; // 한 페이지에 표시할 게시글 수

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const navigate = useNavigate();
  const [adoptData, setAdoptData] = useState([]);
  const [hasSurvey, setHasSurvey] = useState(false);

  // 검색 기능
  const searchOptions = [
    { value: 'title', label: '제목' },
    { value: 'dogTypeCode', label: '견종' },
    { value: 'regionCode', label: '지역' },
  ];

  const [searchText, setSearchText] = useState("");

  // 검색 카테고리 상태
  const [searchCategory, setSearchCategory] = useState("title");

  const filteredDogs = adoptData.filter((dog) => {
    return dog[searchCategory] ? dog[searchCategory].includes(searchText) : true;
  });


  // 랜덤 적용
  const randomizeArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // 순서 섞기
    }
    return arr;
  };

  const nonadoptedDogs = filteredDogs.filter(dog => dog.status === null);
  const adoptedDogs = filteredDogs.filter(dog => dog.status === "arrive");
  const beingadoptedDogs = filteredDogs.filter(dog => dog.status === "depart");

  const randomizedNonadoptedDogs = randomizeArray([...nonadoptedDogs]);
  const combinedDogs = [...randomizedNonadoptedDogs, ...beingadoptedDogs, ...adoptedDogs];



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
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/boards/list`, {
        params: {
          page: activePage, // 활성 페이지를 매개변수로 전달합니다
          per_page: itemsPerPage, // 페이지 당 아이템 수를 매개변수로 전달합니다
        },
      });
      setAdoptData(response.data.data);
    } catch (error) {
      console.error(error);
    }
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
    fetchDogs();
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
      <S.Smallspacer></S.Smallspacer>
      <h1>입양게시판</h1>
      {insertedToken && !hasSurvey ? <LoginSurvey /> : null}
      {insertedToken && hasSurvey ? <NotSurvey /> : null}
      {!insertedToken ? <NotLogin /> : null}

      {/* <S.Button onClick={onClick}>글 작성</S.Button> */}

      <S.BoardContainer>
        <S.TopBar>
          <S.SearchContainer>
            <S.SelectInputBox>
              <ReactSelect
                name="category"
                value={searchOptions.find(option => option.value === searchCategory)}
                onChange={option => {
                  setSearchCategory(option.value);
                }}
                options={searchOptions}
                styles={{
                  container: (provided) => ({
                    ...provided,
                    width: '120px'
                  }),
                  control: (provided) => ({
                    ...provided,
                    border: 'none',        // 경계선 제거
                    boxShadow: 'none'      // 그림자 제거
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? '#FFF7E7' : null, // 호버 시 색상 변경
                    color: 'black',
                  }),
                }}
              />
              <S.InputBox
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </S.SelectInputBox>
          </S.SearchContainer>
          <S.Button onClick={onClick}>글 작성</S.Button>
        </S.TopBar>
        <S.BoardGrid>
          {dogsToShow.map((dog) => (
            <S.Media key={dog.id} onClick={() => handleDogClick(dog)}>
              <DogListItem dog={dog} media={dog.fileList[0]} />
              <S.DogStatus color={getColorForStatus(dog.status)}>
                {dog.status === "depart" ? "입양 중" :
                  dog.status === "arrive" ? "입양 완료" :
                    dog.status === null ? "입양 가능" : "확인 중"}
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
        />
      </S.StyledPagination>
    </div>
  );
}

export default AdoptBoard;
