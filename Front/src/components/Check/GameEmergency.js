// 게임 시작 화면
import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameEmergency.style"
import { useRecoilValue } from "recoil"
import { SimulationExistAtom } from "../../recoil/SimulationAtom"
import { GlobalStyles } from "../../styled/Check/GameEmergency.style";

function GameEmergency(props) { // 자식에서 부모로 데이터 보내기
    const setHandleMove = (num) => {
        props.handleMove(num)
    }
    const existData = useRecoilValue(SimulationExistAtom)

  return (
    <S.GameStartsecond className="col-10 second">
        <S.GameDogImg src={`assets/${existData.petType}/sniff${existData.petType}.gif`} alt="" />
        <S.GameEmergencyBtn onClick={() => setHandleMove(14)}><S.GameEmergencyBubble src="assets/things/sick2.png" alt="" /></S.GameEmergencyBtn>
    </S.GameStartsecond>
    );
  }
  

  export default GameEmergency;
