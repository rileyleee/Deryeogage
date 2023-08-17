// ImageSection.js

import React from "react";
import * as S from "../../styled/Adopt/ImageSection.style";
import { PiPawPrintFill } from "react-icons/pi";

function ImageSection({
  selectedImages,
  selectedVideos,
  handleImageChange,
  handleVideoChange,
  handleImageRemove,
  handleVideoRemove,
  isEditing,
}) {
  return (
    <div>
        <S.MediaSection>
        <PiPawPrintFill style={{color:"#FF914D", marginBottom:"0.2vw"}}></PiPawPrintFill><S.Span> 사진</S.Span>을 등록해주세요.{" "}
          <S.SamllText>(사진등록은 필수입니다.)</S.SamllText>
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
                  />
                </S.ImageContainer>
              ))}
          </S.FlexContainer>
        </S.MediaSection>

        <S.MediaSection>
        <PiPawPrintFill style={{color:"#FF914D", marginBottom:"0.2vw"}}></PiPawPrintFill><S.Span> 동영상</S.Span>을 등록해주세요.
          <S.SamllText>(동영상은 선택사항입니다.)</S.SamllText>
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
                  <S.VideoPreview
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
        </S.MediaSection>
    </div>
  );
}

export default ImageSection;
