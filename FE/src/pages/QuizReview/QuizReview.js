import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./QuizReview.css";
import BASE_URL from "../../api/baseapi";

const QuizReview = () => {
  const { quizId, resultId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [sentences, setSentence] = useState([]);
  const [quizInfo, setQuizInfo] = useState({});
  const user = jwtDecode(token);

  const [seed, setSeed] = useState(1);
  const [handle404, setHandle404] = useState(false);
  const reset = () => {
    setSeed(Math.random());
  };

  useEffect(() => {
    fetch(
      `${BASE_URL}/attempt/quiz/review/${quizId}?resultId=${resultId}&userId=${user.userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          // throw new Error("Network response was not ok");
          setHandle404(true);
          return null;
        }
        return response.json();
      })

      .then((item) => {
        console.log(item);
        if (item === null) {
          return;
        }
        const sentencesData = item.listSentence.map((item) => ({
          sentenceId: item.sentenceId,
          quizAnswers: item.quizAnswers,
          quizQuestion: item.quizQuestions,
          userAnswer: item.userAnswer,
        }));

        setSentence(sentencesData);
        const quizData = {
          quizName: item.quizName,
          passRate: item.passRate,
          durationTime: item.durationTime,
          dateEnd: item.dateEnd,
        };
        setQuizInfo(quizData);
      });
  }, [selectedQuestion, seed, resultId]);

  const handleQuestionClick = (e, index) => {
    // e.preventDefault();

    setSelectedQuestion(index);
    reset();
  };

  return (
    <div className="quiz-attempt-wrap ">
      {sentences.length === 0 ? (
        <div>Question not found</div>
      ) : (
        <div className="row">
          <div className="quiz-attempt-left col-md-9">
            {selectedQuestion !== null && (
              <div className="quiz-attempt-content-wrap">
                <div>
                  <h2 className="quiz-attempt-ques-title">
                    Question {selectedQuestion + 1}:
                  </h2>
                  <p>{sentences[selectedQuestion].quizQuestion.questionData}</p>
                </div>

                <div className="quiz-attempt-answer-wrap">
                  <h4>Select one:</h4>
                  <ul>
                    {sentences[selectedQuestion].quizAnswers.map(
                      (answer, index) => (
                        <li
                          key={answer.answerID}
                          className={
                            answer.trueAnswer
                              ? "quiz-attempt-true-answer"
                              : "quiz-attempt-false-answer"
                          }
                        >
                          <span className="quiz-attempt-answer-choice">
                            <input
                              type="radio"
                              readOnly
                              name="quiz-attempt-correct"
                              defaultChecked={
                                answer.answerID ===
                                sentences[selectedQuestion].userAnswer
                              }
                              onChange={(e) => {
                                e.preventDefault();
                              }}
                            />

                            <div className="quiz-review-answer">
                              <label>{answer.answerData}</label>
                            </div>
                          </span>
                          <div className="quiz-review-answer">
                            <label>Explain: {answer.explanation}</label>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="quiz-attempt-right col-md-3">
            <div className="quiz-attempt-navigate-button-wrap">
              <h2 className="quiz-attempt-navigate-header">Quiz navigation</h2>
              <ul className="quiz-attempt-navigate-content-wrap">
                {sentences.map((item, index) => (
                  <li
                    key={index}
                    onClick={(e) => handleQuestionClick(e, index)}
                    className={`quiz-attempt-navigate-button-element `}
                  >
                    <button
                      className={`quiz-attempt-navigate-box btn btn-secondary
                      `}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="quiz-attempt-handle-submit">
              <button
                className="btn btn-dark quiz-attempt-review-back"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizReview;
