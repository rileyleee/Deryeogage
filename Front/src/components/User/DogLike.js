import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "../../styled/User/DogLike.style"

function DogLike() {
  const [favoritedPosts, setFavoritedPosts] = useState([]);
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL; // API URL을 지정


  useEffect(() => {
    const fetchFavoritedPosts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${REACT_APP_API_URL}/boards/like`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 좋아요한 게시글의 ID를 get
        const favoriteBoardIds = response.data.data.map((item) => item.boardId);
        // 각 게시글 ID에 대해 세부 정보 get
        const favoritedPostsDetails = await Promise.all(
          favoriteBoardIds.map((boardId) =>
            axios
              .get(`${REACT_APP_API_URL}/boards/each/${boardId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => ({
              boardId: response.data.data[0].id,
                createdDate: response.data.data[0].createdDate.split('T')[0],
                title: response.data.data[0].title, // 제목을 regionCode로 설정 (데이터 구조에 따라 변경 필요)
                name: response.data.data[0].userNickname,
                dogName:  response.data.data[0].name,
                dogAge:  response.data.data[0].age,
                regionCode: response.data.data[0].regionCode,
                imageUrl: Object.values(response.data.data[1])[0], // 첫 번째 이미지 URL
                response,
                
              }) )
          )
        );
        setFavoritedPosts(favoritedPostsDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoritedPosts();
  }, []);


  return (
    <div className="container">
      <S.BoardRow className="row list">
        <div className="col-3 text-center">작성자</div>
        <div className="col-2 text-center">대표 이미지</div>
        <div className="col-4 text-center">찜한 글</div>
        <div className="col-3 text-center">작성 일자</div>
      </S.BoardRow>
      <S.ScrollBar>
      {favoritedPosts.length === 0 ? (
        <div className="text-center">찜한 글이 없습니다.</div>
      ) : (
        favoritedPosts.map((favorite, index) => (
          <S.BoardRow className="row item align-items-center " key={index}>
            <div className="col-3 text-center">{favorite.name}</div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              <S.Image
                src={favorite.imageUrl}
                alt={`${favorite.dogName}의 이미지`}
              />
            </div>
            <S.TitleLink className="col-4 text-center" to={`/adopt/${favorite.boardId}`}>{favorite.title}</S.TitleLink>
            <div className="col-3 text-center">{favorite.createdDate}</div>
          </S.BoardRow>
        ))
      )}
      </S.ScrollBar>
    </div>
  );
}

export default DogLike;
