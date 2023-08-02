import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameMenu.style"

function GameMenu(props) {
    const existData = props.existData
    const borderColor = props.borderColor || "#FF914D";
    const [cost, setCost] = useState(() => localStorage.getItem('cost') || existData.cost);
    console.log(cost)


    useEffect(() => {
        localStorage.setItem('cost', existData.cost);
    }, [existData.cost]);

    return (
        <S.GameBasicMenu className="d-flex" borderColor={borderColor}>
            <S.GameBasicIcon>
                <p>⏰</p>
                <p>💸</p>
                <p>💖</p>
                <p>🌞</p>
            </S.GameBasicIcon>
            <div>
                <p>{props.time}</p>
                <p>{cost}원</p>
                <S.GameBasicHp borderColor={borderColor} hpPercentage={props.hp}>{props.hp}</S.GameBasicHp>
                <p>날씨 맑음</p>
            </div>
        </S.GameBasicMenu>
    );
}

export default GameMenu;
