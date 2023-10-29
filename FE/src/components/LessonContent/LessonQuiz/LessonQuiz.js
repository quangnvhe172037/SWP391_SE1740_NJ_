import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizInfo from "../../Quiz/QuizResult/QuizInfo/QuizInfo";
import QuizResultData from "../../Quiz/QuizResult/QuizResultData/QuizResultData";

const LessonQuiz = (prop) => {
  
  const [quizInfo, setQuizInfo] = useState({});
  const token = localStorage.getItem("token");
  let lessonId = prop.lessonId;

  useEffect(() => {
    fetch(`http://localhost:8080/quiz/get/lesson/${lessonId}`, {
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
          quizId: dataJson.quizID
        };

        return data;
      })

      .then((result) => {
        const mockData = result;
        setQuizInfo(mockData);
      });
  }, [lessonId, token]);

  

  console.log("Lesson Quzi Data");
  return (
    <div className="lesson-content-data">
      <QuizInfo quizId={quizInfo.quizId} />

      <QuizResultData quizId={quizInfo.quizId} />
    </div>
  );
};

export default LessonQuiz;
