import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import styles from "./App.module.css";
import jwtDecode from "jwt-decode";
import "react-quill/dist/quill.snow.css";
import authapi from "./api/authapi";
import Login from "./pages/Login/Login";
import Home from "./components/Home/Home";
import ExpertDashboard from "./pages/ExpertDashboard/ExpertDashboard";
import AdminDashboard from "./pages/Dashboard/Dashboard";
import MarketingDashboard from "./pages/MarketingDashboard/MarketingDashboard";
import Register from "./pages/Register/Register";

import ChangePassword from "./components/ChangePassword/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

import SliderList from "./pages/Sliders/Sliders";
import SliderDetail from "./pages/SliderDetail/SliderDetail";
import PostList from "./pages/Posts/PostList";
import PostDetail from "./pages/Posts/PostDetail";
import PostEdit from "./pages/Posts/PostEdit";
import SliderAdd from "./pages/SliderDetail/SliderAdd";
import Footer from "./components/Footer/Footer";
import Profile from "./pages/Profile/Profile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Subject from "./components/Subject/Subject";
import AccountList from "./components/AccountList/AccountList";

import VerifyEmail from "./components/VerifyEmail/VerifyEmail";

import Lesson from "./pages/Lesson/Lesson";
import LessonDetail from "./pages/LessonDetail/LessonDetail";
import CreatePost from "./pages/Posts/CreatePost/CreatePost";
import UserHeader from "./components/Header/Header";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = jwtDecode(token);
        setCurrentUser(user);
        setIsAuthenticated(true);
        setUserRole(user.role); // Lấy và lưu trữ vai trò của người dùng
      } catch (error) {
        console.error("Invalid token:", error);
        setCurrentUser(undefined);
        setIsAuthenticated(false);
        setUserRole(null);
        localStorage.removeItem("token");
      }
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, [location]);

  return (
    <div>
      <UserHeader />

      <div className="container mt-3 wrap" style={{ minHeight: "70vh" }}>
        <Routes>

          {/* All */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account-list" element={<AccountList />} />
          <Route path="/register/verifyEmail/" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />


          {isAuthenticated && (
            <>
          
              <Route path="/sliders" element={<SliderList />} />
              <Route path="/posts" element={<PostList />} />
              <Route path="/posts/view/:postId" element={<PostDetail />} />
              <Route path="/posts/edit/:postId" element={<PostEdit />} />
              <Route path="/sliders/edit/*" element={<SliderDetail />} />
              <Route
                path="/sliders/edit/:sliderId"
                element={<SliderDetail />}
              />
              <Route
                path="/marketing/dashboard"
                element={<MarketingDashboard />}
              />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/expert/dashboard" element={<ExpertDashboard />} />
              <Route path="/sliders/add" element={<SliderAdd />} />
              <Route path="/subject" element={<Subject />} />
              <Route
                path="/subject/:subjectId/lesson/:lessonId"
                element={<Lesson />}
              />
              <Route path="/marketing/post/create" element={<CreatePost />} />

              <Route
                path="/expert/subject/:subjectId/manage"
                element={<LessonDetail />}
              />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
