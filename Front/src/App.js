import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

// Review
import ReviewBoard from "./pages/Review/ReviewBoard";
import ReviewBoardCreate from "./pages/Review/ReviewBoardCreate";
import ReviewBoardDetail from "./pages/Review/ReviewBoardDetail";

// Simulation
import Simulation from "./pages/Check/Simulation";
import CheckList from "./pages/Check/CheckList";
import CheckListResult from "./pages/Check/CheckListResult";

// Check

function App() {
  return (
    <div>
      <Router>
        <Header />

        <Routes>
          {/* 메인페이지 */}
          <Route path="/" element={<Home />} />

          {/* 로그인 */}
          <Route path="/login" element={<Login />} />

          {/* Redirect_URI */}
          <Route path="/oauth" element={<LoginHandeler />} />

          {/* 입양게시판 */}
          <Route path="/adopt" element={<AdoptBoard />} />
          <Route path="/adopt/create" element={<AdoptBoardCreate />} />
          <Route path="/adopt/:id" element={<AdoptBoardDetail />} />

          {/* 입양후기게시판 */}
          <Route path="/review" element={<ReviewBoard />} />
          <Route path="/review/create" element={<ReviewBoardCreate />} />
          <Route path="/review/:id" element={<ReviewBoardDetail />} />

          {/* 마이페이지 */}
          <Route path="/profile/:id" element={<Profile />} />

          {/* 시뮬레이션, 사전테스트 */}
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/checklist" element={<CheckList />} />
          <Route path="/checklist/:id" element={<CheckListResult />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
