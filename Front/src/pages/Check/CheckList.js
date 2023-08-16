import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckBtn from "../../components/Check/CheckBtn";
import axios from "axios";

function CheckList() {
  const scores = {
    아주조금: 1,
    조금: 2,
    보통: 3,
    많이: 4,
    아주많이: 5,
  };

  const navigate = useNavigate();

  const questions = [
    "1. 반려동물에게 필요한 환경을 제공할 수 있도록 준비가 되어 있습니까?",
    "2. 한번 인연을 맺은 동물은 끝까지 책임지고 보살피는 것에 대해 얼마나 결심하셨습니까?",
    "3. 모든 가족 멤버들과 반려동물 입양에 대한 합의는 얼마나 잘 이루어졌습니까?",
    "4. 반려동물을 위해 새로운 정보를 배우고 알아가는데 각오가 얼마나 되어 있습니까?",
    "5. 반려동물이 아플 때 적절한 치료를 제공할 의사와 능력은 어느정도입니까?",
    "6. 입양으로 인한 경제적 부담을 감당할 수 있는 의사와 능력은 어느정도입니까?",
    "7. 우리 집에서 키우는 다른 동물과 새로운 반려동물이 잘 어울릴 수 있을지에 대한 고려는 어느정도 하였습니까?",
    "8. 반려동물의 행복을 위해 시간을 할애할 의향이 어느 정도입니까?",
    "9. 반려동물의 행동 문제를 이해하고 대처하는 능력은 어느 정도입니까?",
    "10. 반려동물의 평생을 돌보는 것에 대한 각오는 어느 정도입니까?",
    "11. 입양 후에도 자주 유기견 보호소를 찾아가 반려동물에게 필요한 정보를 얻거나 도움을 받을 의향은 어느 정도입니까?",
    "12. 반려동물이 만약 병을 앓게 되었을 때, 치료비를 지불할 의향과 능력은 어느 정도입니까?",
    "13. 반려동물을 가족의 일원으로 받아들이고 사랑할 감정은 어느 정도입니까?",
    "14. 반려동물에게 필요한 운동과 놀이 시간을 제공할 의향과 능력은 어느 정도입니까?",
  ];

  const [promise, setPromise] = useState(localStorage.getItem("promise") || "");

  const [answers, setAnswers] = useState(
    JSON.parse(localStorage.getItem("answers")) ||
      questions.reduce((acc, curr) => ({ ...acc, [curr]: "" }), {})
  );

  const handleChange = (question, value) => {
    if (question === "입양 서약서") {
      setPromise(value);
    } else {
      setAnswers({ ...answers, [question]: value });
    }
  };

  const handleChangePledge = (e) => {
    setPromise(e.target.value);
  };

  // localStorage에 answers를 저장
  // useEffect(() => {
  //   localStorage.setItem("answers", JSON.stringify(answers));
  //   localStorage.setItem("promise", promise);
  // }, [answers, promise]);

  const handleSubmit = async () => {
    const unanswered = questions.filter((q) => !answers[q]);

    if (unanswered.length > 0) {
      alert("모든 질문에 답변을 완료해주세요.");
    } else {
      //입양서약서 내용 최소10자 이상인지 확인
      if (promise.length < 10) {
        alert("입양서약서는 최소 10자 이상 입력하셔야 합니다.");
        return; // 이 부분은 경고창 후에 나머지 로직을 중단하기 위한 코드입니다.
      }

      const rawTotalScore = questions.reduce(
        (sum, q) => sum + scores[answers[q]],
        0
      );
      const score = Math.round((rawTotalScore / 70) * 100);

      const token = localStorage.getItem("accessToken"); // 여기에 토큰을 입력하세요.
      const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

      axios
        .post(
          `${REACT_APP_API_URL}/pretests`,
          { promise, score },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("사전테스트 제출 완", response);
          navigate("/checklist/result");
        })
        .catch((error) => {
          console.log(promise, score);
          console.error("사전테스트 제출 오류", error);
        });
    }
  };

  return (
    <div>
      <InfoContainer>
        <h4>
          <span>사전테스트</span>를 통해 반려견을 입양 할 준비가 되었는지
          확인해보세요!
        </h4>
      </InfoContainer>
      <div>
        {questions.map((question) => (
          <CheckBtn
            key={question}
            question={question}
            value={answers[question]}
            onChange={handleChange}
          />
        ))}
        <PledgeContainer>
          <h2>
            입양 서약서
            <Tooltip>
              ⓘ
              <TooltipText className="tooltiptext">
                입양서약서는 <br /> 10자 이상
                <br /> 작성해주세요.
              </TooltipText>
            </Tooltip>{" "}
          </h2>

          <PledgeTextarea
            value={promise}
            onChange={handleChangePledge}
            placeholder="입양 서약서를 작성해주세요."
          />
        </PledgeContainer>
        <ButtonContainer>
          <SubmitButton onClick={handleSubmit}>제출하기</SubmitButton>
        </ButtonContainer>
      </div>
    </div>
  );
}

export default CheckList;

export const InfoContainer = styled.div`
  margin: 2vh 1vw 4vh;
  font-size: 2vw;
  span {
    color: #ff914d;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: 1em;
  background-color: #ff914d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #eb7d39;
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    overflow: hidden;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.5s;
    -webkit-transition-property: color, background-color;
    transition-property: color, background-color;
  }
`;

const PledgeContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  border: 1px solid rgba(255, 145, 77, 1);
  border-radius: 30px;
  background-color: #fff;
`;

const PledgeTextarea = styled.textarea`
  width: 100%;
  height: 150px;
  margin-top: 20px;
  padding: 16px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-left: 5px; //간격 조절

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

export const TooltipText = styled.span`
  visibility: hidden;
  width: 150px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 1vh;
  border-radius: 6px;
  font-size: 1rem;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -75px;

  opacity: 0;
  transition: opacity 0.3s;

  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
`;
