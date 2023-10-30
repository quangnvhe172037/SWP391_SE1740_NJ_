import { useState } from "react";
import jwtDecode from "jwt-decode";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useEffect } from "react";
const EditLessonVideo = (prop) => {
  const [video, setVideo] = useState([]);
  const[videoId, setVideoId] = useState();
    const [lessonName, setLessonName] = useState("");
    const [lessonOrder, setOrder] = useState();
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    const [isValid, setIsValid] = useState(true);
const GetData = () => {
  useEffect(() => {
    fetch(
      `http://localhost:8080/api/expert/lesson/get/video/${prop.lessonId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })

      .then((dataJson) => {
        setLessonName(dataJson.lessonName);
        setOrder(dataJson.lessonOrder);
        setVideoId(dataJson.video);
      });
  }, []);
};
    const handleSubmit = () => {
      var regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = video.match(regExp);

      if (match && match[2].length === 11) {
        setVideoId(match[2]);

        const dataToSend = {
          lessonName: lessonName,
          lessonOrder: lessonOrder,
          video: match[2],
        };

        fetch(
          `http://localhost:8080/api/expert/lesson/update/video/${prop.lessonId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(dataToSend),
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
            <button className="button" onClick={GetData()}>
              <i class="fa-solid fa-pen-to-square"></i>
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
                  value={videoId}
                  readOnly
                  placeholder="Link share Youtube video"
                  className=" add-subject-topic-input"
                  onChange={(e) => setVideo(e.target.value)}
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

export default EditLessonVideo;
