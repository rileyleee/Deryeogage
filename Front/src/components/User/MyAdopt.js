import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
      <CardsContainer>
        {posts.map((post) => (
          <Card key={post.id} onClick={() => navigate(`/adopt/${post.id}`)}>
            <Title>{post.title}</Title>
            <Introduction>{post.introduction}</Introduction>
          </Card>
        ))}
      </CardsContainer>
    </div>
  );
}

export default MyAdopt;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Card = styled.div`
  width: 300px;
  border: 1px solid #ddd;
  padding: 15px;
  margin: 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h3`
  margin: 10px 0;
  color: #333;
`;

const Introduction = styled.p`
  margin: 10px 0;
  color: #666;
`;
