import { useState } from "react";
import ReactQuill from "react-quill";
import jwtDecode from "jwt-decode";
import './AddLessonArticle.css'

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
const AddLessonArticle = (prop) => {
  const [valueArticle, setValueArticle] = useState([]);
  const [lessonName, setLessonName] = useState("");
  const [lessonOrder, setOrder] = useState();
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const handleSubmit = () => {
    const dataToSend = {
      lessonName: lessonName,
      lessonOrder: lessonOrder,
      article: valueArticle
    };
    fetch(`http://localhost:8080/api/expert/lesson/add/article/${prop.topic}`, {
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
        trigger={<button className="button"> Add New Lesson Article </button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal-data">
            <button className="close-data" onClick={close}>
              &times;
            </button>
            <div className="header-data"> Lesson Article</div>
            <div className="content-data">
              <div>
                <span>Lesson name:</span>
                <input
                  type="text"
                  value={lessonName}
                  required
                  placeholder="Lesson name"
                  onChange={(e) => setLessonName(e.target.value)}
                />
              </div>

              <div>
                <span>Order:</span>
                <input
                  type="number"
                  min={1}
                  value={lessonOrder}
                  required
                  placeholder="Order"
                  onChange={(e) => setOrder(e.target.value)}
                />
              </div>
              <div  className="add-lesson-article-quill" >
                <ReactQuill
                theme="snow"
                className="creat-post-quill"
                
                value={valueArticle}
                onChange={setValueArticle}
                required
              />
              </div>
              
            </div>
            <div className="actions">
              <button className="button" onClick={() => handleSubmit()}>
                Save
              </button>
              <button
                className="button"
                onClick={() => {
                  close();
                }}
              >
                close modal
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default AddLessonArticle;
