import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => (props.small ? "8px" : "15px")}; // 작은 크기일 경우 패딩도 조정합니다.
`;

export const Span = styled.span`
  margin: 1vw;
`;

export const Paws = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    ${(props) => props.small && `
      width: 20px; // 작은 크기로 설정하고 싶은 값
      height: 20px; // 작은 크기로 설정하고 싶은 값
    `}
  }

  .orangePaw {
    color: #FF914D;
  }
`;
