// 입양후기게시판 전체 글 조회
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function ReviewBoard() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/review/create");
  };
  let nickname = localStorage.getItem("nickname")
  return (
    <div>
      <p>
        회원님들의 입양후기를 보며 <Span>{nickname}</Span>님도 입양을 생각해보세요!
      </p>
      <div>
        <button onClick={onClick}>글 작성하기</button>
      </div>
    </div>
  );
}

export default ReviewBoard;

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;
