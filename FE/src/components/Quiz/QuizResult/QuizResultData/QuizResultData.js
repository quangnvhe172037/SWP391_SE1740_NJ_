import "react-quill/dist/quill.bubble.css";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./QuizResultData.css";
import { result } from "lodash-es";
Chart.register(ArcElement);

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
  console.log(quizInfo != null);
  console.log(quizInfo);
  return (
    <div className="quiz-result-wrap">
      <div >
        {quizInfo != null ? (
          <div className="row">
            <div className="col-md-5 quiz-result-chart">
              <Pie
                data={{
                  labels: ["Not Answer", "Correct", "False"],
                  datasets: [
                    {
                      label: "Quiz Data",
                      backgroundColor: ["#d1d7dc", "#3cba9f", "#c45850"],
                      data: [
                        quizInfo.nullAnswer,
                        quizInfo.correctAnswer,
                        quizInfo.falseAnswer,
                      ],
                      hoverOffset: 4,
                    },
                  ],
                }}
              />
            </div>
            <div className="col-md-5">
              <div>Total correct: {quizInfo.correctAnswer}</div>
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
