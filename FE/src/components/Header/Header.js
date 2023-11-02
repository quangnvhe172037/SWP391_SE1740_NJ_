import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import authapi from "../../api/authapi";
import jwtDecode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";
const UserHeader = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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

  const logOut = () => {
    authapi.logout();
    setCurrentUser(undefined);
    setIsAuthenticated(false);
    setUserRole(null);
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
          height: "72px",
        }}
      >
        <Link
          to={"/"}
          className="navbar-brand"
          style={{ color: "black", fontSize: "1.4rem", fontWeight: "700" }}
        >
          Quizzi Learn Is Never Late
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link" style={{ color: "black" }}>
              Home
            </Link>
          </li>
        </div>
        <div className="navbar-nav ml-auto">
          {isAuthenticated ? (
            <>
              {userRole === "ADMIN" && (
                <li className="nav-item">
                  <span className="nav-link">
                    <Link
                      to="/account-list"
                      style={{
                        padding: "20px",
                        color: "black",
                        textDecoration: "none",
                      }}
                      // className="btn"
                      // style={{ border: "1px solid black" }}
                    >
                      View Account List
                    </Link>
                    <a
                      href="https://sandbox.vnpayment.vn/merchantv2/Users/Login.htm?ReturnUrl=%2fmerchantv2%2fUsers%2fLogout.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: "20px",
                        color: "black",
                        textDecoration: "none",
                      }}
                      // className="btn"
                      // style={{ border: "1px solid black", marginLeft: "10px" }}
                    >
                      View money
                    </a>
                    <Link
                        to="/user-registration-list"
                        style={{
                          padding: "20px",
                          color: "black",
                          textDecoration: "none",
                        }}
                    >
                        User Registration List
                    </Link>
                    <Link
                      to="/admin/dashboard"
                      style={{
                        padding: "20px",
                        color: "black",
                        textDecoration: "none",
                      }}
                    >
                      Admin Dashboard
                    </Link>
                  </span>
                </li>
              )}
              {userRole === "MARKETING" && (
                <li className="nav-item">
                  <span className="nav-link">
                    <Link
                      to={"/sliders"}
                      className="btn"
                      style={{
                        padding: "20px",
                        color: "black",
                        textDecoration: "none",
                      }}
                    >
                      View Slider List
                    </Link>

                    <Link
                      to={"/marketing/post/manage"}
                      className="btn"
                      style={{
                        padding: "20px",
                        color: "black",
                        textDecoration: "none",
                      }}
                    >
                      View My Post
                    </Link>

                    <Link
                      to="/marketing/dashboard"
                      style={{
                        padding: "20px",
                        color: "black",
                        textDecoration: "none",
                      }}
                    >
                      Marketing Dashboard
                    </Link>
                  </span>
                </li>
              )}
              {userRole === "EXPERT" && (
                <li className="nav-item">
                  <span className="nav-link">
                    <Link
                      to="/expert/dashboard"
                      style={{
                        padding: "20px",
                        color: "black",
                        textDecoration: "none",
                      }}
                    >
                      Expert Dashboard
                    </Link>
                  </span>
                </li>
              )}

              <li className="nav-item" onClick={toggleDropdown}>
                <span
                  className="nav-link"
                  style={{ color: "black", cursor: "pointer" }}
                >
                  Hello, {currentUser.sub}{" "}
                  <FontAwesomeIcon icon={faAngleDown} />
                </span>

                {isDropdownOpen && (
                  <ul
                    className={`${styles["dropdown-menu"]} ${
                      isDropdownOpen ? "" : styles["dropdown-menu-closed"]
                    }`}
                  >
                    <li>
                      <Link
                        to="/profile"
                        className="dropdown-item"
                        style={{ padding: "20px" }}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/myRegistration"
                        className="dropdown-item"
                        style={{ padding: "20px" }}
                      >
                        Go to my learning
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item">
                <a
                  href="/login"
                  className="nav-link"
                  onClick={logOut}
                  style={{ color: "black" }}
                >
                  LogOut
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  to={"/login"}
                  className="nav-link"
                  style={{ color: "black" }}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/register"}
                  className="nav-link"
                  style={{ color: "black" }}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default UserHeader;
