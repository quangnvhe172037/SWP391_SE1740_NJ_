import { Link, useParams } from "react-router-dom";
import './Error-404.css'
import BASE_URL from "../../../api/baseapi";
const NotFoundException = () => {
  return (
    <div className="not-found-wrap">
      
      <img
        src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
        alt="not-found"
        className="error-404-img"
      />
      {/* <Link to="/" className="link-home">
        Go Home
      </Link> */}
    </div>
  );
};

export default NotFoundException;
