// 게임 시작 화면
import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameTherapy.style"
import { useRecoilValue } from "recoil"
import { SimulationExistAtom } from "../../recoil/SimulationAtom"

function GameTherapy(props) { // 자식에서 부모로 데이터 보내기
    const setHandleMove = (num) => {
        props.handleMove(num)
    }
    const existData = useRecoilValue(SimulationExistAtom)

    // 타이머 설정
    useEffect(() => {
        const timer = setTimeout(() => {
            setHandleMove(5); // 이전 페이지의 번호를 넣어서 이전 페이지로 이동합니다.
        }, 5000); // 10초 (1초 = 1000 밀리초)
  
        return () => clearTimeout(timer); // 컴포넌트가 unmount 되면 타이머를 해제합니다.
        }, []); // 두 번째 파라미터에 빈 배열을 넣어 useEffect가 최초로 실행될 때만 타이머가 설정되도록 합니다.

  return (
    <S.GameStartsecond className="col-10 second">
        <S.GameDogImg src={`/assets/${existData.petType}/sniff${existData.petType}.gif`} alt="" />
        <S.GameEmergencyBtn><S.GameEmergencyBubble src="/assets/things/therapy.png" alt="" /></S.GameEmergencyBtn>
    </S.GameStartsecond>
    );
  }
  

  export default GameTherapy;
