import { useNavigate, useParams } from "react-router-dom";
import QuizResultData from "../../components/Quiz/QuizResult/QuizResultData/QuizResultData";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { result } from "lodash-es";
import PieChart from "../../PipeChart";

const QuizResultPage = () => {
  const { resultId } = useParams();
  const [quizInfo, setQuizInfo] = useState({});
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/quiz/result/view/${resultId}`, {
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
  }, [resultId, token]);
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
                <span className="quiz-result-attempt">Your attempt</span>
                {quizInfo.isPass ? (
                  <p className="quiz-result-pass">Pass</p>
                ) : (
                  <p className="quiz-result-not">Not Pass</p>
                )}
              </div>
              <div className="quiz-result-score">Score: {quizInfo.score}%</div>
              <div>Date taken: {quizInfo.dateTaken}</div>
              <div className="quiz-result-review-wrap">
                <button className="quiz-result-review-btn" style={{marginRight : "10px" }}>Review quiz</button>

                <button
                  className="quiz-result-review-btn"
                  onClick={() => {
                    navigate(-2);
                  }}
                >
                  Back to Lesson
                </button>
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

export default QuizResultPage;
