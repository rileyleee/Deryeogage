
<div align="center">
  <img src="./img/로고.PNG" width="50%"/>
</div>

<hr>

# 🎬 1. 주요 기능 시연 영상

<div align="center">
  <img src="./img/시뮬레이션시연영상.gif" width="100%"/>
</div>

<br/>

# 📆 2. 프로젝트 기간 

### 23.07.10 ~ 23.08.18 (6주)

<br/>

# 👪 3. 개발 팀원 소개

|                  이은경                   |                      김서영                       |               김현수                |               이수연                |               이준용               |                    정동교                     |
| :---------------------------------------: | :-----------------------------------------------: | :---------------------------------: | :---------------------------------: | :--------------------------------: | :-------------------------------------------: |
|    <img src="assets/team/앙경.jpg" width="120" height="150" >     |        <img src="assets/team/더영.jpg" width="120" height="150">         | <img src="assets/team/기멘수.jpg" width="120" height="150">  | <img src="assets/team/수염.jpg" width="120" height="150">  | <img src="assets/team/뽀용.jpg" width="120" height="150"> |      <img src="assets/team/교동.png" width="120" height="150">       |
|                 팀장(BE)                  |                     팀원(FE)                      |              팀원(BE)               |              팀원(FE)               |              팀원(BE)              |                   팀원(BE/FE)                    |
| [rileyleee](https://github.com/rileyleee) | [ksykma](https://github.com/ksykma) | [footdev](https://github.com/footdev) | [bagoye](https://github.com/bagoye) | [elle6044](https://github.com/elle6044)  | [dngyj](https://github.com/dngyj) |


<br/>

# 💡 4. 데려가개 소개

## 1) 프로젝트 소개

반려견 양육 시뮬레이션과 입양 프로세스 개선을 통한 무분별한 입양 방지 및 성숙한 입양 문화 도모 위한 서비스 

1. 반려견 양육 시뮬레이션 기능
2. 입양 강아지의 특성과 입양 예정자의 특성을 고려한 매칭 서비스 기능
3. 분양자와 입양자 간 실시간 스트리밍 서비스 기능


## 2) 기획 배경

매체에서 반려동물을 쉽게 접하면서 반려동물을 유기하거나 파양하는 경우도 증가하고 있음 <br/>
E1I5팀은 이러한 문제의 주 원인이 낮은 입양 만족도에 있다고 판단했고,
낮은 입양 만족도의 원인은 다음과 같은 원인일 것이라고 분석했음<br/>

  - 기저원인1: 금액만 지불하면 입양할 수 있는 손 쉬운 입양 방식
  - 기저원인2: 본인의 생활 방식 및 주거 여건 등을 충분히 고려하지 않음
  - 기저원인3: 입양 대상 강아지를 충분히 파악하지 못함

**이를 해결하기 위한 방안으로 상호 간 책임비을 통한 분양 시스템 표준화, 입양자의 여건 파악을 위한 사전테스트와 시뮬레이션, 입양 시 고려해야 할 정보 파악을 위한 설문 조사 기능을 구현함.**

## 3) UCC

#### [데려가개 프로젝트 소개 UCC 보러가기](https://www.youtube.com/watch?v=6YuD0F-pH_E)

<br/>


# 🔎 5. 주요 기능 소개

### (1) 메인페이지 / 로그인페이지

<table>
    <tr> 
        <td> <img src="img/메인페이지.png"> </td>
        <td> <img src="img/로그인페이지.png"> </td>
    </tr>
    <tr> 
        <td> 메인페이지 </td>
        <td> 로그인페이지 </td>
    </tr>
</table>

<br/>

### (2) 반려견 양육 시뮬레이션

- 반려견을 24시간 동안 케어하는 경험을 제공함으로써 플레이하는 유저가 입양에 조금 더 경각심을 갖게 함
- 총 24시간동안 진행, 체력이 0 이하가 되면 강아지 사망, 최종 체력에 따라 칭호 부여
- 주요 시뮬레이션 기능
    - 훈련: 게임을 진행하는 동안 원하는 만큼 훈련 가능(훈련 시 체력 감소)
    - 산책: 게임을 진행하는 동안 최대 3번까지 가능(산책 시 체력 증가, 게임머니 감소)
    - 요구사항: 강아지의 요구사항이 랜덤으로 발생(밥, 화장실, 응급상황)
        - 요구사항을 들어주지 않을 경우 각 요구사항에 따라 체력이 감소
        - 요구사항을 들어줄 경우 각 요구사항에 따라 게임머니 감소, 체력 증가
<table>
    <tr> 
        <td> <img src="img/시뮬레이션_1.png"> </td>
        <td> <img src="img/시뮬레이션_2.png"> </td>
    </tr>
    <tr> 
        <td> 시뮬레이션 - 시작 </td>
        <td> 시뮬레이션 - 강아지 선택 </td>
    </tr>
    <tr> 
        <td> <img src="img/시뮬레이션_3.png"> </td>
        <td> <img src="img/시뮬레이션_4.png"> </td>
    </tr>
    <tr> 
        <td> 시뮬레이션 - 집 선택 </td>
        <td> 시뮬레이션 - 칩 등록 </td>
    </tr>
    <tr> 
        <td> <img src="img/시뮬레이션_5.png"> </td>
        <td> <img src="img/시뮬레이션_6.png"> </td>
    </tr>
    <tr> 
        <td> 시뮬레이션 - 메인 </td>
        <td> 시뮬레이션 - 룰 설명 </td>
    </tr>
    <tr> 
        <td> <img src="img/시뮬레이션_7.png"> </td>
        <td> <img src="img/시뮬레이션_8.png"> </td>
    </tr>
    <tr> 
        <td> 시뮬레이션 - 랜덤 이벤트 (밥) </td>
        <td> 시뮬레이션 - 랜덤 이벤트 (놀이) </td>
    </tr>
    <tr> 
        <td> <img src="img/시뮬레이션_9.png"> </td>
        <td> <img src="img/시뮬레이션_10.png"> </td>
    </tr>
    <tr> 
        <td> 시뮬레이션 - 랜덤 이벤트 (병원) </td>
        <td> 시뮬레이션 - 산책 하기 </td>
    </tr>
    <tr> 
        <td> <img src="img/시뮬레이션_11.png"> </td>
        <td> <img src="img/시뮬레이션_12.png"> </td>
    </tr>
    <tr> 
        <td> 시뮬레이션 - 훈련 시키기 </td>
        <td> 시뮬레이션 - 돈 벌러 가기(퀴즈) </td>
    </tr>
    <tr> 
        <td> <img src="img/시뮬레이션_13.png"> </td>
        <td> <img src="img/시뮬레이션_14.png"> </td>
    </tr>
    <tr> 
        <td> 시뮬레이션 - 중도포기 </td>
        <td> 시뮬레이션 종료 </td>
    </tr>
</table>

<br/>

### (3) 사전 테스트

- 반려견을 입양 하기 전 사전테스트를 진행함으로써 스스로 반려견과 함께 생활하는 데 필요한 준비사항 등을 체크할 수 있게 함 

<table>
    <tr> 
        <td> <img src="img/사전테스트.png"> </td>
        <td> <img src="img/사전테스트_결과확인.png"> </td>
    </tr>
    <tr> 
        <td> 사전테스트 </td>
        <td> 사전테스트 - 결과확인 </td>
    </tr>
</table>

<br/>

### (4) 선호도 조사

- 강아지를 키우는 데 고려될 수 있는 키워드를 바탕으로 중요도를 선택해 나의 생활 환경과 선호 성향을 파악할 수 있음
- 선호도 조사를 완료하게 되면 입양게시판에 해당 수치를 기반으로 나에게 맞는 입양 게시글(반려견)을 추천해줄 수 있음

<table>
    <tr> 
        <td> <img src="img/선호도조사.PNG"> </td>
        <td> <img src="img/선호도조사2.png"> </td>
    </tr>
    <tr> 
        <td> 선호도조사 </td>
        <td> 선호도조사 (드래그앤 드롭으로 순위 변경 가능) </td>
    </tr>
</table>

<br/>

### (5) 입양 게시판

- 입양 게시판을 통해 입양 보내기를 원하는 사용자는 입양 글을 올릴 수 있고, 입양 하기를 원하는 사용자는 화면에 보이는 입양 글을 통해 원하는 반려견의 간략한 정보를 볼 수 있음
- 마음에 드는 반려견의 입양 글을 들어가면 상세 페이지에서 강아지의 기본적인 정보들과 성향, 건강 정보, 입양 보내는 사용자의 간단한 소개글 등을 확인할 수 있음

<table>
    <tr> 
        <td> <img src="img/입양게시판.PNG"> </td>
        <td> <img src="img/상세_1.png"> </td>
        <td> <img src="img/상세_2.png"> </td>
    </tr>
    <tr> 
        <td> 입양게시판 </td>
        <td> 상세페이지 1 </td>
        <td> 상세페이지 2 </td>
    </tr>
</table>

<br/>

### (6) 보호자와 상담(채팅 및 화상)

- 입양하고자 하는 강아지의 보호자와 WebSocket을 통한 실시간 채팅을 진행할 수 있음
- 이를 통해 입양자는 입양하고자 하는 강아지에 대한 자세한 정보를 얻을 수 있고, 분양자는 입양자의 정보, 성향 등 입양 후 양육 적합도를 판단할 수 있는 정보들을 얻을 수 있음
- 이후에 OpenVidu를 통한 화상채팅을 진행하여 입양자와 분양자가 소통하며 반려견과 반려문화에 대한 더욱 자세한 정보들을 얻을 수 있음
- 채팅과 화상채팅은 동시에 진행 가능하며 채팅 내용은 입양 내역 등 정보 기록을 위해 저장됨

<table>
    <tr> 
        <td> <img src="img/채팅.PNG"> </td>
        <td> <img src="img/화상채팅 입장.png"> </td>
        <td> <img src="img/화상채팅.png"> </td>
    </tr>
    <tr> 
        <td> 채팅 </td>
        <td> 화상채팅 입장 </td>
        <td> 화상채팅 진행 </td>
    </tr>
</table>

<br/>

### (7) 책임비 납부 및 반환

- 무분별한 입양/분양을 방지하기 위해 입양 과정에서 입양자와 분양자가 모두 책임비를 부담한 후 각각의 프로세스의 따라 반환
- 책임비는 가상계좌를 통해 납부하며 반환 시 납부한 계좌로 반환됨
- 분양자 : 분양글 작성 후 등록하는 과정에서 책임비를 납부(분양글 삭제 시 반환) 이후 분양이 완료되어 분양자와 입양자가 모두 "입양완료" 버튼을 클릭 시 반환 요청이 가능
- 입양자 : 분양자와 채팅, 화상상담 절차를 진행한 후 분양 일정 등록 시 책임비를 납부. 이후 분양 후 미션 4개를 모두 수행하면 반환 요청이 가능. 반환 미션을 수행하지 않은 경우 해당 책임비는 유기견 관련 기관에 기부됨

<table>
    <tr> 
        <td> <img src="img/입양자 예약.png"> </td>
        <td> <img src="img/카카오페이_1.png"> </td>
        <td> <img src="img/카카오페이_2.png"> </td>
    </tr>
    <tr> 
        <td> 입양 예약 </td>
        <td> 책임비 납부 안내 </td>
        <td> 카카오페이로 납부 </td>
    </tr>
        <tr> 
        <td> <img src="img/입양미션.png"> </td>
        <td> <img src="img/미션완료.png"> </td>
        <td> <img src="img/책임비 반환.png"> </td>
    </tr>
    <tr> 
        <td> 마이페이지에서 미션 진행 </td>
        <td> 미션 완료 후 반환 </td>
        <td> 책임비 반환 </td>
    </tr>
</table>

<br/>


# 🔩 6. 주요 기술 스택 소개

<img src="assets/skill/주요기술스택.PNG"> 

<br/>

# :hammer_and_wrench: 7. 서비스 아키텍처

<img src="assets/skill/시스템아키텍처.PNG"> 

<br/>


# 📚 8. 주요 기획 및 설계 자료

### | [요구사항정의서](https://docs.google.com/spreadsheets/d/1Uqf0YmFeVwYuZPWYLiKWIPeZA8cFOR7hSE0o8xM8RLo/edit#gid=0) | [사용자스토리](https://docs.google.com/spreadsheets/d/1AOAkrt0WQE_8c0uHmOPhKNq8UcjX5U-gLw8P4L1d1dc/edit#gid=0) | [ERD](https://www.erdcloud.com/d/JZdkyKFKmvn88mqBG) | [와이어프레임](https://www.figma.com/file/JjoMiub1PyJ7eyNGYR8V0Z/E1I5-%EA%BC%AC%EC%88%9C%EB%82%B4?type=design&node-id=0-1&mode=design&t=aXh5UjBfkJRemuwG-0) | [API설계서](https://documenter.getpostman.com/view/27233223/2s9YBxZbXu#intro) |

<br/>


# 9. 프로젝트 파일 구조

### BackEnd

```
📦Back
 ┣ 📂gradle
 ┃ ┗ 📂wrapper
 ┃ ┃ ┣ 📜gradle-wrapper.jar
 ┃ ┃ ┗ 📜gradle-wrapper.properties
 ┣ 📂src
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┗ 📂kkosunnae
 ┃ ┃ ┃ ┃ ┃ ┗ 📂deryeogage
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂adopt
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂board
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂chat
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂cost
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mission
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂pretest
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂review
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂simulation
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂survey
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂global
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂custom
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂handler
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂interceptor
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂s3file
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂util
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜DeryeogageApplication.java
 ┃ ┃ ┗ 📂resources
 ┃ ┃ ┃ ┣ 📂static
 ┃ ┗ 📂test
 ┃ ┃ ┗ 📂java
 ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┗ 📂kkosunnae
 ┃ ┃ ┃ ┃ ┃ ┗ 📂deryeogage
```

### FrontEnd
```
📦Front
 ┣ 📂public
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂1
 ┃ ┃ ┣ 📂2
 ┃ ┃ ┣ 📂3
 ┃ ┃ ┣ 📂4
 ┃ ┃ ┣ 📂5
 ┃ ┃ ┣ 📂adopt
 ┃ ┃ ┣ 📂background
 ┃ ┃ ┣ 📂chatimg
 ┃ ┃ ┣ 📂dog_bgi
 ┃ ┃ ┣ 📂emotion
 ┃ ┃ ┣ 📂home
 ┃ ┃ ┣ 📂requirement
 ┃ ┃ ┣ 📂rundogs
 ┃ ┃ ┣ 📂things
 ┃ ┃ ┣ 📂training
 ┃ ┣ 📂audio
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂Adopt
 ┃ ┃ ┣ 📂Button
 ┃ ┃ ┣ 📂Check
 ┃ ┃ ┣ 📂Radio
 ┃ ┃ ┣ 📂Review
 ┃ ┃ ┣ 📂User
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂Adopt
 ┃ ┃ ┣ 📂ChatVideo
 ┃ ┃ ┃ ┣ 📂openvidu
 ┃ ┃ ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┃ ┣ 📂toolbar
 ┃ ┃ ┣ 📂Check
 ┃ ┃ ┣ 📂NotFound
 ┃ ┃ ┣ 📂Review
 ┃ ┃ ┣ 📂User
 ┃ ┣ 📂recoil
 ┃ ┣ 📂styled
 ┃ ┃ ┣ 📂Adopt
 ┃ ┃ ┣ 📂ChatVideo
 ┃ ┃ ┣ 📂Check
 ┃ ┃ ┣ 📂Review
 ┃ ┃ ┣ 📂User
```
