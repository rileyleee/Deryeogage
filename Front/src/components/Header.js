import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'

function Header() {
  // 토큰 유무에 따라 로그인 <-> 마이페이지 변경할 수 있게 쓸거임
  // const insertedToken = localStorage.getItem("Token");
  return (
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
          <a class="navbar-brand" href="/"><img alt='Logo' src="/assets/Logo.png" width="40"/></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/adopt">입양게시판</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/review">입양후기</a>
            </li>
            <li class="nav-item dropdown">
              <button class="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                진단하기
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/simulation">시뮬레이션</a></li>
                <li><a class="dropdown-item" href="/checklist">체크리스트</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">로그인</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
