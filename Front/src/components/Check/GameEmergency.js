// 게임 시작 화면
import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameEmergency.style"
import { useRecoilValue } from "recoil"
import { SimulationExistAtom } from "../../recoil/SimulationAtom"

function GameBasicScreen(props) { // 자식에서 부모로 데이터 보내기
    const setHandleMove = (num) => {
        props.handleMove(num)
    }
    const existData = useRecoilValue(SimulationExistAtom)

  return (
    <S.GameStartsecond className="col-10 second"
    petType={existData.petType}
    >
    </S.GameStartsecond>
    );
  }
  
  export default GameBasicScreen;
