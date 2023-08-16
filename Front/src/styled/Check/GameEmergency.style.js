import styled from "styled-components";

export const GameStartsecond = styled.div`
  position: relative;

  &.second {
    height: 70vh;
    padding: 1vh;
    background-image: url("/assets/background/hospital.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    image-rendering: -webkit-optimize-contrast;/* Webkit (non-standard naming) */
    image-rendering: -o-crisp-edges;           /* OS X & Windows Opera (12.02+) */
    image-rendering: pixelated;                /* Chrome */
    image-rendering: optimizeSpeed;            /* Older versions of FF */
  }

  &.second::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: inset 0 0 0 1000px transparent;
    animation: blink 1s linear infinite;
  }

  @keyframes blink {
    0%, 100% { box-shadow: inset 0 0 0 1000px transparent; }
    50% { box-shadow: inset 0 0 0 1000px rgba(255, 0, 0, 0.5); }
  }
`;

export const GameDogImg = styled.img`
    width: 12vW; // 이미지 너비 설정
    height: 14vh; // 이미지 높이 설정
    object-fit: cover; // 이미지의 비율 유지 및 적절히 크기 맞춤
    position: absolute; // 이미지 위치 절대값 설정
    top: 50%; // 상위 컨테이너 중앙에 위치
    left: 50%; // 상위 컨테이너 중앙에 위치
    transform: translate(25%, 45%) scaleY(-1); // 위치 조정 및 회전
`

export const GameEmergencyBtn = styled.button`
    background-color:transparent;
    border: none;
`

export const GameEmergencyBubble = styled.img`
    width: 8vW;
    height: 10vh;
    position: absolute; // 이미지 위치 절대값 설정
    top: 50%; // 상위 컨테이너 중앙에 위치
    left: 50%; // 상위 컨테이너 중앙에 위치
    transform: translate(120%, -30%); // 위치 조정 및 회전
`