import "../HandleException/PrivateContent.css"
const PrivateContent = () => {
    return (

      <div className="private-content">
          <div>
              <h1>401 - Unauthorized</h1>
              <p>You are not authorized to access this page.</p>
              {/* Bạn có thể thêm các yêu cầu hoặc nút điều hướng ở đây nếu cần thiết */}
          </div>

      </div>
    );
};

export default PrivateContent;
