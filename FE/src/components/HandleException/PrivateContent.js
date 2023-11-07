import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../HandleException/PrivateContent.css";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import BASE_URL from "../../api/baseapi";
const PrivateContent = () => {
  return (
    <div className="private-content">
      <div>
        <h1>401 - Unauthorized</h1>
        <p>You are not authorized to access this page.</p>
        {/* Bạn có thể thêm các yêu cầu hoặc nút điều hướng ở đây nếu cần thiết */}
        <p>
          <FontAwesomeIcon icon={faLock} />
        </p>
      </div>
    </div>
  );
};

export default PrivateContent;
