import { Link, useParams } from "react-router-dom";

import BASE_URL from "../../../api/baseapi";

const MarketingDashboardSideBar = () => {
  return (
    <div className="col-md-2 dashboard-sidebar-wrap">
      <div className="dashboard-sidebar-element">
        <Link
          to={"/sliders"}
          
          className="dashboard-side-bar-element-title"
        >
          View Slider List
        </Link>
      </div>

      <div className="dashboard-sidebar-element">
        <Link
          to={"/marketing/post/manage"}
          className="dashboard-side-bar-element-title"
          
        >
          View My Post
        </Link>
      </div>

     
    </div>
  );
};

export default MarketingDashboardSideBar;
