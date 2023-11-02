import { Link, useParams } from "react-router-dom";
import './DashboardSideBar.css'

const DashboardSideBar = () => {
    return (
      <div className="col-sm-3 dashboard-sidebar-wrap">
        <Link
          to="/account-list"
          className=""
        >
          View Account List
        </Link>
        <a
          href="https://sandbox.vnpayment.vn/merchantv2/Users/Login.htm?ReturnUrl=%2fmerchantv2%2fUsers%2fLogout.htm"
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          View money
        </a>
          <Link
              to="/user-registration-list"
              className=""
          >
              User Registration List
          </Link>
      </div>

    );
};

export default DashboardSideBar;
