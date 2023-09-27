import { Link } from "react-router-dom";
import './MarketingDashboard.css'

const MarketingDashboard = () => {
 

  return (
      <div>
      This this Marketing dashboard
      <br />
      <button >
        <Link to={"/sliders"}>
          View Slider List
        </Link>
      </button>
    </div>
  );
};

export default MarketingDashboard;
