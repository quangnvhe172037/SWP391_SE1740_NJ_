import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4 col-md-7">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Admin Dashboard</h5>
              <p className="card-text">Welcome to the Admin Dashboard!</p>
              <Link
                to="/account-list"
                className="btn"
                style={{ border: "1px solid black" }}
              >
                View Account List
              </Link>
              <Link
                to="/user-register-list"
                className="btn"
                style={{ border: "1px solid black" }}
              >
                View User Register
              </Link>
              <a
                href="https://sandbox.vnpayment.vn/merchantv2/Users/Login.htm?ReturnUrl=%2fmerchantv2%2fUsers%2fLogout.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ border: "1px solid black", marginLeft: "10px" }}
              >
                View money
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
