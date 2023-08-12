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

  // 여기까지 검색

  const insertedToken = localStorage.getItem("accessToken");

  const onClick = () => {
    if (!insertedToken) {
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
  const dogsToShow = filteredDogs.slice(startIndex, endIndex);

  useEffect(() => {
    fetchDogs();
    checkSurvey();
  }, []);

  return (
    <div>
      <S.Smallspacer></S.Smallspacer>
      <h1>입양게시판</h1>
      {insertedToken && !hasSurvey ? <LoginSurvey /> : null}
      {insertedToken && hasSurvey ? <NotSurvey /> : null}
      {!insertedToken ? <NotLogin /> : null}

      <S.Button onClick={onClick}>글 작성</S.Button>

      <S.BoardContainer>
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

        <S.BoardGrid>
          {dogsToShow.map((dog) => (
            <S.Media key={dog.id}>
              <DogListItem dog={dog} media={dog.fileList[0]} />
            </S.Media>
          ))}
        </S.BoardGrid>
      </S.BoardContainer>
      <S.StyledPagination>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={filteredDogs.length}
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
