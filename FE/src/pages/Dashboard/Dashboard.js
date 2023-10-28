import React from "react";
import {Link} from "react-router-dom";
import jwtDecode from "jwt-decode";
import PrivateContent from "../../components/HandleException/PrivateContent";
import DashboardSideBar from "../../components/Dashboard/DashBoardSidebar/DashboardSideBar";
import DashboardContent from "../../components/Dashboard/DashboardContent/DashboardContent";

const AdminDashboard = () => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    if (user.role !== "ADMIN") {
        return (
            <PrivateContent/>
        )
    } else {
    return (
        <div className="admin-container mt-5 row">
            <DashboardSideBar />
            <DashboardContent/>
        </div>
    );}
};

export default AdminDashboard;
