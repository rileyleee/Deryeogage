import styled from "styled-components"; // 스타일드 컴포넌트 import
import { Link } from "react-router-dom";

export const Image = styled.img`
  width: 3vw;
  height: 3vw;
  object-fit: cover; // 이미지 비율 유지
  border-radius: 10px;
`;


export const TitleLink = styled(Link)`
  text-decoration: none; // 밑줄 표시
  color: black;
  &:hover{
    color: #FF914D;
  }
`

export const BoardRow = styled.div`
  padding: 0.5vw 0 0.5vw 2vw;
  &.list {
    margin: 0 2vw;
    border-top: 2px solid #CCCCCC;
    border-bottom: 2px solid #CCCCCC;
    background-color: #F2F2F2;
  }
  &.item {
    border-bottom: 2px solid #CCCCCC;
    margin: 0 0 0 2vw;
  }
`

export const ScrollBar = styled.div`
  max-height: 21vw; /* 원하는 높이 설정 */
  overflow-y: auto;  /* 세로 스크롤 표시 */
  margin-right: 2vw;
`
