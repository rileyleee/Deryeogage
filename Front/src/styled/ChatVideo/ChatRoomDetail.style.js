import styled from "styled-components";

export const MessageList = styled.ul`
  height: 73vh; // 원하는 높이 설정
  overflow-y: auto; // 내용이 높이를 초과할 경우 스크롤 생성
  list-style: none;
  padding: 0;
`;

export const MessageItem = styled.li`
  text-align: ${(props) => (props.rightAlign ? "right" : "left")};
  display: flex;
  flex-direction: ${(props) => (props.rightAlign ? "row-reverse" : "row")}; // 추가
  border-radius: 30px;
  padding: 0.5vh;
  word-wrap: break-word;
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid;
  border-radius: 30px;
  padding: 0.5vh;
  color: gray;
  word-wrap: break-word;
  background-color: ${(props) =>
    props.rightAlign ? "#e6f7ff" : "#f9e0e0"};
`;

export const NickName = styled.span`
  font-weight: bold;
  color: black; // 원하는 색상
`;

export const MessageText = styled.span`
  color: gray;
`;

export const MessageTime = styled.small`
  color: gray;
  align-self: flex-end;
  margin-left: ${(props) => (props.rightAlign ? "0" : "1rem")};
  margin-right: ${(props) => (props.rightAlign ? "1rem" : "0")};
`;

export const MessageInput = styled.input`
  width: 80%;
  padding: 5px;
`;

export const SendButton = styled.button`
  padding: 5px 10px;
`;

export const RoomInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
