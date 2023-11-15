import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./QuizAttempt.css";
import jwtDecode from "jwt-decode";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import Countdown from "react-countdown";
import NotFoundException from "../../components/HandleException/Error-404/Error-404";
import BASE_URL from "../../api/baseapi";
const QuizAttempt = () => {
  const { quizId, resultId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [sentences, setSentence] = useState([]);
  const [quizInfo, setQuizInfo] = useState({});
  const user = jwtDecode(token);
  const [userAnswers, setUserAnswers] = useState(
    sentences.map((sentence) => ({
      sentenceId: sentence.sentenceId,
      userAnswer: null,
      timeSubmit: new Date().toISOString(),
    }))
  );
  const [seed, setSeed] = useState(1);
  const [handle404, setHandle404] = useState(false);
  const reset = () => {
    setSeed(Math.random());
  };

  useEffect(() => {
    console.log(
      `${BASE_URL}/attempt/quiz/${quizId}?resultId=${resultId}&userId=${user.userId}`
    );
    fetch(
      `${BASE_URL}/attempt/quiz/${quizId}?resultId=${resultId}&userId=${user.userId}`,
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
  }, [selectedQuestion, seed]);

  const handleQuestionClick = (e, index) => {
    // e.preventDefault();

    setTimeout(function () {}, 1000);
    sendUserAnswersToBackend();
    setSelectedQuestion(index);
    reset();
  };

  const handleAnswerSelect = (e, index) => {
    const updatedAnswers = [...userAnswers];
    const currentTime = new Date().toISOString();
    updatedAnswers[selectedQuestion] = {
      ...updatedAnswers[selectedQuestion],
      sentenceId: sentences[selectedQuestion].sentenceId,
      userAnswer: sentences[selectedQuestion].quizAnswers[index].answerID,
      timeSubmit: currentTime,
    };
    setUserAnswers(updatedAnswers);
    sendUserAnswersToBackend();
    reset();
  };

  const sendUserAnswersToBackend = () => {
    const data = userAnswers;
    fetch(
      `${BASE_URL}/attempt/quiz/update/result/${quizId}?resultId=${resultId}&userId=${user.userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) {
        }
        return response.text();
      })
      .then((data) => {
        console.log("User answers saved successfully:", data);
      })
      .catch((error) => {
        console.error("Error saving user answers:", error);
      });
    reset();
  };

  const handleFinalSubmit = () => {
    if (!window.confirm("Are you sure you want to submit your attempt")) {
      return;
    }
    finalSubmit();
  };

  const finalSubmit = () => {
    const data = userAnswers;
    console.log(data);
    fetch(
      `${BASE_URL}/attempt/quiz/submit/result/${quizId}?resultId=${resultId}&userId=${user.userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) {
          
        }
        return response.text();
      })
      .then((data) => {
        console.log("User answers saved successfully:", data);
      })
      .catch((error) => {
        console.error("Error saving user answers:", error);
      });
    navigate(`/quiz/result/${resultId}`);
  };
  if (handle404) {
    return <NotFoundException />;
  }

  const handleReload = () => {
    sendUserAnswersToBackend();
    window.location.reload();
  }

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
                        <li key={answer.answerID}>
                          <span className="quiz-attempt-answer-choice">
                            <input
                              type="radio"
                              name="quiz-attempt-correct"
                              defaultChecked={
                                userAnswers[selectedQuestion] ===
                                  answer.answerID ||
                                answer.answerID ===
                                  sentences[selectedQuestion].userAnswer
                              }
                              onChange={(e) => handleAnswerSelect(e, index)}
                            />
                            <label>{answer.answerData}</label>{" "}
                          </span>
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
                      className={`quiz-attempt-navigate-box ${
                        item.userAnswer ? "btn btn-primary" : "btn btn-black"
                      }`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="quiz-attempt-handle-submit">
              <label>
                Time left:
                <Countdown date={quizInfo.dateEnd} onComplete={finalSubmit} />
              </label>
              <div className="quiz-attempt-btn-submit-wrap">
                <button className="btn btn-dark quiz-attempt-btn-submit" onClick={handleFinalSubmit}>
                  Submit
                </button>
                <button
                  className="btn btn-dark"
                  onClick={handleReload}
                >
                  Check saved
                </button>
              </div>
            </div>
          </div>

          {/* <div>
            <h2>User Answers:</h2>
            <ul>
              {userAnswers.map((answer, index) => (
                <li key={index}>
                  Question {index + 1}:{" "}
                  {answer !== null ? answer : "Not answered"}
                 
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default QuizAttempt;
