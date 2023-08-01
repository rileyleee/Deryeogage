import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameMenu.style"

function GameMenu(props) {
    const existData = props.existData
    const borderColor = props.borderColor || "#FF914D";

    const timeDifferenceFromStorage = JSON.parse(localStorage.getItem('timeDifference'));
    let initialHoursDifference, initialMinutesDifference;
    if (timeDifferenceFromStorage) {
        // If timeDifference exists in localStorage, use it
        initialHoursDifference = timeDifferenceFromStorage.hours;
        initialMinutesDifference = timeDifferenceFromStorage.minutes;
    } else {
        // If timeDifference does not exist in localStorage, calculate it
        initialHoursDifference = (Number(existData.lastTime.substr(11, 2)) - Number(existData.startTime.substr(11, 2)) + 24) % 24;
        initialMinutesDifference = (Number(existData.lastTime.substr(14, 2)) - Number(existData.startTime.substr(14, 2)) + 60) % 60;

        if (initialMinutesDifference < 0) {
            initialMinutesDifference += 60;
            initialHoursDifference -= 1;
        }
    }

    const [hpPercentage, setHpPercentage] = useState(() => localStorage.getItem('hpPercentage') || existData.health);
    const [timeDifference, setTimeDifference] = useState(() => JSON.parse(localStorage.getItem('timeDifference')) || {
        hours: initialHoursDifference,
        minutes: initialMinutesDifference
    });
    const [cost, setCost] = useState(() => localStorage.getItem('cost') || existData.cost);
    console.log(hpPercentage)
    console.log(timeDifference)

    useEffect(() => {
        let hpTimer = 0;
        const timerId = setInterval(() => {
            setTimeDifference(prevTimeDifference => {
                let newMinutes = prevTimeDifference.minutes + 1;
                let newHours = prevTimeDifference.hours;

                if (newMinutes >= 60) {
                    newMinutes -= 60;
                    newHours += 1;
                }

                if (newHours >= 24) {
                    newHours -= 24;
                }

                return {
                    hours: newHours,
                    minutes: newMinutes
                };
            });

            hpTimer += 1;
            if (hpTimer >= 5) { // 5분마다 HP 감소
                setHpPercentage((prevHpPercentage) => prevHpPercentage > 0 ? prevHpPercentage - 1 : 0);
                hpTimer = 0;
            }
        }, 60000); // 1분에 한 번씩 실행됩니다.

        return () => clearInterval(timerId); // 컴포넌트가 unmount될 때 타이머를 정리합니다.
    }, []); 

    useEffect(() => {
        localStorage.setItem('hpPercentage', hpPercentage);
        localStorage.setItem('timeDifference', JSON.stringify(timeDifference));
    }, [hpPercentage, timeDifference]);
    
    const displayTime = () => {
        return `${timeDifference.hours.toString().padStart(2, '0')}:${timeDifference.minutes.toString().padStart(2, '0')}`;
    }

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
                <p>{displayTime()}</p>
                <p>{cost}원</p>
                <S.GameBasicHp borderColor={borderColor} hpPercentage={hpPercentage}>{hpPercentage}</S.GameBasicHp>
                <p>날씨 맑음</p>
            </div>
        </S.GameBasicMenu>
    );
}

export default GameMenu;
