import { useState } from "react";
import jwtDecode from "jwt-decode";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useParams } from "react-router-dom";
import './AddNewTopic.css'
import BASE_URL from "../../../api/baseapi";

const AddNewTopic = () => {
  const { subjectId } = useParams();
  const [topicName, setTopicName] = useState("");
  const [topicOrder, setOrder] = useState("");
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const handleSubmit = () => {
    if (topicName === '' || topicOrder === '') {
      alert("Do not empty");
      return;
    }

    fetch(
      `${BASE_URL}/api/expert/subject/add/topic/${subjectId}?topicName=${topicName}&topicOrder=${parseInt(
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
    <div className="lesson-detail-header-right">
      <Popup
        trigger={
          <button className="button lesson-detail-header-right-button">
            New topic
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal-data">
           
            <div className="header-data lesson-detail-new-topic-header">
              Add new topic
            </div>
            <div className="content-data lesson-detail-new-topic-content">
              <input
                type="text"
                className=" add-subject-topic-input"
                value={topicName}
                required
                placeholder="Topic name"
                onChange={(e) => setTopicName(e.target.value)}
              />

              <input
                className="add-subject-topic-input"
                type="number"
                min={1}
                value={topicOrder}
                required
                placeholder="Order"
                onChange={(e) => setOrder(e.target.value)}
              />
            </div>
            <div className="actions add-subject-topic-btn-wrap">
              <button onClick={close}>Cancel</button>
              <button
                className="button add-subject-topic-btn lesson-detail-lesson-add-btn"
                onClick={() => handleSubmit()}
              >
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
