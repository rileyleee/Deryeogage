// 입양게시판 - 게시글 작성 페이지

import React, { useState } from "react";

import GenderRadio from "../../components/Radio/GenderRadio";
import ChipRadio from "../../components/Radio/ChipRadio";
import SurveyPaw from "../../components/SurveyPaw";

import * as S from "../../styled/Adopt/AdoptBoardCreate.style";

function AdoptBoardCreate(props) {
  const [selectedImages, setSelectedImages] = useState([]);

  // 이미지 파일 선택 시 미리보기를 업데이트하는 함수
  const handleImageChange = (event) => {
    const files = event.target.files;
    const selectedImagesArray = [...selectedImages]; // Make a copy of the existing images
    for (let i = 0; i < files.length; i++) {
      selectedImagesArray.push(URL.createObjectURL(files[i]));
    }
    setSelectedImages(selectedImagesArray);
  };

  return (
    <article className="container">
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <div>
          강아지의 <S.Span>사진</S.Span>을 등록해주세요
          <S.AddPic>
            <label htmlFor="dogimg">➕</label>
            <input
              type="file"
              multiple
              accept=".jpg, .jpeg, .png"
              style={{ display: "none" }}
              id="dogimg"
              onChange={handleImageChange} // 이미지 선택 시 미리보기 업데이트
            />
          </S.AddPic>
        </div>

        {/* 선택한 이미지들을 미리보기로 표시 */}
        {selectedImages.length > 0 && (
          <div>
            {selectedImages.map((imageURL, index) => (
              <img
                key={index}
                src={imageURL}
                alt={`미리보기 ${index + 1}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  margin: "5px",
                }}
              />
            ))}
          </div>
        )}
        <S.FlexContainer>
          <S.Box>
            <div>
              강아지의 <S.Span>성격</S.Span>과 <S.Span>특성</S.Span>을
              선택해주세요.
              <S.DogCheck>
                <SurveyPaw title="친화력" />
                <SurveyPaw title="활동량" />
                <SurveyPaw title="의존성" />
                <SurveyPaw title="짖&nbsp;&nbsp;&nbsp;&nbsp;음" />
                <SurveyPaw title="털빠짐" />
              </S.DogCheck>
            </div>
          </S.Box>

          <S.Box>
            <div>
              강아지의 <S.Span>정보</S.Span>를 입력해주세요
              <S.DogInfo>
                <div>
                  <p>
                    이름:
                    <input type="text" name="name" placeholder="이름" />
                  </p>
                  <p>
                    나이:
                    <input type="text" name="age" placeholder="나이" />
                  </p>
                  <p>
                    지역:
                    <input type="text" name="region" placeholder="지역" />
                  </p>
                  <p>
                    성별:
                    <GenderRadio />
                  </p>
                  <p>칩 등록 여부
                    <ChipRadio />
                  </p>
                </div>
              </S.DogInfo>
            </div>
          </S.Box>
        </S.FlexContainer>

        <div>
          강아지의 <S.Span>건강정보</S.Span>를 상세하게 작성해주세요.
          <S.DogTextarea>
            <textarea
              name="health"
              placeholder="강아지의 건강정보를 적어주세요."
            />
          </S.DogTextarea>
        </div>

        <div>
          강아지를 자유롭게 <S.Span>소개</S.Span>해주세요.
          <S.DogTextarea>
            <textarea
              name="introduction"
              placeholder="강아지를 소개해주세요."
            />
          </S.DogTextarea>
        </div>
        <button>등록하기</button>
      </form>
    </article>
  );
}

export default AdoptBoardCreate;
