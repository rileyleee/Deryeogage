import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const ImagePreview = styled.img`
  width: 150px;
  height: 150px;
`;

function Edit({ onClose }) {
  const [profilePic, setProfilePic] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const token = localStorage.getItem("accessToken");
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("multipartFile", profilePic); // 키를 "multipartFile"로 변경
    try {
      await axios.post(`${REACT_APP_API_URL}/users/pic`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("사진이 등록되었습니다!");
      onClose(); // 업로드 성공 후 모달 닫기
    } catch (error) {
      console.error("An error occurred while uploading the image:", error);
    }
  };

  const handleUpdateImage = async () => {
    const formData = new FormData();
    formData.append("multipartFile", profilePic); // 키를 "multipartFile"로 변경
    try {
      await axios.put(`${REACT_APP_API_URL}/users/pic`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("사진이 수정되었습니다!");
      onClose(); // 업로드 성공 후 모달 닫기
    } catch (error) {
      console.error("An error occurred while updating the image:", error);
    }
  };

  const fetchProfileImage = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/users/pic`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImagePreview(response.data.url);
    } catch (error) {
      console.error(
        "An error occurred while fetching the profile image:",
        error
      );
    }
  };

  useEffect(() => {
    fetchProfileImage(); // 처음 로드 시 프로필 사진을 가져옴
  }, []);

  return (
    <div>
      <h3>프로필 수정할거</h3>
      <input type="file" onChange={handleImageChange} />
      {imagePreview && (
        <ImagePreview src={imagePreview} alt="프로필 미리보기" />
      )}
      <button onClick={handleUploadImage}>사진 등록</button>
      <button onClick={handleUpdateImage}>사진 수정</button>
    </div>
  );
}

export default Edit;
