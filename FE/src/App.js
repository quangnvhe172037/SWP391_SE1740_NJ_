import React, {useState, useEffect} from "react";
import {Routes, Route, Link, Navigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import styles from "./App.module.css"
import jwtDecode from "jwt-decode";

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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import AccountList from "./components/AccountList/AccountList";

const App = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {

        setIsDropdownOpen(!isDropdownOpen);
    };


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
            <nav
                className="navbar navbar-expand"
                style={{
                    backgroundColor: "white",
                    boxShadow: "0 2px 4px lightgrey",
                    borderBottom: "1px solid black",
                    height: "72px"
                }}
            >
                <Link to={"/"} className="navbar-brand" style={{color: "black", fontSize: "1.4rem", fontWeight: "700"}}>
                    Quizzi AIM CÓC VÀNG
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link" style={{color: "black"}}>
                            Home
                        </Link>
                    </li>

                    {isAuthenticated && (
                        <>

                        </>
                    )}
                </div>

                <div className="navbar-nav ml-auto">
                    {isAuthenticated ? (
                        <>
                            <li className="nav-item" onClick={toggleDropdown}>
                      <span className="nav-link" style={{color: "black", cursor: "pointer"}}>
                        Hello, {currentUser.sub}{' '}
                          <FontAwesomeIcon icon={faAngleDown}/>
                      </span>
                                {isDropdownOpen && (
                                    <ul className={`${styles['dropdown-menu']} ${isDropdownOpen ? '' : styles['dropdown-menu-closed']}`}>
                                        <li>
                                            <Link to="/profile" className="dropdown-item">
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/account" className="dropdown-item">
                                                Account
                                            </Link>
                                        </li>

                                    </ul>
                                )}
                            </li>

                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={logOut} style={{color: "black"}}>
                                    LogOut
                                </a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link" style={{color: "black"}}>
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link" style={{color: "black"}}>
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    )}
                </div>
            </nav>

            <div className="container mt-3 wrap" style={{minHeight: "70vh"}}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/change-password" element={<ChangePassword/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    {isAuthenticated ? (
                        <>
                            <Route path="/sliders" element={<SliderList/>}/>

                            <Route path="/posts" element={<PostList/>}/>
                            <Route path="/posts/view/:postId" element={<PostDetail/>}/>
                            <Route path="/posts/edit/:postId" element={<PostEdit/>}/>

                            <Route path="/sliders/edit/*" element={<SliderDetail/>}/>

                            <Route
                                path="/sliders/edit/:sliderId"
                                element={<SliderDetail/>}
                            />

                            <Route path="/marketingrole" element={<MarketingDashboard/>}/>
                            <Route path="/adminrole" element={<AdminDashboard/>}/>
                            <Route path="/expertrole" element={<ExpertDashboard/>}/>

                            <Route path="/sliders/add" element={<SliderAdd/>}/>

                            <Route path="/sliders/add" element={<SliderAdd/>}/>
                        </>
                    ) : (
                        <>
                            <Route path="/customer" element={<Navigate to="/login"/>}/>
                            <Route path="/expert" element={<Navigate to="/login"/>}/>
                            <Route path="/admin" element={<Navigate to="/login"/>}/>
                        </>
                    )}
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/account-list" element={<AccountList/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    );
};

export default App;
