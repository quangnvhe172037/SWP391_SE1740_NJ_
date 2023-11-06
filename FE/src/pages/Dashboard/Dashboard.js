import React from "react";
import jwtDecode from "jwt-decode";
import PrivateContent from "../../components/HandleException/PrivateContent";
import DashboardContent from "../../components/Dashboard/DashboardContent/DashboardContent";
import "./Dashboard.css";
import BillChart from "../../components/Charts/BillChart";
import BillChartProfit from "../../components/Charts/BillChartProfit";
import BASE_URL from "../../api/baseapi";
import DashboardSideBar from "../../components/Dashboard/DashBoardSidebar/DashboardSideBar";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  if (user.role !== "ADMIN") {
    return <PrivateContent />;
  } else {
    return (
      <div className="row">
        <DashboardSideBar/>
        <DashboardContent/>
      </div>
     
    );
  }
};

export default AdminDashboard;
