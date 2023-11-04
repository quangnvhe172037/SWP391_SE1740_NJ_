import { useState } from "react";
import ReactQuill from "react-quill";
import jwtDecode from "jwt-decode";
import './AddLessonArticle.css'
import BASE_URL from "../../../../api/baseapi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
const AddLessonArticle = (prop) => {
  const [valueArticle, setValueArticle] = useState([]);
  const [lessonName, setLessonName] = useState("");
  const [lessonOrder, setOrder] = useState();
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const handleSubmit = () => {
    if (valueArticle === "" || lessonName == null || lessonOrder == null) {
      alert("Please enter full field");
      return;
    }

    const dataToSend = {
      lessonName: lessonName,
      lessonOrder: lessonOrder,
      article: valueArticle
    };
    fetch(`${BASE_URL}/api/expert/lesson/add/article/${prop.topic}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    })
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
        alert("Create successfully");
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        // Nếu có lỗi xảy ra trong quá trình gửi yêu cầu, bạn có thể khôi phục giá trị status
      });
  };

  return (
    <div className="">
      <Popup
        trigger={
          <button className="button add-lesson-btn-choice">
            <i class="fa-solid fa-plus"></i> Article
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal-data">
            <div className="header-data lesson-detail-new-topic-header">
              Lesson Article
            </div>
            <div className="content-data lesson-detail-new-topic-content">
              <input
                type="text"
                value={lessonName}
                className=" add-subject-topic-input"
                required
                placeholder="Lesson name"
                onChange={(e) => setLessonName(e.target.value)}
              />

              <input
                type="number"
                className=" add-subject-topic-input"
                min={1}
                value={lessonOrder}
                required
                placeholder="Order"
                onChange={(e) => setOrder(e.target.value)}
              />

              <div className="add-lesson-article-quill">
                <ReactQuill
                  theme="snow"
                  className="creat-post-quill"
                  value={valueArticle}
                  onChange={setValueArticle}
                  required
                />
              </div>
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

export default AddLessonArticle;
