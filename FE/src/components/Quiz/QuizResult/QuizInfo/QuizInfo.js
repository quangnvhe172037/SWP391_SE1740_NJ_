import "react-quill/dist/quill.bubble.css";
import "./QuizInfo.css";
import { useEffect, useState } from "react";

 const QuizInfo = (prop) => {
  let quizId = prop.quizId;
  const [quizInfo, setQuizInfo] = useState({});
  const token = localStorage.getItem("token");
  
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
           console.log(response.message);
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

         console.log(dataJson.quizName);
         return data;
       })

       .then((result) => {
         const mockData = result;
         setQuizInfo(mockData);
       })
       .catch((error) => {
         console.log("object");
       });
  }, [quizId, token]);

  return (
    <div className="quiz-info-wrap">
      <div className="row">
        <h2 className="quiz-info-header col-md-10">{quizInfo.quizName}</h2>
        <div className="col-md-2">
<button className="quiz-info-btn">Doing quiz</button>
        </div>
        
      </div>
      <div className="quiz-info-overview">
        {quizInfo.countQues} question
        <span className="quiz-info-distance">|</span>
        {quizInfo.durationTime} time
        <span className="quiz-info-distance">|</span>
        {quizInfo.passRate}% correct required to pass
      </div>
    </div>
  );
};

export default QuizInfo;
