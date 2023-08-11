import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "../../styled/Adopt/AdoptBoard.style"
import { useNavigate } from "react-router-dom";
import NotLogin from "../../components/Adopt/NotLogin";
import NotSurvey from "../../components/Adopt/NotSurvey";
import LoginSurvey from "../../components/Adopt/LoginSurvey";
import DogListItem from "./../../components/Adopt/DogListItem";
import Pagination from "react-js-pagination";


function AdoptBoard() {
  const navigate = useNavigate();
  const [adoptData, setAdoptData] = useState([]);
  const [hasSurvey, setHasSurvey] = useState(false);

  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 8; // 한 페이지에 표시할 게시글 수

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

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

  const dogsArray = Array.isArray(adoptData) ? adoptData : [];

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dogsToShow = dogsArray.slice(startIndex, endIndex);



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
        <S.BoardGrid>
          {dogsToShow.map((dog) => (
            <S.Media>
              <DogListItem key={dog.id} dog={dog} media={dog.fileList[0]} />
            </S.Media>
          ))}
        </S.BoardGrid>
        <S.StyledPagination>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={dogsArray.length}
            pageRangeDisplayed={5} // 표시될 페이지 링크 수를 조정
            prevPageText={"<"} // "이전"을 나타낼 텍스트
            nextPageText={">"} // "다음"을 나타낼 텍스트
            hideFirstLastPages={true}
            // firstPageText={"처음"}
            // lastPageText={"마지막"}
            onChange={handlePageChange}
          />
        </S.StyledPagination>
{/* 
      <S.Largespacer></S.Largespacer> */}
    </div>
  );
}

export default AdoptBoard;
