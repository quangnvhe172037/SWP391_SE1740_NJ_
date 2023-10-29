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

  const handleSubmit = (updateLessonId, order) => {
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
        trigger={<button className="button"> Add New Lesson Video </button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal-data">
            <button className="close-data" onClick={close}>
              &times;
            </button>
            <div className="header-data"> Lesson Video</div>
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

              <div>
                <span>Link Youtube</span>
                <input
                  type="text"
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                />

                {!isValid && <p style={{ color: "red" }}>Invalid Link!</p>}
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

export default AddLessonVideo;
