import "../HandleException/PrivateContent.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock} from "@fortawesome/free-solid-svg-icons";
const PrivateContent = () => {
    return (

      <div className="private-content">
          <div>
              <h1>401 - Unauthorized</h1>
              <p>You are not authorized to access this page.</p>
          </div>

      </div>
    );
};

export default PrivateContent;
