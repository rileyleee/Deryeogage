import axios from "axios";
import { useEffect, useState } from "react";

function UserProfile({ data }) {
  const [userInfo, setUserInfo] = useState([]);
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  console.log(
    "--------------------------------------------------------------",
    typeof data,
    data
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${REACT_APP_API_URL}/users/profile`, {
          headers: {
            userId: data,
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data.data);
        setUserInfo(response.data.data); // userInfo 상태 업데이트
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [data, REACT_APP_API_URL]);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~", userInfo);
  //   if (!userInfo) {
  //     return <div>Loading...</div>; // or any loading component
  //   }

  return (
    <div>
      <p>

          <img
            src={userInfo.profilePic || "/assets/free-icon-user-847969.png"}
            alt="Profile"
          />{" "}

        {userInfo.nickname}
      </p>
      <p>사전테스트 점수: {userInfo.preTestScore}</p>
    </div>
  ); // 또는 다른 필요한 정보 표시
}

export default UserProfile;
