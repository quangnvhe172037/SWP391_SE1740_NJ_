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
            <li className="nav-item" onClick={toggleDropdown}>
              <span
                className="nav-link"
                style={{ color: "black", cursor: "pointer" }}
              >
                Hello, {currentUser.sub} <FontAwesomeIcon icon={faAngleDown} />
              </span>
              {isDropdownOpen && (
                <ul
                  className={`${styles["dropdown-menu"]} ${
                    isDropdownOpen ? "" : styles["dropdown-menu-closed"]
                  }`}
                >
                  <li>
                    <Link to="/profile" className="dropdown-item" style={{padding: "20px"}}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/account" className="dropdown-item" style={{padding: "20px"}}>
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
