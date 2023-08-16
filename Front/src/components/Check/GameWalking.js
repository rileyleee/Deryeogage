// 게임 시작 화면
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameWalking.style"
import {useRecoilValue} from "recoil"
import { SimulationExistAtom } from "../../recoil/SimulationAtom"

function GameWalking(props) { // 자식에서 부모로 데이터 보내기
    const existData = useRecoilValue(SimulationExistAtom)
    const dogData = existData.petType
    const setHandleMove = (num) => {
        props.handleMove(num)
    }
    const [progress, setProgress] = useState(0);
    useEffect(() => {
      const handleSpacebarRelease = (event) => {
          if (event.code === "Space") {
              setProgress(prev => (prev < 100 ? prev + 1 : 100)); // 100을 초과하지 않도록 합니다.
          }
      }
  
      window.addEventListener("keyup", handleSpacebarRelease);
  
      return () => { // 컴포넌트가 unmount될 때 이벤트 리스너를 제거합니다.
          window.removeEventListener("keyup", handleSpacebarRelease);
      }
  }, []);
  return (
    <S.GameStartsecond className="col-10 second"
    petType={dogData}>
        <div className="d-flex justify-content-center">
            <S.GameWalkingHp width={progress}>
                <S.GameWalkingPtag>스페이스 바를 마구 누르세요..🏃‍♀️🏃‍♂️</S.GameWalkingPtag>
                <div className="d-flex justify-content-center">
                    {progress === 100 && (
                        <S.GameWalkingBtn onClick={() => setHandleMove(5)}>
                        🐶산책 완료🐶<br />집으로 돌아가기🏚
                      </S.GameWalkingBtn>
                    )}
                </div>
            </S.GameWalkingHp>
        </div>
    </S.GameStartsecond>
    );
  }
  
  export default GameWalking;
