import styled from "styled-components"; // 추가된 부분

export const ProfileImage = styled.img`
  width: 9vw;
  height: 9vw;
  border-radius: 50%;
  object-fit: cover;
`;

export const NickName = styled.span`
    font-size: 2vw;
    &.nickname {
        color : #FF914D;
    }
`

export const UserInfoWrap = styled.div`
    padding: 1vw 2vw;
`

export const UserInfoText = styled.p`
    margin-right: 2vw;
    &.margin {
        margin-top : 1.1vw;
    }
`

export const MyBtn = styled.button`
    width : 12vw;
    background-color: #FFF1D6;
    border: none;
    border-radius: 10px;
`

export const TestBtn = styled.a`
    text-decoration: none;
    color: #FF914D;
`

export const ColWrap = styled.div`
    padding: 1vw;
`

export const ModalLocation = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
`

export const ModalStyle = styled.div`
    background-color: white;
    padding: 1.5vw;
    border-radius: 10px;
    width: 30vw;
`

export const ModalClose = styled.button`
    border: none;
    background-color: transparent;
    color : gray;
    font-size: 1.5vw;
`