import styled from "styled-components";

export const Background = styled.div`
  position: absolute; /* 상대적 위치를 기준으로 움직입니다 */
  top: 75%;           /* 컨테이너 중간부터 시작 */
  left: 10%;          /* 컨테이너 중간부터 시작 */
  width: 80%;
  height: 300px;
  background: #FFFCF8; 
  margin-bottom: 100px;
`;

export const Button = styled.button`
  border: none;
  background-color: #ff914d;
  padding: 0.5vw 1vw;
  border-radius: 30px;
  color: white;
  margin-top: 1vw;
  left: 96%;
  transform: translateX(-50%);
  position: relative;
  display: block;
  width: fit-content;
  cursor: pointer;
`;

export const BoardGrid = styled.div`
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 30px;
  border: 1px solid #FF914D;
  background-color: white;
  border-radius: 30px;
`;

export const BoardItem = styled.div`
  border-color: white;
  padding: 10px;
  background-color: white;
`;

export const Media = styled.div`
  width: 100%;
  height: 100%;
  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  display: flex; /* Use flex display to align content vertically */
  justify-content: center; /* Align content horizontally in the center */
  align-items: center; /* Align content vertically in the center */
`;

export const StyledPagination = styled.div`
   .pagination {
     display: flex;
     justify-content: center; // 중앙 정렬
     list-style-type: none;
     padding: 0;
   }

   .pagination li {
     margin: 0 5px;
   }

   .pagination li a {
     text-decoration: none;
     color: black;
     padding: 8px 16px;
     transition: background-color .3s;
   }

   .pagination li a.active {
     background-color: #ff914d;
     color: white;
     border-radius: 30px;
   }

   .pagination li a:hover:not(.active) {
     background-color: #ddd;
   }
`;

export const Largespacer = styled.div`
height: 1350px;
`;

export const Smallspacer = styled.div`
height: 20px;
`;
