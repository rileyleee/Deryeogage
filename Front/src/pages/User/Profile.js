import React from "react";
import UserInfo from "../../components/User/UserInfo"
import * as S from "../../styled/User/Profile.style"
import BoardGroup from "../../components/User/BoardGroup";

function Profile() {

    // const [activeTab, setActiveTab] = useState("");
  return (
    <S.ProfileWrap>
      <UserInfo />
      <BoardGroup />
    </S.ProfileWrap>
  );
}

export default Profile;

