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
        trigger={<button className="button"> Add quiz lesson </button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal-data">
            <button className="close-data" onClick={close}>
              &times;
            </button>
            <div className="header-data"> Add new quiz lesson </div>
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
                <span>Description:</span>
                <input
                  type="text"
                  value={quizDescription}
                  required
                  placeholder="Quiz description"
                  onChange={(e) => setQuizDescription(e.target.value)}
                />
              </div>

              <div>
                <span>Duration time (minutes):</span>
                <input
                  type="number"
                  value={durationTime}
                  required
                  placeholder="Duration time"
                  onChange={(e) => setDurationTime(e.target.value)}
                />
              </div>

              <div>
                <span>Pass rate:</span>
                <input
                  type="number"
                  value={passRate}
                  required
                  min={0}
                  max={100}
                  placeholder="Pass rate"
                  onChange={(e) => setPassRate(e.target.value)}
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
export default AddLessonQuiz;
