import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import jwtDecode from "jwt-decode";

import authapi from "./api/authapi";
import Login from "./pages/Login/Login";
import Home from "./components/Home/Home";
import Register from "./pages/Register/Register";
import Profile from "./components/Profile/Profile";
import BoardCustomer from "./components/BoardCustomer/BoardCustomer";
import BoardAdmin from "./components/BoardAdmin/BoardAdmin";
import BoardExpert from "./components/BoardExpert/BoardExpert";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import SliderList from "./pages/Sliders/Sliders";
import SliderDetail from "./pages/SliderDetail/SliderDetail";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = jwtDecode(token);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token:", error);
        setCurrentUser(undefined);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const logOut = () => {
    authapi.logout();
    setCurrentUser(undefined);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Quizzi
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {isAuthenticated && (
            <li>
              <li className="nav-item">
                <Link to={"/customer"} className="nav-link">
                  Customer Board
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/expert"} className="nav-link">
                  Expert Board
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/sliders"} className="nav-link">
                  Sliders
                </Link>
              </li>
            </li>
          )}
        </div>

        <div className="navbar-nav ml-auto">
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Hello, {currentUser.sub}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ChangePassword />} />
          {isAuthenticated ? (
            <>
              <Route path="/customer" element={<BoardCustomer />} />
              <Route path="/expert" element={<BoardExpert />} />
              <Route path="/admin" element={<BoardAdmin />} />
              <Route path="/sliders" element={<SliderList />} />
              <Route path="/sliders/edit/*" element={<SliderDetail />} />
            </>
          ) : (
            <>
              <Route path="/customer" element={<Navigate to="/login" />} />
              <Route path="/expert" element={<Navigate to="/login" />} />
              <Route path="/admin" element={<Navigate to="/login" />} />
            </>
          )}
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
      <footer className="py-8 lg:pt-16 lg:pb-10 bg-[rgb(24,24,33)] px-4">
        <div className="container mx-auto ">
          <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:justify-items-center">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  className="h-10 w-10"
                  src="https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
                  alt=""
                />
                <h1 className="capitalize font-bold text-white">
                  Học Lập Trình Để Đi Làm
                </h1>
              </div>
              <h3 className="text-tuyn-gray mb-2 text-sm">
                Điện thoại: 0246.329.1102
              </h3>
              <h3 className="text-tuyn-gray mb-2 text-sm">
                Email: contact@fullstack.edu.vn
              </h3>
              <h3 className="text-tuyn-gray mb-2 text-sm">
                Địa chỉ: Nhà D9, lô A10, Nam Trung Yên, Trung Hòa, Cầu Giấy, Hà
                Nội
              </h3>
            </div>
            <div>
              <h1 className="capitalize font-bold text-white mb-3">VỀ F8</h1>
              <h3 className="text-tuyn-gray mb-2 text-sm">Giới thiệu</h3>
              <h3 className="text-tuyn-gray mb-2 text-sm">Cơ hội việc làm</h3>
              <h3 className="text-tuyn-gray mb-2 text-sm">Đối tác</h3>
            </div>
            <div>
              <h1 className="capitalize font-bold text-white mb-3">HỖ TRỢ</h1>
              <h3 className="text-tuyn-gray mb-2 text-sm">Liên hệ</h3>
              <h3 className="text-tuyn-gray mb-2 text-sm">Bảo mật</h3>
              <h3 className="text-tuyn-gray mb-2 text-sm">Điều khoản</h3>
            </div>
            <div>
              <h1 className="capitalize font-bold text-white mb-3">
                CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC F8
              </h1>
              <h3 className="text-tuyn-gray mb-2 text-sm">
                Mã số thuế: 0109922901
              </h3>
              <h3 className="text-tuyn-gray mb-2 text-sm">
                Ngày thành lập: 04/03/2022
              </h3>
              <h3 className="text-tuyn-gray mb-2 text-sm">
                Lĩnh vực: Công nghệ, giáo dục, lập trình. F8 xây dựng và phát
                triển những sản phẩm mạng lại giá trị cho cộng đồng.
              </h3>
            </div>
          </section>
          <section className="flex mt-5">
            <h3 className="text-tuyn-gray mb-2 text-sm">
              © 2018 - 2022 F8. All rights reserved.
            </h3>
          </section>
        </div>
      </footer>
    </div>
  );
};

export default App;
