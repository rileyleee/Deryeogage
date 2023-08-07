import React, {useState, useEffect} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameMenu.style"
import {useRecoilValue, useRecoilState} from 'recoil'
import { SimulationExistAtom, SimulationCost  } from "../../recoil/SimulationAtom"

function GameMenu(props) {
    const existData = useRecoilValue(SimulationExistAtom)
    const borderColor = props.borderColor || "#FF914D";

    return (
        <S.GameBasicMenu className="d-flex" borderColor={borderColor}>
            <S.GameBasicIcon>
                <p>⏰</p>
                <p>💸</p>
                <p>💖</p>
                {/* <p>{state.icon}</p> */}
                <img src={localStorage.getItem('imgSrc')} style={{ width: '30px', height: '30px' }} />

            </S.GameBasicIcon>
            <div>
                <p>{props.time}</p>
                <p>{existData.cost}원</p>
                <S.GameBasicHp borderColor={borderColor} hpPercentage={existData.health}>{existData.health}</S.GameBasicHp>
                <p>{localStorage.getItem('humidity')}</p>
            </div>
        </S.GameBasicMenu>
    );
}

export default GameMenu;