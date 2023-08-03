import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NotLogin from "../../components/Adopt/NotLogin";
import NotSurvey from "../../components/Adopt/NotSurvey";
import LoginSurvey from "../../components/Adopt/LoginSurvey";
import DogListItem from "./../../components/Adopt/DogListItem";

function AdoptBoard() {
  const navigate = useNavigate();
  const [adoptData, setAdoptData] = useState([]);

  const insertedToken = localStorage.getItem("accessToken");
  const hasCompletedSurvey = localStorage.getItem("surveyData");

  useEffect(() => {
    const clickedPage = localStorage.getItem("clickedPage");
    if (insertedToken && clickedPage) {
      navigate(clickedPage);
      localStorage.removeItem("clickedPage");
    }
  }, [navigate, insertedToken]);

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
      const response = await axios.get(`${REACT_APP_API_URL}/boards/list`);
      console.log(response);
      setAdoptData(response.data.data); // Changed to match your data structure
    } catch (error) {
      console.error(error);
    }
  };

  const dogsArray = Array.isArray(adoptData) ? adoptData : [];

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <div>
      <h1>AdoptBoard</h1>
      {insertedToken && hasCompletedSurvey ? <LoginSurvey /> : null}
      {insertedToken && !hasCompletedSurvey ? <NotSurvey /> : null}
      {!insertedToken ? <NotLogin /> : null}

      <Button onClick={onClick}>글 작성하기</Button>

      {dogsArray.map((dog) => (
        <DogListItem key={dog.id} dog={dog} media={dog.fileList[0]} /> 
        // 'media' prop is added to pass the media url to DogListItem component.
      ))}
    </div>
  );
}

export default AdoptBoard;

export const Button = styled.button`
  border: none;
  background-color: #ff914d;
  padding: 0.5vw 1vw;
  border-radius: 30px;
  color: white;
  margin-top: 1vw;
  left: 50%;
  transform: translateX(-50%);
  position: relative;

  display: block;
  width: fit-content;
  cursor: pointer;
`;
