// 입양후기 글 작성 페이지
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as S from "../../styled/Review/ReviewBoardCreate.style"

function ReviewBoardCreate() {
  const [ReviewContent, setReviewContent] = useState({
    title: "",
    content: "",
  });
  const getValue = (evnet) => {
    const { name, value } = evnet.target;
    setReviewContent({
      ...ReviewContent,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>ReviewBoardCreate</h1>
      <div className="form-wrapper">
        <input
          className="title-input"
          type="text"
          placeholder="제목을 입력해주세요."
          onChange={getValue}
          name="title"
        />
        <S.Editor>
          <CKEditor
            editor={ClassicEditor}
            data="<p>입양 후기를 자유롭게 작성해주세요.</p>"
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setReviewContent({
                ...ReviewContent,
                content: data,
              });
              console.log(ReviewContent);
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </S.Editor>
      <button className="submit-button">입력</button>
      </div>
    </div>
  );
}

export default ReviewBoardCreate;
