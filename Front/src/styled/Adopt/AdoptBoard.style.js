import styled from "styled-components";

export const Button = styled.button`
  border: none;
  background-color: #ff914d;
  padding: 0.5vw 1vw;
  border-radius: 30px;
  color: white;
  margin-top: 30px;
  left: 96%;
  transform: translateX(-50%);
  position: relative;
  display: block;
  width: fit-content;
  cursor: pointer;
`;

export const BoardContainer = styled.div`
  border: 1px solid #FF914D;
  border-radius: 30px;
  padding-top: 30px;
  margin-top: 20px;
`;

export const SearchContainer = styled.div`
  display: flex; 
  justify-content: space-between; 
  margin-top: 10px; 
  margin-bottom: 20px; 
  justify-content: center;
`;

export const SelectInputBox = styled.span`
  width: 500px;
  display: flex; 
  justify-content: space-between; 
  border-radius: 20px;  
  border: 1px solid #FF914D;
  padding: 5px;
`;

export const InputBox = styled.input`
  width: 100%;
  border: none;
  
  &:focus {
    outline: none;
  }
`;

export const BoardGrid = styled.div`
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 30px;
  background-color: white;
  border-radius: 20px;
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
  display: flex; 
  justify-content: center; 
  align-items: center; 
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
