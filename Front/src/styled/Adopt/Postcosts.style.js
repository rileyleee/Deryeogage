import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  display: flex;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  max-width: 1000px;
  flex-direction: row;
  align-items: center;  /* 중앙 정렬 */
`;

export const Notification = styled.div`
 display: flex;
 padding: 10px;  /* 텍스트와 주변 요소와의 간격 */
 flex-direction: column;

`;

export const Div = styled.div`
 display: flex;
 padding: 10px;  /* 텍스트와 주변 요소와의 간격 */
 flex-direction: column;
  align-items: center;

`;

export const KakaoPay = styled.a`
margin-top: 2vh;
  display: flex;
  padding: 10px;
  flex-direction: column;
  background-image: url('/assets/payment_icon_yellow_medium.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 120px;  /* 이미지의 너비를 설정하세요 */
  height: 40px;  /* 이미지의 높이를 설정하세요 */
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const Title = styled.div`
  font-size: 45px;
  color: rgba(255, 145, 77, 1);
  margin-bottom: 40px;
  font-weight: bold;  // 굵게 작성
`;

export const MainText = styled.p`
  font-size: 22px;
  margin-bottom:20px;
  line-height: 2;
`;


export const SubText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom:20px;
`;

export const AgreeMentText = styled.p`
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
