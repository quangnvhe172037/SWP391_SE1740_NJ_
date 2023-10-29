import { useState } from "react";
import jwtDecode from "jwt-decode";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useParams } from "react-router-dom";
const AddNewTopic = () => {
  const { subjectId } = useParams();
  const [topicName, setTopicName] = useState("");
  const [topicOrder, setOrder] = useState("");
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const handleSubmit = () => {
    fetch(
      `http://localhost:8080/api/expert/subject/add/topic/${subjectId}?topicName=${topicName}&topicOrder=${parseInt(
        topicOrder
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          console.log(response.message);
        }
        return response.text();
      })
      .then((data) => {
        // Xử lý phản hồi từ máy chủ (nếu cần)
        console.log("Posts updated:", data);
        window.location.reload();
        alert("Add topic successfully");
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        // Nếu có lỗi xảy ra trong quá trình gửi yêu cầu, bạn có thể khôi phục giá trị status
      });
  };

  return (
    <div className="">
      <Popup
        trigger={<button className="button"> Add new topic </button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal-data">
            <button className="close-data" onClick={close}>
              &times;
            </button>
            <div className="header-data"> Add new topic </div>
            <div className="content-data">
              <div>
                <span>Topic name:</span>
                <input
                  type="text"
                  value={topicName}
                  required
                  placeholder="Topic name"
                  onChange={(e) => setTopicName(e.target.value)}
                />
              </div>

              <div>
                <span>Order:</span>
                <input
                  type="number"
                  min={1}
                  value={topicOrder}
                  required
                  placeholder="Order"
                  onChange={(e) => setOrder(e.target.value)}
                />
              </div>
            </div>
            <div className="actions">
              <button className="button" onClick={() => handleSubmit()}>
                Save
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default AddNewTopic;
