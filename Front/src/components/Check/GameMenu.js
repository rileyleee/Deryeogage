import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameMenu.style"
import {useRecoilValue } from 'recoil'
import { SimulationExistAtom } from "../../recoil/SimulationAtom"

function GameMenu(props) {
    const existData = useRecoilValue(SimulationExistAtom)
    const borderColor = props.borderColor || "#FF914D";

    return (
        <S.GameBasicMenu className="d-flex" borderColor={borderColor}>
            <S.GameBasicIcon>
                <S.GameIcon>⏰</S.GameIcon>
                <S.GameIcon>💸</S.GameIcon>
                <S.GameIcon>💖</S.GameIcon>
                {/* <p>{state.icon}</p> */}
                {/* <img src={localStorage.getItem('imgSrc')} style={{ width: '40px', height: '40px' }} /> */}

            </S.GameBasicIcon>
            <div>
                <S.GameText>{props.time}</S.GameText>
                <S.GameText>{existData.cost}원</S.GameText>
                <S.GameBasicHp borderColor={borderColor} hpPercentage={existData.health}>{existData.health}</S.GameBasicHp>
                {/* <S.GameText>{localStorage.getItem('humidity')}</S.GameText> */}
            </div>
        </S.GameBasicMenu>
    );
}

export default GameMenu;