// 마이페이지(프로필)

function Profile() {
  let nickname = localStorage.getItem("nickname")
  return (
    <div>
      <h1>마이페이지</h1>
      <h3>안녕하세요 {nickname}님 !</h3>
    </div>
  );
}

export default Profile;
