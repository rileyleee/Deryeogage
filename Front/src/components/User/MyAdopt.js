import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as S from "../../styled/User/MyAdopt.style"

function MyAdopt() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL
  // Load user posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(`${REACT_APP_API_URL}/boards/list/user`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer authentication
          },
        });

        setPosts(response.data.data);
      } catch (error) {
        console.error("고장 -0-", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container">
    <S.BoardRow className="row list">
    <div className="col-2 text-center">대표 이미지</div>
      <div className="col-7 text-center">내가 작성한 글</div>
      <div className="col-3 text-center">작성 일자</div>
    </S.BoardRow>
    <S.ScrollBar>
    {posts.length === 0 ? (
      <div className="text-center">찜한 글이 없습니다.</div>
    ) : (
      posts.map((post, index) => (
        <S.BoardRow className="row item align-items-center " key={index}>
          <div className="col-2 d-flex justify-content-center align-items-center">
            <S.Image
              src={post.fileList[0]}
              alt={`${post.dogName}의 이미지`}
            />
          </div>
          <S.TitleLink className="col-7 text-center" to={`/adopt/${post.id}`}>{post.title}</S.TitleLink>
          <div className="col-3 text-center">{post.createdDate.split('T')[0]}</div>
        </S.BoardRow>
      ))
    )}
    </S.ScrollBar>
  </div>
  );
}

export default MyAdopt;
