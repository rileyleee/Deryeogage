// ImageSection.js

import React from "react";
import * as S from "../../styled/Adopt/AdoptBoardCreate.style";
import styled from "styled-components";

function ImageSection({
  selectedImages,
  selectedVideos,
  handleImageChange,
  handleVideoChange,
  handleImageRemove,
  handleVideoRemove,
  isEditing
}) {
  return (
    <div>
      <S.Span>사진</S.Span>을 등록해주세요.
      <S.FlexContainer>
        {/* "Add Photo" button */}
        <S.ImageContainer>
          <label htmlFor="img-upload">➕</label>
          <input
            type="file"
            multiple
            accept="image/jpeg, image/png, image/gif, image/jpg"
            style={{ display: "none" }}
            id="img-upload"
            onChange={handleImageChange}
            disabled={isEditing}
          />
        </S.ImageContainer>

        {/* Image previews */}
        {selectedImages &&
          selectedImages.length > 0 &&
          selectedImages.map((imageURL, index) => (
            <S.ImageContainer key={index}>
              <S.PreviewImage
                src={imageURL}
                alt={`이미지 미리보기 ${index + 1}`}
                onClick={() => handleImageRemove(index)} // 이 부분 추가
                disabled={isEditing}
              />
            </S.ImageContainer>
          ))}
      </S.FlexContainer>
      <S.Span>동영상</S.Span>을 등록해주세요.
      <S.FlexContainer>
        {/* "Add Video" button */}
        <S.ImageContainer>
          <label htmlFor="video-upload">➕</label>
          <input
            type="file"
            multiple
            accept="video/mp4"
            style={{ display: "none" }}
            id="video-upload"
            onChange={handleVideoChange}
            disabled={isEditing}
          />
        </S.ImageContainer>

        {/* Video previews */}
        {selectedVideos &&
          selectedVideos.length > 0 &&
          selectedVideos.map((videoURL, index) => (
            <S.ImageContainer key={index}>
              <VideoPreview
                src={videoURL}
                alt={`비디오 미리보기 ${index + 1}`}
                autoPlay
                loop
                muted
                onClick={() => handleVideoRemove(index)} // 이 부분 추가
                disabled={isEditing}
              />
            </S.ImageContainer>
          ))}
      </S.FlexContainer>
    </div>
  );
}

export default ImageSection;

const VideoPreview = styled.video`
  width: 100px; // Adjust this to your preferred width
  height: 100px; // Adjust this to your preferred height
  object-fit: cover;
  border-radius: 30px;
`;
