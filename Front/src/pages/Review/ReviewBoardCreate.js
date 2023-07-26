// 입양후기 글 작성 페이지
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";

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
    console.log(ReviewContent);
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
        <Editor>
          <CKEditor
            editor={ClassicEditor}
            data="<p>입양 후기를 자유롭게 작성해주세요.</p>"
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
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
        </Editor>
      <button className="submit-button">입력</button>
      </div>
    </div>
  );
}

export default ReviewBoardCreate;

const Editor = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
  min-height: 500px;
}
`;
