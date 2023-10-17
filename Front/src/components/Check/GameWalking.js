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
    const handleSpacebarPress = (event) => {
      if (event.code === "Space") {
        event.preventDefault(); // 스페이스바를 눌렀을 때의 기본 동작(스크롤 이동 등) 막기
      }
    };

    const handleSpacebarRelease = (event) => {
      if (event.code === "Space") {
        setProgress(prev => (prev < 100 ? prev + 10 : 100)); // 100을 초과하지 않도록
      }
    };

    // 스페이스바를 눌렀을 때의 기본 동작을 막는 이벤트 리스너를 추가
    window.addEventListener("keydown", handleSpacebarPress);
    // 스페이스바를 뗐을 때의 동작을 처리하는 이벤트 리스너를 추가
    window.addEventListener("keyup", handleSpacebarRelease);

    return () => { // 컴포넌트가 unmount될 때 이벤트 리스너를 제거
      window.removeEventListener("keydown", handleSpacebarPress);
      window.removeEventListener("keyup", handleSpacebarRelease);
    };
  }, []);
  return (
    <S.GameStartsecond className="col-10 second"
    petType={dogData}>
        <audio src="/audio/GameWalking_BGM.mp3" autoPlay loop />
        <div className="d-flex justify-content-center">
            <S.GameWalkingHp width={progress}>
                <S.GameWalkingPtag>스페이스 바를 마구 누르세요..🏃‍♀️🏃‍♂️</S.GameWalkingPtag>
                <div className="d-flex justify-content-center">
                    {progress === 100 ? (
                        <S.GameWalkingBtn onClick={() => setHandleMove(5)}>
                        🐶산책 완료🐶<br />집으로 돌아가기🏚
                      </S.GameWalkingBtn>
                    ) : 
                    <S.WalkingText>산책하는 중...</S.WalkingText>
                    }
                </div>
            </S.GameWalkingHp>
        </div>
    </S.GameStartsecond>
    );
  }
  
  export default GameWalking;
