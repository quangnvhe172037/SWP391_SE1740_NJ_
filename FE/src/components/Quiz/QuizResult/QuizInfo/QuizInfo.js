import "react-quill/dist/quill.bubble.css";
import "./QuizInfo.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
 const QuizInfo = (prop) => {
  let quizId = prop.quizId;
  const [quizInfo, setQuizInfo] = useState({});
  const token = localStorage.getItem("token");
   const navigate = useNavigate();
     const user = jwtDecode(token);

  console.log("final check "+ quizId);
   useEffect(() => {
     console.log(quizId + "check fetch");
     fetch(`http://localhost:8080/quiz/get/${quizId}`, {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
     })
       .then((response) => {
         if (!response.ok) {
         }
         return response.json();
       })

       .then((dataJson) => {
         const data = {
           quizId: dataJson.quizId,
           quizName: dataJson.quizName,
           status: dataJson.status,
           description: dataJson.description,
           dateCreate: dataJson.dateCreate,
           durationTime: dataJson.durationTime,
           passRate: dataJson.passRate,
           countQues: dataJson.countQues,
         };

         return data;
       })

       .then((result) => {
         const mockData = result;
         setQuizInfo(mockData);
       })
       .catch((error) => {
       });
   }, [quizId, token]);
   
   const handleCreateQuiz = () => {
    fetch(`http://localhost:8080/attempt/quiz/add/result/${quizInfo.quizId}?userId=${user.userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
        navigate(`/quiz/take/${quizInfo.quizId}`);
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        // Nếu có lỗi xảy ra trong quá trình gửi yêu cầu, bạn có thể khôi phục giá trị status
      });
  }

  return (
    <div className="quiz-info-wrap">
      <div className="row">
        <h2 className="quiz-info-header col-md-10">{quizInfo.quizName}</h2>
        <div className="col-md-2">
          <button className="quiz-info-btn" onClick={handleCreateQuiz}>
            Attempt quiz
          </button>
        </div>
      </div>
      <div className="quiz-info-overview">
        {quizInfo.countQues} question
        <span className="quiz-info-distance">|</span>
        {quizInfo.durationTime} minutes
        <span className="quiz-info-distance">|</span>
        {quizInfo.passRate}% correct required to pass
      </div>
    </div>
  );
};

export default QuizInfo;
