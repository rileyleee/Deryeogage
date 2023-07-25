// 분양게시판 전체보기에서 로그인을 하지 않았을 때 "로그인 하고 이용하세요" 
// 라는 글씨 띄워줄 컴포넌트

function NotLogin() {
    return (
        <div>
            <p><a href="/login">로그인</a>을 해서 나와 잘 맞는 강아지를 찾아보세요!</p>
        </div>
    )
}

export default NotLogin