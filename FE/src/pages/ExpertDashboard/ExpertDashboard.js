import React from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import PrivateContent from "../../components/HandleException/PrivateContent";
import BASE_URL from "../../api/baseapi";
const ExpertDashboard = () => {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  if (user.role !== "EXPERT") {
    return <PrivateContent />;
  } else {
    return (
      <div className="admin-container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4 col-md-7">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Expert Dashboard</h5>
                <p className="card-text">Welcome to the Expert Dashboard!</p>
                <Link
                  to="/expert/subjects"
                  className="btn"
                  style={{ border: "1px solid black" }}
                >
                  View Subject List
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ExpertDashboard;
