// 체크리스트(사전테스트) 페이지
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckBtn from "../../components/Check/CheckBtn";

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

  const [pledge, setPledge] = useState(localStorage.getItem("pledge") || "");

  const [answers, setAnswers] = useState(
    JSON.parse(localStorage.getItem("answers")) ||
      questions.reduce((acc, curr) => ({ ...acc, [curr]: "" }), {})
  );

  const handleChange = (question, value) => {
    if (question === "입양 서약서") {
      setPledge(value);
    } else {
      setAnswers({ ...answers, [question]: value });
    }
  };

  const handleChangePledge = (e) => {
    setPledge(e.target.value);
  };

  // localStorage에 answers를 저장
  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem("pledge", pledge);
  }, [answers, pledge]);

  const handleSubmit = () => {
    const unanswered = questions.filter((q) => !answers[q]);
    if (unanswered.length > 0) {
      alert("모든 질문에 답변을 완료해주세요.");
    } else {
      const rawTotalScore = questions.reduce(
        (sum, q) => sum + scores[answers[q]],
        0
      );
      const totalScore = Math.round((rawTotalScore / 70) * 100); // 점수를 100점 기준으로 변환
      navigate("/checklist/result", { state: { answers, totalScore, pledge } });
    }
  };

  return (
    <div>
      <h1>반려동물 입양을 위한 사전테스트입니다.</h1>
      <h3>성실하게 답변해주세요.</h3>
      {questions.map((question) => (
        <CheckBtn
          key={question}
          question={question}
          value={answers[question]}
          onChange={handleChange}
        />
      ))}
      <PledgeContainer>
        <h2>입양 서약서</h2>
        <PledgeTextarea
          value={pledge}
          onChange={handleChangePledge}
          placeholder="입양 서약서를 작성해주세요."
        />
      </PledgeContainer>
      <ButtonContainer>
        <SubmitButton onClick={handleSubmit}>제출하기</SubmitButton>
      </ButtonContainer>
    </div>
  );
}

export default CheckList;


const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: #fff;
  color: rgba(255, 145, 77, 1);
  border: 1px solid rgba(255, 145, 77, 1);
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 145, 77, 1);
    color: white;
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