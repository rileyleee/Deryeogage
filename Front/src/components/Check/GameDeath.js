import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameDeath.style"
import { useRecoilValue } from "recoil"
import { SimulationExistAtom } from "../../recoil/SimulationAtom"

function GameDeath(props) {
    // 버튼이 보이는지 여부를 제어하는 상태 변수를 추가합니다.
    const [showButton, setShowButton] = useState(false);
    const nickname = localStorage.getItem('nickname')
    
    useEffect(() => {
        // 컴포넌트가 마운트될 때 5초 후에 버튼을 보이게 합니다.
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 5000);

        // 컴포넌트가 unmount될 때 타이머를 정리합니다.
        return () => clearTimeout(timer);
    }, []);

    const existData = useRecoilValue(SimulationExistAtom)

    return (
        <S.GameStartsecond className="col-10 second d-flex justify-content-center align-items-center"
        petType={existData.petType}
        >
            {/* showButton의 값에 따라 버튼을 조건부로 렌더링합니다. */}
            {showButton && <S.GameBasicButton data-bs-toggle="modal" data-bs-target="#exampleModal">❌게임 종료❌</S.GameBasicButton>}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                    <h1 class="modal-title text-center" id="exampleModalLabel">{nickname}님의 시뮬레이션 결과</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <h3>전체 점수</h3>
                    <h3>완료한 훈련 개수</h3>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">확인</button>
                    </div>
                </div>
                </div>
            </div>
        </S.GameStartsecond>
    );
}

export default GameDeath;
