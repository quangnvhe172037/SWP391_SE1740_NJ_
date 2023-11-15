import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { result } from "lodash-es";
import PieChart from "../../PipeChart";
import BASE_URL from "../../api/baseapi";
const QuizResultPage = () => {
  const { resultId } = useParams();
  const [quizInfo, setQuizInfo] = useState({});
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const navigate = useNavigate();
  const [seed, setSeed] = useState(1);
  const [loading, setLoading] = useState(true);
  
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      // Chờ 5 giây trước khi thực hiện fetch
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(`${BASE_URL}/quiz/result/view/${resultId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log(response.message);
        return;
      }

      const dataJson = await response.json();
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

      setQuizInfo(data);
    } catch (error) {
      console.log(error.message);
    } finally {
       setLoading(false);
    }
  };

  fetchData();
}, [resultId, token, quizInfo.score, quizInfo.resultId]);


console.log(quizInfo);
  return (
    <div className="quiz-result-wrap">
      <div className="quiz-result-container ">
        {loading ? (
          // Hiển thị biểu tượng loading khi đang tải dữ liệu
          <div>Loading...</div>
        ) : quizInfo != null ? (
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
                <button
                  className="quiz-result-review-btn"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    navigate(
                      `/quiz/${quizInfo.quizId}/${quizInfo.resultId}/review`
                    );
                  }}
                >
                  Review quiz
                </button>

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
