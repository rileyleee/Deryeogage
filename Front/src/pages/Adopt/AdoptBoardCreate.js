// 입양게시판 - 게시글 작성 페이지

import Radio from "../../components/Radio/Radio";
import SurveyPaw from "../../components/SurveyPaw";
import styled from "styled-components";

function AdoptBoardCreate(props) {
  return (
    <article className="container">
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <div>
        강아지의 <Span>성격</Span>과 <Span>특성</Span>을 선택해주세요.
          <SurveyPaw title="친화력" />
          <SurveyPaw title="활동량"/>
          <SurveyPaw title="의존성"/>
          <SurveyPaw title="짖음"/>
          <SurveyPaw title="털빠짐"/>
        </div>

        <div>
          강아지의 <Span>사진</Span>을 등록해주세요
          <p>
            <input type="file" />
          </p>
        </div>

        <div>
          강아지의 <Span>정보</Span>를 입력해주세요
          <p>
            이름:
            <input type="text" name="name" placeholder="name" />
          </p>
          <p>
            나이:
            <input type="text" name="age" placeholder="age" />
          </p>
          <p>
            지역:
            <input type="text" name="age" placeholder="age" />
          </p>
          <Radio />
        </div>

        <p>
          강아지의 <Span>건강정보</Span>를 상세하게 작성해주세요.
          <textarea
            name="health"
            placeholder="강아지의 건강정보를 적어주세요."
          />
        </p>

        <p>
          강아지를 자유롭게 <Span>소개</Span>해주세요.
          <textarea name="introduction" placeholder="강아지를 소개해주세요." />
        </p>

        <button>등록하기</button>
      </form>
    </article>
  );
}

export default AdoptBoardCreate;

const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;
