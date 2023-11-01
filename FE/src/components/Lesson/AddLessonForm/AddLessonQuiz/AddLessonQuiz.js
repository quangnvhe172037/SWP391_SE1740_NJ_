import { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import jwtDecode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
const AddLessonQuiz = (prop) => {
 const { subjectId } = useParams();
  const [lessonName, setLessonName] = useState("");
  const [lessonOrder, setOrder] = useState();
  const [quizDescription, setQuizDescription] = useState("");
 const [durationTime, setDurationTime] = useState("");
  const [passRate, setPassRate] = useState("");
  

 const token = localStorage.getItem("token");
 const user = jwtDecode(token);

  const handleSubmit = () => {
   const dataToSend = {
     lessonName: lessonName,
     lessonOrder: lessonOrder,
     quizDescription: quizDescription,
     durationTime: durationTime,
     passRate: passRate
   };
   fetch(
     `http://localhost:8080/api/expert/lesson/add/quiz/${prop.topic}`,
     {
       method: "POST",
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
 };

 


  return (
    <div>
      <Popup
        trigger={
          <button className="button add-lesson-btn-choice">
            <i class="fa-solid fa-plus"></i>
            Quiz
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal-data">
            <div className="header-data lesson-detail-new-topic-header">
              Add new quiz lesson
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
                className=" add-subject-topic-input"
                value={lessonOrder}
                required
                placeholder="Order"
                onChange={(e) => setOrder(e.target.value)}
              />

              <input
                className=" add-subject-topic-input"
                type="text"
                value={quizDescription}
                required
                placeholder="Quiz description"
                onChange={(e) => setQuizDescription(e.target.value)}
              />

              <input
                type="number"
                className=" add-subject-topic-input"
                value={durationTime}
                required
                placeholder="Duration time (in minutes)"
                onChange={(e) => setDurationTime(e.target.value)}
              />

              <input
                type="number"
                value={passRate}
                className=" add-subject-topic-input"
                required
                min={0}
                max={100}
                placeholder="Pass rate"
                onChange={(e) => setPassRate(e.target.value)}
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
export default AddLessonQuiz;
