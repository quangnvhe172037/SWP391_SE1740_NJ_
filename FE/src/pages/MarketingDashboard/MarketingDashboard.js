import { Link } from "react-router-dom";
import "./MarketingDashboard.css";
import jwtDecode from "jwt-decode";
import PrivateContent from "../../components/HandleException/PrivateContent";
import React from "react";
import DashboardContent from "../../components/Dashboard/DashboardContent/DashboardContent";
import BASE_URL from "../../api/baseapi";
import MarketingDashboardSideBar from "./MarketingSidebar/MarketingSidebar";

const MarketingDashboard = () => {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  if (user.role !== "MARKETING") {
    return <PrivateContent />;
  } else {
    return (
      <div className="row">
        <MarketingDashboardSideBar />
        <DashboardContent />
      </div>
    );
  }
};
export default MarketingDashboard;
