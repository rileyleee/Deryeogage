import React, {useState} from "react";
import * as S from "../../styled/User/BoardGroup.style"
import DogLike from "../../components/User/DogLike";
import MyAdopt from "../../components/User/MyAdopt";
import AdoptFrom from "../../components/User/AdoptFrom";
import AdoptTo from "../../components/User/AdoptTo";
import 'bootstrap/dist/css/bootstrap.min.css';

function BoardGroup() {
    const [activeTab, setActiveTab] = useState("adoptTo");
    return(
        <S.BoardGroupWrap>
            <div className="container">
                <S.Board className="row">
                    <div className="col-3 d-flex justify-content-center">
                        <S.BoardBtn onClick={() => setActiveTab("adoptTo")}>입양내역</S.BoardBtn>
                    </div>
                    <div className="col-3 d-flex justify-content-center">
                        <S.BoardBtn onClick={() => setActiveTab("adoptFrom")}>분양내역</S.BoardBtn>
                    </div>
                    <div className="col-3 d-flex justify-content-center">
                        <S.BoardBtn onClick={() => setActiveTab("dogLike")}>찜한 목록</S.BoardBtn>
                    </div>
                    <div className="col-3 d-flex justify-content-center">
                        <S.BoardBtn onClick={() => setActiveTab("myAdopt")}>내가 쓴 글</S.BoardBtn>
                    </div>
                </S.Board>
                {/* <S.Hr /> */}
            </div>
            {/* <S.BoardList className="container"> */}
                {activeTab === "adoptTo" && <AdoptTo />}
                {activeTab === "adoptFrom" && <AdoptFrom />}
                {activeTab === "dogLike" && <DogLike />}
                {activeTab === "myAdopt" && <MyAdopt />}
            {/* </S.BoardList> */}
        </S.BoardGroupWrap>
    )
}

export default BoardGroup;