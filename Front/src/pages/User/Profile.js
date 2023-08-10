import React, { useState, useEffect } from "react";
import axios from "axios";
import DogLike from "../../components/User/DogLike";
import MyAdopt from "../../components/User/MyAdopt";
import AdoptFrom from "../../components/User/AdoptFrom";
import AdoptTo from "../../components/User/AdoptTo";
import Edit from "../../components/User/Edit";
import * as S from "../../styled/User/Profile.style"

function Profile() {
  const nickname = localStorage.getItem("nickname");
  const [activeTab, setActiveTab] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const token = localStorage.getItem("accessToken");
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("nickname");
    window.location.href = "/";
  };

  const fetchProfileImage = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/users/pic`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      setProfileImage(response.data.data);
    } catch (error) {
      console.error(
        "An error occurred while fetching the profile image:",
        error
      );
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, []);

  // 모달 창을 닫고 프로필 이미지를 새로고침하는 함수
  const handleEditClose = () => {
    setShowEditModal(false);
    fetchProfileImage();
  };

  return (
    <S.ProfileWrap>
      <h1>마이페이지</h1>
      <h3>안녕하세요 {nickname}님 !</h3>
      {profileImage && <S.ProfileImage src={profileImage} alt="프로필 이미지" />}
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={() => setShowEditModal(true)}>프로필 수정</button>
      <div>
        <button onClick={() => setActiveTab("adoptTo")}>입양내역</button>
        <button onClick={() => setActiveTab("adoptFrom")}>분양내역</button>
        <button onClick={() => setActiveTab("dogLike")}>찜한 목록</button>
        <button onClick={() => setActiveTab("myAdopt")}>내가 쓴 글</button>
      </div>
      {activeTab === "adoptTo" && <AdoptTo />}
      {activeTab === "adoptFrom" && <AdoptFrom />}
      {activeTab === "dogLike" && <DogLike />}
      {activeTab === "myAdopt" && <MyAdopt />}
      {showEditModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "50%",
              maxWidth: "500px",
            }}
          >
            <button onClick={() => setShowEditModal(false)}>닫기</button>
            <Edit onClose={handleEditClose} /> {/* 여기에 onClose prop을 전달해줍니다. */}
          </div>
        </div>
      )}
    </S.ProfileWrap>
  );
}

export default Profile;

