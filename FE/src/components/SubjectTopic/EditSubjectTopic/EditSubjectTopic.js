import { useState } from "react";
import jwtDecode from "jwt-decode";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useParams } from "react-router-dom";
const EditSubjectTopic = (prop) => {
  const [topicName, setTopicName] = useState(prop.topicName);
  const [topicOrder, setOrder] = useState(prop.topicOrder);
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const subjectTopicId = prop.topicId;
  const handleSubmit = () => {
    fetch(
      `http://localhost:8080/api/expert/subject/edit/topic/${subjectTopicId}?topicName=${topicName}&topicOrder=${parseInt(
        topicOrder
      )}`,
      {
        method: "PUT",
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
        alert("Edit topic successfully");
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        // Nếu có lỗi xảy ra trong quá trình gửi yêu cầu, bạn có thể khôi phục giá trị status
      });
  };

  return (
    <Popup
      trigger={
        <button className="button lesson-detail-topic-icon">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div className="modal-data">
          <div className="header-data lesson-detail-new-topic-header">
            Edit topic
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
              type="number"
              min={1}
              className=" add-subject-topic-input"
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
  );
};

export default EditSubjectTopic;
