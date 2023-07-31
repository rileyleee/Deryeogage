import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../../styled/Check/GameBtn.style"


function GameBtn({children, ...rest}) {
    return (
    <S.GameBasicButton {...rest}>{children}</S.GameBasicButton>
    )
}

export default GameBtn;