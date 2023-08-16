import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "../../styled/User/Edit.style";
import "bootstrap/dist/css/bootstrap.min.css";

function Edit({ onClose }) {
  const [profilePic, setProfilePic] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [hasImage, setHasImage] = useState(false); // 이미지가 있는지 여부를 판단하는 상태 변수 추가
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
    // 프로필 이미지 등록
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
      fetchProfileImage(); // 업로드 후 바로 프로필 사진 다시 가져옴
      onClose(); // 업로드 성공 후 모달 닫기
    } catch (error) {
      console.error("An error occurred while uploading the image:", error);
    }
  };

  const handleUpdateImage = async () => {
    // 프로필 이미지 업데이트
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
      fetchProfileImage(); // 수정 후 바로 프로필 사진 다시 가져옴
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
      setImagePreview(response.data);
      if (response.data) {
        // 이미지가 존재하면 hasImage를 true로 설정
        setHasImage(true);
      }
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

  return (
    <div>
      <div className="d-flex flex-column align-items-center">
        <S.EditTitle>프로필 수정하기</S.EditTitle>
        <S.ImgBox className="d-flex flex-column align-items-center">
          {imagePreview && (
            <S.ImagePreview src={imagePreview.data} alt="프로필 미리보기" />
          )}
          <S.ImgInput type="file" onChange={handleImageChange} />
        </S.ImgBox>
      </div>
      <div className="d-flex justify-content-around">
        {!hasImage && ( // 이미지가 없으면 '사진 등록' 버튼만 보이게 함
          <S.ImgChangeBtn onClick={handleUploadImage}>사진 등록</S.ImgChangeBtn>
        )}
        {hasImage && ( // 이미지가 있으면 '사진 수정' 버튼만 보이게 함
          <S.ImgChangeBtn onClick={handleUpdateImage}>사진 수정</S.ImgChangeBtn>
        )}
      </div>
    </div>
  );
}

export default Edit;
