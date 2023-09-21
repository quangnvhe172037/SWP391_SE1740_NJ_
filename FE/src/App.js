import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import authapi from "./api/authapi";
import Login from "./pages/Login/Login";
import Home from "./components/Home/Home";
import Register from "./pages/Register/Register";
import Profile from "./components/Profile/Profile";
import BoardCustomer from "./components/BoardCustomer/BoardCustomer";
import BoardAdmin from "./components/BoardAdmin/BoardAdmin";
import BoardExpert from "./components/BoardExpert/BoardExpert";
import SliderList from "./pages/Sliders/Sliders";
import SliderDetail from "./pages/SliderDetail/SliderDetail";

const App = () => {
    const [showExpertBoard, setShowExpertBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = authapi.getCurrentUser();

        if (user && user.role) {
            setCurrentUser(user);
            console.log(user);
            setShowExpertBoard(user.role.includes("EXPERT"));
            setShowAdminBoard(user.role.includes("ADMIN"));
        }

    }, []);

    const logOut = () => {
        authapi.logout();
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

            <li className="nav-item">
              <Link to={"/sliders"} className="nav-link">
                Sliders
              </Link>
            </li>

            {setShowExpertBoard && (
              <li className="nav-item">
                <Link to={"/customer"} className="nav-link">
                  Customer Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/expert"} className="nav-link">
                  Expert Board
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.email}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
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
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/customer" element={<BoardCustomer />} />
            <Route path="/expert" element={<BoardExpert />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/sliders" element={<SliderList />} />
            <Route path="/sliders/edit/:sliderId" element={<SliderDetail/>} />
          </Routes>
        </div>
      </div>
    );
};

export default App;