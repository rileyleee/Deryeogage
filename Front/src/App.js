import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from 'aos';
import 'aos/dist/aos.css';  // AOS 스타일시트 임포트

// common
import Header from "./components/Header";
import Footer from "./components/Footer";

// User
import Login from "./pages/User/Login";
import LoginHandeler from "./pages/User/LoginHandeler";
import Profile from "./pages/User/Profile";

// Main
import Home from "./pages/Home";

// Adopt
import AdoptBoard from "./pages/Adopt/AdoptBoard";
import AdoptBoardCreate from "./pages/Adopt/AdoptBoardCreate";
import AdoptBoardDetail from "./pages/Adopt/AdoptBoardDetail";

// Simulation
import Simulation from "./pages/Check/Simulation";
import NoSimulation from "./pages/Check/NoSimulation";
import Survey from "./pages/User/Survey";

import SimulationEnd from "./pages/Check/SimulationEnd";

// Check
import CheckList from "./pages/Check/CheckList";
import CheckListResult from "./pages/Check/CheckListResult";

// NotFound
import NotFound from "./pages/NotFound/NotFound";
import ChatRoomsList from "./pages/ChatVideo/ChatRoomsList";
import ChatVideo from "./pages/ChatVideo/ChatVideo";

function App() {
  useEffect(() => {
    localStorage.setItem("activatedNum", 5); // SomePage에 들어왔을 때 activatedNum을 5로 설정
  }, []);

  return (
    <>
      <div className="container">
        <Router>
          <Header />
          <Routes>
            {/* 메인페이지 */}
            <Route path="/" element={<Home />} />

            {/* 로그인 */}
            <Route path="/login" element={<Login />} />

            {/* Redirect_URI */}
            <Route path="/users/oauth" element={<LoginHandeler />} />

            {/* 입양게시판 */}
            <Route path="/adopt" element={<AdoptBoard />} />
            <Route path="/adopt/create" element={<AdoptBoardCreate />} />
            <Route path="/adopt/:boardId" element={<AdoptBoardDetail />} />
            <Route path="/adopt/chatlist" element={<ChatRoomsList />} />
            <Route path="/adopt/chatroom/:roomId" element={<ChatVideo />} />
            <Route path="/adopt/edit/:boardId" element={<AdoptBoardCreate />} />

            {/* 마이페이지 */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/survey" element={<Survey />} />
            {/* <Route path="/survey/result" element={<SurveyResult />} /> */}

            {/* 시뮬레이션, 사전테스트 */}
            <Route path="/simulations" element={<Simulation />} />
            <Route path="/simulations/end" element={<SimulationEnd />} />
            <Route path="/nosimulations" element={<NoSimulation />} />
            <Route path="/checklist" element={<CheckList />} />
            <Route path="/checklist/result" element={<CheckListResult />} />

            {/* NotFound */}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Router>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default App;
