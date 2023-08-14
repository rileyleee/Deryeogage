import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-color: rgba(0, 0, 0, 0.5); */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  display: flex;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 1100px;
  flex-direction: row;
  align-items: center;  /* 중앙 정렬 */
  justify-content: space-between;  /* 아이템 간의 공간을 최대로 */
`;

export const Notification = styled.div`
 display: flex;
 padding: 10px;  /* 텍스트와 주변 요소와의 간격 */
 flex-direction: column;
 /* width: 65%; */
`;


export const Title = styled.div`
  font-size: 45px;
  color: rgba(255, 145, 77, 1);
  margin-bottom: 40px;
  font-weight: bold;  // 굵게 작성
`;

export const MainText = styled.text`
  font-size: 22px;
  margin-bottom:20px;
  line-height: 2;
`;


export const SubText = styled.text`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom:20px;
`;

export const AgreeMentText = styled.text`
  font-size: 18px;
  line-height: 1.5;  
  font-weight: bold; 
`;

export const Media = styled.img` 
  padding-top: 30px;
  position: relative;
  width: 100%; 
  height: auto;
  object-fit: cover;
  display: flex; 
  justify-content: center; 
  align-items: center; 
`;
