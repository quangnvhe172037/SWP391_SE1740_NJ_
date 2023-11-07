import { Link, useParams } from "react-router-dom";
import "./DashboardSideBar.css";
import BASE_URL from "../../../api/baseapi";

const DashboardSideBar = () => {
  return (
    <div className="col-md-2 dashboard-sidebar-wrap">
      <div className="dashboard-sidebar-element">
        <Link to="/account-list" className="dashboard-side-bar-element-title">
          View Account List
        </Link>
      </div>

      <div className="dashboard-sidebar-element">
        <a
          href="https://sandbox.vnpayment.vn/merchantv2/Users/Login.htm?ReturnUrl=%2fmerchantv2%2fUsers%2fLogout.htm"
          target="_blank"
          rel="noopener noreferrer"
          className="dashboard-side-bar-element-title"
        >
          View money
        </a>
      </div>

      <div className="dashboard-sidebar-element">
        <Link
          to="/user-registration-list"
          className="dashboard-side-bar-element-title"
        >
          User Registration List
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
