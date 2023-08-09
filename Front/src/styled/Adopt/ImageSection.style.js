import styled from "styled-components";

export const Span = styled.span`
  color: rgba(255, 145, 77, 1);
`;

export const AddPic = styled.div`
  display: flex;

  background-color: white;
  border: 1px #ff914d solid;
  border-radius: 30px;
  width: 100px;
  height: 100px;

  justify-content: center;

  padding: 1vw;
  margin-top: 1%;
  margin-bottom: 1%;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
`;
export const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border: 1px #ff914d solid;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DogCheck = styled.div`
  /* 스타일을 추가하여 간격을 줍니다. */
  margin: 1vw 0;
  padding: 2%;
  border: 1px #ff914d solid;
  border-radius: 30px;
  background-color: white;
`;

export const DogInfo = styled.div`
  /* 스타일을 추가하여 간격을 줍니다. */
  margin: 1vw 0;
  padding: 2%;
  border: 1px #ff914d solid;
  border-radius: 30px;
  background-color: white;
`;

export const DogTextarea = styled.textarea`
  margin-top: 1%;
  margin-bottom: 1%;
  border: 1px #ff914d solid;
  border-radius: 30px;
  width: 100%;
  height: 10vw;
  padding: 2%;
  resize: none; /* Prevent textarea resizing */

  /* Style for the placeholder text */
  &::placeholder {
    color: rgba(255, 145, 77, 0.5);
  }
`;

export const TextArea = (props) => {
  <DogTextarea>{props.children}</DogTextarea>;
};

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Adjust this value as per your preference */
  margin-bottom: 4px; /* Add margin to separate sections */
  margin-top: 1vh; /* 간격을 좁게 조정하려면 더 작은 값으로 변경하세요. */
`;



export const Box = styled.div`
  flex: 1;
  margin-right: 1vw;
`;
export const Button = styled.button`
  border: none;
  background-color: #ff914d;
  padding: 0.5vw 1vw;
  border-radius: 30px;
  color: white;
  margin-top: 1vw;
  left: 50%;
  transform: translateX(-50%); /* Add this to center the button horizontally */
  position: relative; /* Add this to enable the horizontal centering */

  /* Additional styles (optional) */
  display: block;
  width: fit-content;
  cursor: pointer;
`;

export const Div = styled.div`
  /* 스타일을 추가하여 간격을 줍니다. */
  margin: 1vw 0;
  padding: 1vh;
  font-size: 2vh;
`;


export const TitleInput = styled.input`
width: 100%;
padding: 10px;
margin: 10px 0;
border: 1px solid #ccc;
border-radius: 4px;
`;

export const VideoPreview = styled.video`
  width: 100px; // Adjust this to your preferred width
  height: 100px; // Adjust this to your preferred height
  object-fit: cover;
  border-radius: 30px;
`;