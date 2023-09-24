import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
import PostList from "./pages/Posts/PostList";
import PostDetail from "./pages/Posts/PostDetail";
import SliderAdd from "./pages/SliderDetail/SliderAdd";



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
              
              <li className="nav-item" style={{ display: "inline-block" }}>
                <Link to={"/sliders"} className="nav-link">
                  Sliders
                </Link>
              </li>
              <li className="nav-item" style={{ display: "inline-block" }}>
                <Link to={"/posts"} className="nav-link">
                  Post
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
              <Route path="/sliders" element={<SliderList />} />

              <Route path="/posts" element={<PostList />} />
              <Route path="/posts/:postId" element={<PostDetail />} />
              <Route path="/sliders/edit/*" element={<SliderDetail />} />

              <Route
                path="/sliders/edit/:sliderId"
                element={<SliderDetail />}
              />

              <Route path="/sliders/add" element={<SliderAdd />} />
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
    </div>
  );
};

export default App;