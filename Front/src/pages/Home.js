// 메인페이지

function Home() {
  return (
    <div id="home">
      <h1>Main Page</h1>
      <div>
        <p>시뮬레이션을 통해 가상으로 강아지를 키워보세요!</p>
        <a href={"/simulation"}> 👉시뮬레이션하러 가기</a>
      </div>
      <div>
        <p>선호도 조사를 통해 나의 생활에 맞는 강아지를 찾아보세요!</p>
        <a href={"/survey"}> 👉선호도 조사하러 가기</a>
      </div>
      <div>
        <p>
          입양 전 사전테스트를 통해 강아지를 키울 준비가 되었는지 확인해보세요!
        </p>
        <a href={"/checklist"}> 👉입양 전 사전테스트하러 하러 가기</a>
      </div>
    </div>
  );
}

export default Home;
