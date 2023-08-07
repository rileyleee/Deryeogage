import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameDeath.style"
import { useRecoilValue } from "recoil"
import { SimulationExistAtom } from "../../recoil/SimulationAtom"
import {useNavigate} from "react-router-dom"

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

    const navigate = useNavigate();
    const existData = useRecoilValue(SimulationExistAtom)
    const handleClick = () => {
        navigate("/simulations/end")
      }

    return (
        <S.GameStartsecond className="col-10 second"
        petType={existData.petType}
        >   <div className="d-flex justify-content-center">
                <S.GameResulth3>사망했습니다.</S.GameResulth3>
            </div>
            <div className="d-flex justify-content-center">
                {showButton && <S.GameBasicButton onClick={handleClick}>❌게임 종료❌</S.GameBasicButton>}
            </div>
        </S.GameStartsecond>
    );
}

export default GameDeath;
