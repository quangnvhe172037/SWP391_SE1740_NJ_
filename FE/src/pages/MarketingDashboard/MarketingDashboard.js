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
            <PrivateContent/>
        )
    } else {
        return (
            <div>
                This this Marketing dashboard
                <br/>
                <div>
                    <button>
                        <Link to={"/sliders"}>View Slider List</Link>
                    </button>
                </div>


                <div>
                    <button>
                        <Link to={"/marketing/post/manage"}>View My Post</Link>
                    </button>
                </div>

            </div>
        );
    }
};

export default MarketingDashboard;
