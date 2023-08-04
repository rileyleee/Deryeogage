import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameMenu.style"
import {useRecoilValue} from 'recoil'
import {SimulationExistAtom} from '../../recoil/SimulationAtom'

function GameMenu(props) {
    const existData = useRecoilValue(SimulationExistAtom)
    const borderColor = props.borderColor || "#FF914D";

    
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
                <p>{existData.cost}원</p>
                <S.GameBasicHp borderColor={borderColor} hpPercentage={existData.health}>{existData.health}</S.GameBasicHp>
                <p>날씨 맑음</p>
            </div>
        </S.GameBasicMenu>
    );
}

export default GameMenu;
