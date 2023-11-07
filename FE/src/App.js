import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import jwtDecode from "jwt-decode";
import "react-quill/dist/quill.snow.css";
import authapi from "./api/authapi";
import Login from "./pages/Login/Login";
import Home from "./components/Home/Home";
import ExpertDashboard from "./pages/ExpertDashboard/ExpertDashboard";
import AdminDashboard from "./pages/Dashboard/Dashboard";
import MarketingDashboard from "./pages/MarketingDashboard/MarketingDashboard";
import Register from "./pages/Register/Register";
import PracticeList from "./pages/Practice/PracticeList";
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
import UserHeader from "./components/Header/Header";

import Term from "./components/Term/Term";

import CreatePostManage from "./pages/Posts/ManagePost/CreatePost/CreatePostManage";
import EditPostMange from "./pages/Posts/ManagePost/EditPost/EditPostMange";
import PostListManage from "./pages/Posts/ManagePost/PostListManage/PostListManage";
import PrivateContent from "./components/HandleException/PrivateContent";
import UserRes from "./pages/UserRegistration/RegistrationList";
import ImportQuiz from "./components/ImportQuiz/ImportQuiz";
import SubjectData from "./components/Subject/SubjectData";
import AddSubject from "./components/Subject/AddSubject";
import SubjectDetail from "./pages/SubjectDetail/SubjectDetail";
import UserRegistrationList from "./components/UserRegistrationList/UserRegistrationList";
import UserRegistrationDetail from "./components/UserRegistrationList/UserRegistrationDetail/UserRegistrationDetail";
import QuizAttempt from "./pages/QuizAttempt/QuizAttempt";
import ViewPracticeDetail from "./pages/Practice/ViewPracticeDetail";
import QuizResultData from "./components/Quiz/QuizResult/QuizResultData/QuizResultData";
import QuizResultPage from "./pages/QuizResultPage/QuizResultPage";
import Error404 from "./components/HandleException/Error-404/Error-404";

import QuizReview from "./pages/QuizReview/QuizReview";
import AddPracticeDetail from "./pages/Practice/AddPracticeDetail";

import WishList from "./components/WishList/WishList";

import CheckoutBill from "./pages/CheckoutBill/CheckoutBill";
import PaymentResult from "./pages/PaymentResult/PaymentResult";




const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = jwtDecode(token);
        console.log(token);
        console.log(user);
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
      <ToastContainer />
      <UserHeader />

      <div className="container mt-3 wrap" style={{ minHeight: "70vh" }}>
        <Routes>
          {/* All */}
          <Route path="/private" element={<PrivateContent />} />
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Term />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register/verifyEmail/" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/subject/:subjectId" element={<SubjectDetail />} />
          {isAuthenticated && (
            <>
              <Route path="/sliders" element={<SliderList />} />
              <Route path="/posts" element={<PostList />} />
              <Route path="/posts/view/:postId" element={<PostDetail />} />
              <Route path="/myRegistration" element={<UserRes />} />
              <Route path="/posts/edit/:postId" element={<PostEdit />} />
              <Route path="/sliders/edit/:sliderId" element={<SliderDetail />} />
              <Route path="/add-question/:subjectId" element={<ImportQuiz />} />
              <Route path="/practice" element={<PracticeList />} />

              <Route path="/practice/add" element={<AddPracticeDetail />} />

              <Route
                path="/practice/view/:resultid"
                element={<ViewPracticeDetail />}
              />
              <Route
                path="/sliders/edit/:sliderId"
                element={<SliderDetail />}
              />
              <Route
                path="/marketing/dashboard"
                element={<MarketingDashboard />}
              />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route
                path="/user-registration-list"
                element={<UserRegistrationList />}
              />
              <Route
                path="/user-registration-list/:billID"
                element={<UserRegistrationDetail />}
              />
              <Route path="/expert/dashboard" element={<ExpertDashboard />} />
              <Route path="/sliders/add" element={<SliderAdd />} />
              <Route path="/subject" element={<Subject />} />
              <Route
                path="/subject/:subjectId/lesson/:lessonId"
                element={<Lesson />}
              />
              <Route
                path="/marketing/post/create"
                element={<CreatePostManage />}
              />
              <Route
                path="/marketing/post/edit/:postId"
                element={<EditPostMange />}
              />
              <Route
                path="/expert/subject/:subjectId/manage"
                element={<LessonDetail />}
              />
              <Route
                path="/marketing/post/manage"
                element={<PostListManage />}
              />
              <Route path="/regis" element={<UserRes />} />
              <Route path="/account-list" element={<AccountList />} />

              <Route path="/wishlist" element={<WishList />} />
              <Route path="/add/subject" element={<AddSubject />} />

              <Route path="/expert/subjects" element={<SubjectData />} />

              <Route
                path="/quiz/take/:quizId/:resultId"
                element={<QuizAttempt />}
              />

              <Route
                path="/quiz/:quizId/:resultId/review"
                element={<QuizReview />}
              />

              <Route
                path="/quiz/result/:resultId"
                element={<QuizResultPage />}
              />

              <Route
                path="/payment/checkout/course/:subjectId"
                element={<CheckoutBill />}
              />

              <Route path="/payment/info" element={<PaymentResult />} />
            </>
          )}

          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
