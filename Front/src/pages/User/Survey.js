import React, { useState, useEffect } from "react";
import SurveyPaw from "../../components/SurveyPaw";
import styled from "styled-components";
import axios from "axios";
import Modal from "react-modal"; // import react-modal

Modal.setAppElement("#root");

function Survey() {
  const [ranking, setRanking] = useState([0, 1, 2, 3, 4]);
  const [friendly, setFriendly] = useState(0);
  const [activity, setActivity] = useState(0);
  const [dependency, setDependency] = useState(0);
  const [bark, setBark] = useState(0);
  const [hair, setHair] = useState(0);
  const [surveyData, setSurveyData] = useState(null); // surveyData 상태를 추가합니다.
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const token = localStorage.getItem("accessToken");

  const titles = ["친화력", "활동량", "의존성", "왈왈왈", "털빠짐"];
  const egtitles = ['friendly', 'activity', 'dependency', 'bark', 'hair']
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
          console.log(surveyData)
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

  // 제출결과 토글 모달
  const toggleResults = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const nickname = localStorage.getItem('nickname')

  return (
    <CenteredDiv>
      <Div>
        {/* Button to trigger the modal */}
        {hasSubmitted && (
          <>
          <div>{nickname}님은 이미 설문을 제출했습니다.</div>
          <Button onClick={toggleResults}>
            {modalIsOpen ? "숨기기" : "제출한 내역 확인하기"}
          </Button>
          </>
        )}

        {/* The Modal itself */}
        <StyledModal isOpen={modalIsOpen} onRequestClose={toggleResults}>
          {/* Add an exit button */}
          <CloseButton onClick={toggleResults}>x</CloseButton>

          {hasSubmitted && surveyData && (
            <div>
              <h4>제출한 설문 내역</h4>
              <br />
              <ul>
                <p>친화력 : {surveyData.friendly}</p>
                <p>활동량 : {surveyData.activity}</p>
                <p>의존성 : {surveyData.dependency}</p>
                <p>왈왈왈 : {surveyData.bark}</p>
                <p>털빠짐 : {surveyData.hair}</p>
              </ul>
            </div>
          )}
        </StyledModal>

        <SurveyContainer>
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
        </SurveyContainer>
        {surveyData ? (
          <Button onClick={handleUpdate}>수정하기</Button>
        ) : (
          <Button onClick={handleSubmit}>등록하기</Button>
        )}
      </Div>
    </CenteredDiv>
  );
}

export default Survey;

const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  padding: 0;
`;

const Div = styled.div`
  margin-top: 1%;
  padding: 1vw;
  width: 100%;
  max-width: 40vw;
  min-width: 300px;
  height: auto;
  min-height: 70vh;
  background-color: white;
  border: 1px #ff914d solid;
  border-radius: 30px;
  text-align: center;
  overflow: auto;
`;

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1%;
  padding: 1vw;
`;

const Button = styled.button`
  border: none;
  background-color: #ff914d;
  padding: 0.5vw 1vw;
  border-radius: 30px;
  color: white;
  margin-top: 1vw;
`;

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  width: 40vw;
  height: 60vh;
  border: 1px solid #ff914d;
  border-radius: 30px;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  background-color: white;
  position: absolute;
  right: 15px;
  top: 15px;
  border: none;
`;
