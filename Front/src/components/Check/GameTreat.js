// 게임 시작 화면
import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameTreat.style"
import { useRecoilValue } from "recoil"
import { SimulationExistAtom } from "../../recoil/SimulationAtom"

function GameTreat(props) { // 자식에서 부모로 데이터 보내기
    const setHandleMove = (num) => {
        props.handleMove(num)
    }
    const existData = useRecoilValue(SimulationExistAtom)
    // 타이머 설정
    useEffect(() => {
      const timer = setTimeout(() => {
          setHandleMove(5); // 이전 페이지의 번호를 넣어서 이전 페이지로 이동
      }, 5000); // 10초 (1초 = 1000 밀리초)

      return () => clearTimeout(timer); // 컴포넌트가 unmount 되면 타이머를 해제
      }, []); // 두 번째 파라미터에 빈 배열을 넣어 useEffect가 최초로 실행될 때만 타이머가 설정되도록

  return (
    <S.GameStartsecond className="col-10 second"
    petType={existData.petType}
    >
      <S.WalkingText>간식 먹는 중...</S.WalkingText>
    </S.GameStartsecond>
    );
  }
  
  export default GameTreat;
