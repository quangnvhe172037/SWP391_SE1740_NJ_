import { Link } from "react-router-dom";
import './MarketingDashboard.css'

const MarketingDashboard = () => {
 

  return (
    <div>
      This this Marketing dashboard
      <br />
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
};

export default MarketingDashboard;
