import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyAdopt() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // Load user posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("accessToken");

      try {
        const response = await axios.get("http://localhost:8080/api/boards/list/user", {
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
      {posts.map((post) => (
        <div key={post.id} onClick={() => navigate(`/adopt/${post.id}`)}>
          <h3>{post.title}</h3>
          <p>{post.introduction}</p>
        </div>
      ))}
    </div>
  );
}

export default MyAdopt;
