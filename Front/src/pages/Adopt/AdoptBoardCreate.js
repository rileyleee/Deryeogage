// 입양게시판 - 게시글 작성 페이지

import Radio from "../../components/Radio/Radio";
import Survey from "../User/Survey";

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
        <Survey />
        <div>
            강아지의 사진을 등록해주세요
            <p><input type="file" /></p>
            
        </div>
        <div>
            강아지의 정보를 입력해주세요
            <p> 이름:
            <input type="text" name="name" placeholder="name" />
            </p>
            <p> 나이:
            <input type="text" name="age" placeholder="age" />
            </p>
            <p> 지역:
            <input type="text" name="age" placeholder="age" />
            </p>
            <Radio />
        </div>

        <p>
          <textarea
            name="health"
            placeholder="강아지의 건강정보를 적어주세요."
          />
        </p>
        <p>
          <textarea name="introduction" placeholder="강아지를 소개해주세요." />
        </p>
      </form>
    </article>
  );
}

export default AdoptBoardCreate;
