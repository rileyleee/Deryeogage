import React from "react";

function Profile() {
  const nickname = localStorage.getItem("nickname");

  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("nickname");

    // Redirect to the login page after logout
    window.location.href = "/";
  };

  return (
    <div>
      <h1>마이페이지</h1>
      <h3>안녕하세요 {nickname}님 !</h3>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default Profile;
