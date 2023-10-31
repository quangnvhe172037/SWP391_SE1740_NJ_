import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./QuizAttempt.css";

const QuizAttempt = () => {
  const { quizId } = useParams();
  const token = localStorage.getItem("token");
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [sentences, setSentence] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/attempt/quiz/${quizId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          // throw new Error("Network response was not ok");
        }
        return response.json();
      })

      .then((dataJson) => {
        const data = dataJson.map((item) => ({
          sentenceId: item.sentenceId,
          quizAnswers: item.quizAnswers,
          quizQuestion: item.quizQuestions,
        }));
        return data;
      })

      .then((result) => {
        const mockData = result;
        setSentence(mockData);
      });
  }, [quizId, token]);

  const handleQuestionClick = (e, index) => {
    e.preventDefault();
    setSelectedQuestion(index);
  };
  return (
    <div className="quiz-attempt-wrap ">
      {sentences.length === 0 ? (
        <div>Không có dữ liệu hiển thị</div>
      ) : (
        <div className="row">
          <div className="quiz-attempt-left col-md-9">
            {selectedQuestion !== null && (
              <div>
                <h3>Question:</h3>
                <p>{sentences[selectedQuestion].quizQuestion.questionData}</p>
                <h4>Answer:</h4>
                <ul>
                  {sentences[selectedQuestion].quizAnswers.map((answer) => (
                    <li key={answer.answerID}>
                      <input type="radio" name="quiz-attempt-correct" />
                      <p>{answer.answerData}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="quiz-attempt-right col-md-3">
            <h2 className="quiz-attempt-navigate-header">Quiz navigation</h2>

            <div className="quiz-attempt-navigate-button-wrap">
              <ul className="quiz-attempt-navigate-content-wrap">
                {sentences.map((item, index) => (
                  <li
                    key={index}
                    onClick={(e) => handleQuestionClick(e, index)}
                    className="quiz-attempt-navigate-button-element"
                  >
                    <button className="quiz-attempt-navigate-box btn btn-secondary">{index + 1}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizAttempt;
