import { useState } from "react";
import jwtDecode from "jwt-decode";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
const AddLessonVideo = (prop) => {
  const [video, setVideo] = useState([]);
  const [lessonName, setLessonName] = useState("");
  const [lessonOrder, setOrder] = useState();
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = () => {
    if (video == null || lessonName === "" || lessonOrder == null) {
      alert("Please enter full field");
      return;
    }

    var regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = video.match(regExp);

    if (match && match[2].length === 11) {
      const videoId = match[2];

      const dataToSend = {
        lessonName: lessonName,
        lessonOrder: lessonOrder,
        video: videoId,
      };

      fetch(`http://localhost:8080/api/expert/lesson/add/video/${prop.topic}`, {
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
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="">
      <Popup
        trigger={
          <button className="button add-lesson-btn-choice">
            <i class="fa-solid fa-plus"></i> Video
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal-data">
            <div className="header-data lesson-detail-new-topic-header">
              Lesson Video
            </div>
            <div className="content-data lesson-detail-new-topic-content">
              <input
                type="text"
                value={lessonName}
                required
                className=" add-subject-topic-input"
                placeholder="Lesson name"
                onChange={(e) => setLessonName(e.target.value)}
              />

              <input
                type="number"
                min={1}
                value={lessonOrder}
                required
                className=" add-subject-topic-input"
                placeholder="Order"
                onChange={(e) => setOrder(e.target.value)}
              />

              <input
                type="text"
                value={video}
                placeholder="Link share Youtube video"
                className=" add-subject-topic-input"
                onChange={(e) => setVideo(e.target.value)}
              />

              {!isValid && <p style={{ color: "red" }}>Invalid Link!</p>}
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

export default AddLessonVideo;
