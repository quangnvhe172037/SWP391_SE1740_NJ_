import { Link } from "react-router-dom";
import './MarketingDashboard.css'
import jwtDecode from "jwt-decode";
import PrivateContent from "../../components/HandleException/PrivateContent";
import React from "react";

const MarketingDashboard = () => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    if (user.role !== "MARKETING") {
        return (
            <PrivateContent />
        )
    } else {
        return (
            <div className="admin-container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4 col-md-7">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Marketing Dashboard</h5>
                                <p className="card-text">Welcome to the Admin Dashboard!</p>
                            
                                <Link to={"/sliders"} className="btn" style={{ border: "1px solid black" }}>View Slider List</Link>
                            
                                <Link to={"/marketing/post/manage"} className="btn" style={{ border: "1px solid black", marginLeft: "10px" }}>View My Post</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    };
}
export default MarketingDashboard;
