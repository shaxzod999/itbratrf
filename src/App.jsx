import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import FirstLanding from "./pages/landing/firstLanding";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Projects from "./components/projects";
import Rezume from "./components/rezume";
import Chat from "./components/chat";
import Search from "./components/search";
import Account from "./components/account";
import Notification from "./components/notification";
import NotFound from "./pages/notFound/notFound";
import FavoriteProject from "./components/favoriteProject";
import RoleSelection from "./pages/roll/roleSelection";
import Settings from "./components/settings";
import ChatWindow from "./pages/chats/chatWindow";
import FavoriteResume from "./components/favoriteResume";
import UserAgreement from "./pages/userAgreement/userAgreement";
import RulesOfTheSite from "./pages/rules/rulesOfTheSite";

function App() {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // 768px dan kichik bo'lsa, mobil

  useEffect(() => {
    // Har safar marshrut o'zgarganda sahifani yuqoriga aylantiradi
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Ekran o'lchamini tekshirish
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // O'chirish
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<FirstLanding />} />
        <Route path="/notFound" element={<NotFound />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/user-agreement" element={<UserAgreement />} />
        <Route path="/rules-of-the-site" element={<RulesOfTheSite />} />
        <Route path="/role" element={<RoleSelection />} />
        <Route path="/profile" element={<Profile />}>
          <Route
            path="/profile/favorite-projects"
            element={<FavoriteProject />}
          />
          <Route path="/profile/favorite-resume" element={<FavoriteResume />} />
          <Route path="/profile/settings" element={<Settings />} />
          <Route path="/profile/projects" element={<Projects />} />
          <Route path="/profile/resume" element={<Rezume />} />

          {/* Faqat mobil versiyasi uchun */}
          {isMobile && (
            <>
              <Route path="/profile/chat" element={<Chat />} />
              <Route path="/profile/chat/:id" element={<ChatWindow />} />
            </>
          )}

          {/* Noutbuk uchun yo'llar bo'lmasligi kerak */}
          {!isMobile && (
            <Route path="/profile/chat" element={<Chat />}>
              <Route path="/profile/chat/:id" element={<ChatWindow />} />
            </Route>
          )}

          <Route path="/profile/search" element={<Search />} />
          <Route path="/profile/account" element={<Account />} />
          <Route path="/profile/notification" element={<Notification />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
