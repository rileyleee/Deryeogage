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
    <div>
      <h1>내 분양글</h1>
      <S.CardsContainer>
        {posts.map((post) => (
          <S.Card key={post.id} onClick={() => navigate(`/adopt/${post.id}`)}>
            <S.Title>{post.title}</S.Title>
            <S.Introduction>{post.introduction}</S.Introduction>
          </S.Card>
        ))}
      </S.CardsContainer>
    </div>
  );
}

export default MyAdopt;
