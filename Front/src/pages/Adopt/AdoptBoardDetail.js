import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";
import ResultPaw from "./../../components/ResultPaw";

export const Container = styled.div`
  /* 여기에 Container의 스타일을 적용하세요. */
`;

export const Title = styled.h1`
  /* 여기에 Title의 스타일을 적용하세요. */
`;

export const ImageSection = styled.div`
  /* 여기에 ImageSection의 스타일을 적용하세요. */
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Adjust this value as per your preference */
  margin-bottom: 4px; /* Add margin to separate sections */
  margin-top: 1vh; /* 간격을 좁게 조정하려면 더 작은 값으로 변경하세요. */
`;

export const Box = styled.div`
margin: 1vw 0;
  padding: 1vh;
  border: 1px #ff914d solid;
  border-radius: 30px;
  background-color: white;
  text-align: center;
  display: flex;
  align-items: center; /* SurveyPaw 컴포넌트들을 수직 방향으로 중앙 정렬 */
  flex-direction: column; /* SurveyPaw 컴포넌트들을 수직 방향으로 배치 */
  flex: 1;
  margin-right: 1vw;
`;

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;

export const DogTextarea = styled.textarea`
  /* 여기에 DogTextarea의 스타일을 적용하세요. */
`;

export const Button = styled.button`
  /* 여기에 Button의 스타일을 적용하세요. */
`;

function AdoptBoardDetail() {
  const [adoptData, setAdoptData] = useState(null);
  const { boardId } = useParams();

  useEffect(() => {
    const fetchAdoptData = async () => {
      if (boardId) {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(
            `http://localhost:8080/boards/${boardId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response);
          setAdoptData(response.data.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchAdoptData();
  }, [boardId]);

  if (!adoptData) {
    return null; // or a loading component
  }

  return (
    <Container>
      {adoptData.title}
      {/* 이미지 섹션 */}
      <ImageSection>
        {/* adoptData.images 배열을 사용해서 이미지를 표시하세요 */}
      </ImageSection>

      <FlexContainer>
        <Box>
          {/* 강아지 특성 정보를 표시하는 섹션 */}
          <ResultPaw title="친화력" selected={adoptData.friendly} />
          <ResultPaw title="활동량" selected={adoptData.activity} />
          <ResultPaw title="의존도" selected={adoptData.dependency} />
          <ResultPaw title="왈왈왈" selected={adoptData.bark} />
          <ResultPaw title="털빠짐" selected={adoptData.hair} />
        </Box>
        <Box>
          {/* 강아지 기본 정보를 표시하는 섹션 */}
          <p>이름 :{adoptData.name}</p>
          <p>나이 :{adoptData.age}세</p>
          <p>지역 :{adoptData.regionCode}</p>
          <p>성별 :{adoptData.gender ? "남자" : "여자"}</p>
          <p>칩 등록 여부 :{adoptData.chipYn ? "등록" : "미등록(알 수 없음)"}</p>
        </Box>
      </FlexContainer>

      <Span>건강정보</Span>
      {adoptData.health}
      <Span>소개</Span>
      {adoptData.introduction}
    </Container>
  );
}

export default AdoptBoardDetail;
