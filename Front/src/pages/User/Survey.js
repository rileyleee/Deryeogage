import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SurveyPaw from "../../components/SurveyPaw";
import * as S from "../../styled/User/Survey.style";
import axios from "axios";
import Modal from "react-modal"; // import react-modal
import { Span } from "../../styled/SurveyPaw.style";

Modal.setAppElement("#root");

function Survey() {
  const navigate = useNavigate();

  const [ranking, setRanking] = useState([0, 1, 2, 3, 4]);
  const [friendly, setFriendly] = useState(0);
  const [activity, setActivity] = useState(0);
  const [dependency, setDependency] = useState(0);
  const [bark, setBark] = useState(0);
  const [hair, setHair] = useState(0);
  const [surveyData, setSurveyData] = useState(null); // surveyData 상태를 추가합니다.
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const token = localStorage.getItem("accessToken");

  const titles = ["친화력", "활동량", "의존성", "왈왈왈", "털빠짐"];
  const egtitles = ["friendly", "activity", "dependency", "bark", "hair"];
  const selectors = [setFriendly, setActivity, setDependency, setBark, setHair];

  // axios get 요청
  useEffect(() => {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    axios
      .get(`${REACT_APP_API_URL}/surveys`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.data) {
          console.log("수정하기로 바뀜");
          console.log(response.data.data);
          const surveyData = response.data.data;
          setSurveyData(surveyData); // 응답 데이터를 상태로 저장합니다.
          console.log(surveyData);
          setHasSubmitted(true);
          setRanking(
            surveyData.ranking.split("").map((num) => parseInt(num) - 1)
          );
          setFriendly(parseInt(surveyData.friendly));
          setActivity(parseInt(surveyData.activity));
          setDependency(parseInt(surveyData.dependency));
          setBark(parseInt(surveyData.bark));
          setHair(parseInt(surveyData.hair));
        } else {
          // 기존 설문 결과가 없으면 제출되지 않은 상태로 설정합니다.
          setHasSubmitted(false);
        }
      })
      .catch((error) => {
        setHasSubmitted(false);
      });
  }, []);

  // 제출하는 함수
  const handleSubmit = () => {
    setHasSubmitted(true);
    const rankingString = ranking.map((item) => item + 1).join("");
    console.log("현재 순서:", rankingString);
    const data = {
      friendly: friendly.toString(),
      activity: activity.toString(),
      dependency: dependency.toString(),
      bark: bark.toString(),
      hair: hair.toString(),
      ranking: rankingString,
    };

    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    axios
      .post(`${REACT_APP_API_URL}/surveys`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("설문 데이터가 성공적으로 제출되었습니다!", response);
        setSurveyData(data); // 제출한 설문 데이터를 상태로 업데이트합니다.
        navigate("/adopt");
      })
      .catch((error) => {
        console.error("설문 데이터 제출 오류:", error);
        setHasSubmitted(false);
      });
  };

  // 수정하는 함수
  const handleUpdate = () => {
    setHasSubmitted(true);
    const rankingString = ranking.map((item) => item + 1).join("");
    console.log("현재 순서:", rankingString);
    const data = {
      friendly: friendly.toString(),
      activity: activity.toString(),
      dependency: dependency.toString(),
      bark: bark.toString(),
      hair: hair.toString(),
      ranking: rankingString,
    };

    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    axios
      .put(`${REACT_APP_API_URL}/surveys`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("설문 데이터가 성공적으로 수정되었습니다!", response);
        setSurveyData(data); // 수정한 설문 데이터를 상태로 업데이트합니다.
        navigate("/adopt");
      })
      .catch((error) => {
        console.error("설문 데이터 수정 오류:", error);
        setHasSubmitted(false);
      });
  };

  // 드래그 앤 드롭
  const onDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("index");
    const newRanking = [...ranking];
    const [removed] = newRanking.splice(draggedIndex, 1);
    newRanking.splice(index, 0, removed);
    setRanking(newRanking);
  };

  const nickname = localStorage.getItem("nickname");

  return (
    <S.CenteredDiv>
      <S.Div>
        {/* Button to trigger the modal */}
        {hasSubmitted && (
          <div>
            {nickname}님은 이미 설문을 제출했습니다.
          </div>
        )}

        <S.SurveyContainer>
          <S.Survey>선호도조사</S.Survey>
          <p>
            선호도 조사를 통해 {nickname}님의 생활에 맞는
            강아지를 추천해드려요!
          </p>
          <S.Drag>
            항목을 <S.Span>드래그</S.Span>하여 중요도 순위를 조정해보세요 !
          </S.Drag>
          {ranking.map((item, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, index)}
            >
              <SurveyPaw
                title={titles[item]}
                initial={
                  surveyData ? parseInt(surveyData[`${egtitles[item]}`]) : 0
                }
                onSelect={(value) => {
                  selectors[item](value);
                }}
              />
            </div>
          ))}
        </S.SurveyContainer>
        {surveyData ? (
          <S.Button onClick={handleUpdate}>수정하기</S.Button>
        ) : (
          <S.Button onClick={handleSubmit}>등록하기</S.Button>
        )}
      </S.Div>
    </S.CenteredDiv>
  );
}

export default Survey;
