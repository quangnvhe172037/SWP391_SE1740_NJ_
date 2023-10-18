import "react-quill/dist/quill.bubble.css";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import "./QuizResultData.css";
import "chart.js/auto";
import PieChart from "../../../../PipeChart";

const QuizResultData = (prop) => {
  let quizId = prop.quizId;
  const [quizInfo, setQuizInfo] = useState({});
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  useEffect(() => {
    console.log("text fetch");
    fetch(
      `http://localhost:8080/quiz/result/get?quizId=${quizId}&userId=${user.userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          console.log(response.message);
        }
        return response.json();
      })

      .then((dataJson) => {
        console.log("hêlo");
        const data = {
          resultId: dataJson.resultId,
          score: dataJson.score,
          dateTaken: dataJson.dateTaken,
          quizId: dataJson.quizId,
          correctAnswer: dataJson.correctAnswer,
          nullAnswer: dataJson.nullAnswer,
          falseAnswer: dataJson.falseAnswer,
          isPass: dataJson.isPass,
        };

        console.log(dataJson.falseAnswer);
        console.log(dataJson.correctAnswer);
        return data;
      })

      .then((result) => {
        const mockData = result;
        setQuizInfo(mockData);
      })
      .catch((error) => {
        console.log(error.message);
        setQuizInfo(null);
      });
  }, [quizId, token]);
  return (
    <div className="quiz-result-wrap">
      <div className="quiz-result-container ">
        {quizInfo != null ? (
          <div className="row">
            <div className="quiz-result-chart col-md-5">
              <PieChart
                trueAnswer={quizInfo.correctAnswer}
                falseAnswer={quizInfo.falseAnswer}
                nullAnswer={quizInfo.nullAnswer}
              />
            </div>
            <div className="col-md-5">
              <div>
                <span className="quiz-result-attempt">Best Attempt:</span>
                {quizInfo.isPass ? (
                  <p className="quiz-result-pass">Pass</p>
                ) : (
                  <p className="quiz-result-not">Not Pass</p>
                )}
              </div>
              <div className="quiz-result-score">Score: {quizInfo.score}%</div>
              <div>Date taken: {quizInfo.dateTaken}</div>
              <div className="quiz-result-review-wrap">
                <button className="quiz-result-review-btn">Review quiz</button>
              </div>
            </div>
          </div>
        ) : (
          <div>No data have found</div>
        )}
      </div>
    </div>
  );
};

export default QuizResultData;
