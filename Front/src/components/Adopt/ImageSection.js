// ImageSection.js

import React from "react";
import * as S from "../../styled/Adopt/AdoptBoardCreate.style";

function ImageSection({ selectedImages, handleImageChange }) {
  return (
    <div>
      강아지의 <S.Span>사진</S.Span>을 등록해주세요.
      <S.FlexContainer>
        {/* "Add Photo" button */}
        <S.ImageContainer>
          <label htmlFor="dogimg">➕</label>
          <input
            type="file"
            multiple
            accept=".jpg, .jpeg, .png"
            style={{ display: "none" }}
            id="dogimg"
            onChange={handleImageChange}
          />
        </S.ImageContainer>

        {/* Image previews */}
        {selectedImages.length > 0 &&
          selectedImages.map((imageURL, index) => (
            <S.ImageContainer key={index}>
              <S.PreviewImage src={imageURL} alt={`미리보기 ${index + 1}`} />
            </S.ImageContainer>
          ))}
      </S.FlexContainer>
    </div>
  );
}

export default ImageSection;
