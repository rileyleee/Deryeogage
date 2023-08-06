import React, { useState } from "react";
import MyAdoptHistory from "../../components/User/MyAdoptHistory";
import DogLike from "../../components/User/DogLike";
import MyAdopt from "../../components/User/MyAdopt";

function Profile() {
  const nickname = localStorage.getItem("nickname");
  const [activeTab, setActiveTab] = useState(""); // 현재 활성화된 탭을 관리하는 상태

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("nickname");
    window.location.href = "/";
  };

  return (
    <div>
      <h1>마이페이지</h1>
      <h3>안녕하세요 {nickname}님 !</h3>
      <button onClick={handleLogout}>로그아웃</button>
      <div>
        <button onClick={() => setActiveTab("adoptHistory")}>입양내역</button>
        <button onClick={() => setActiveTab("dogLike")}>찜한 목록</button>
        <button onClick={() => setActiveTab("myAdopt")}>내가 쓴 글</button>
      </div>
      {activeTab === "adoptHistory" && <MyAdoptHistory />}
      {activeTab === "dogLike" && <DogLike />}
      {activeTab === "myAdopt" && <MyAdopt />}
    </div>
  );
}

export default Profile;
