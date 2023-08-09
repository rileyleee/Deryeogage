import styled from "styled-components";

export const Button = styled.button`
  border: none;
  background-color: #ff914d;
  padding: 0.5vw 1vw;
  border-radius: 30px;
  color: white;
  margin-top: 1vw;
  left: 50%;
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
  padding: 20px;
  border: 1px solid #FF914D;
  background-color: white;
  border-radius: 30px;
`;

export const BoardItem = styled.div`
  border: white;
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