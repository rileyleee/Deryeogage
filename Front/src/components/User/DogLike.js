import React, { useEffect, useState } from "react";
import axios from "axios";

function DogLike() {
  const [favoritedPosts, setFavoritedPosts] = useState([]);
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL; // API URL을 지정합니다.

  useEffect(() => {
    const fetchFavoritedPosts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${REACT_APP_API_URL}/boards/like`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data); // 로깅

        // 좋아요한 게시글의 ID를 가져옵니다.
        const favoriteBoardIds = response.data.data.map((item) => item.boardId);
        // 각 게시글 ID에 대해 세부 정보를 가져옵니다.
        const favoritedPostsDetails = await Promise.all(
          favoriteBoardIds.map((boardId) =>
            axios
              .get(`${REACT_APP_API_URL}/boards/each/${boardId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => ({
                title: response.data.data[0].regionCode, // 제목을 regionCode로 설정 (데이터 구조에 따라 변경 필요)
                name: response.data.data[0].userId, // 이름을 userId로 설정 (데이터 구조에 따라 변경 필요)
                imageUrl: Object.values(response.data.data[1])[0], // 첫 번째 이미지 URL
              }))
          )
        );
        console.log(favoritedPostsDetails); // 로깅
        setFavoritedPosts(favoritedPostsDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoritedPosts();
  }, []);

  console.log(favoritedPosts); // 로깅

  return (
    <div>
      <h1>내가 찜한 내역</h1>
      {favoritedPosts.length > 0 ? (
        <ul>
          {favoritedPosts.map((post, index) => (
            <li key={index}>
              <h3>{post.title}</h3>
              <p>이름: {post.name}</p>
              <img src={post.imageUrl} alt={`이미지 ${index}`} />
            </li>
          ))}
        </ul>
      ) : (
        <p>찜한 게시글이 없습니다.</p>
      )}
    </div>
  );
}

export default DogLike;
