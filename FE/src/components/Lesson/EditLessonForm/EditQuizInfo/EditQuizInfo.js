import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Popup from "reactjs-popup";
import "./EditQuizInfo.css";
import BASE_URL from "../../../../api/baseapi";

const EditQuizInfo = (prop) => {
  const [questions, setQuestions] = useState({});
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const [seed, setSeed] = useState(1);

  const reset = () => {
    setSeed(Math.random());
  };

  useEffect(() => {
    fetch(`${BASE_URL}/api/questions/get/quiz/sentence/${prop.sentenceId}`, {
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
        return dataJson;
      })

      .then((result) => {
        const mockData = result;
        console.log(result);
        setQuestions(result);

        //   console.log("test sentence ");
        //   console.log(result);
        //   console.log(result.quizQuestion.questionData);
      });
  }, [seed]);

  const handleSubmit = (e) => {
    const form = new FormData(e.target);
    if (
      form.get("answer1") === "" ||
      form.get("answer2") === "" ||
      form.get("answer3") === "" ||
      form.get("answer4") === "" ||
      form.get("explanation1") === "" ||
      form.get("explanation2") === "" ||
      form.get("explanation3") === "" ||
      form.get("explanation4") === ""
    ) {
      alert("Please enter full field");
      
      
    } else {
      
    
      const dataToSend = {
        sentenceId: prop.sentenceId,
        quizAnswers: [
          {
            answerId: questions.quizAnswers[0].answerID,
            answerData: form.get("answer1"),
            explanation: form.get("explanation1"),
            trueAnswer:
              document.getElementById("edit-quiz-info-radio1").checked === true,
          },
          {
            answerId: questions.quizAnswers[1].answerID,
            answerData: form.get("answer2"),
            explanation: form.get("explanation2"),
            trueAnswer:
              document.getElementById("edit-quiz-info-radio2").checked === true,
          },
          {
            answerId: questions.quizAnswers[2].answerID,
            answerData: form.get("answer3"),
            explanation: form.get("explanation3"),
            trueAnswer:
              document.getElementById("edit-quiz-info-radio3").checked === true,
          },
          {
            answerId: questions.quizAnswers[3].answerID,
            answerData: form.get("answer4"),
            explanation: form.get("explanation4"),
            trueAnswer:
              document.getElementById("edit-quiz-info-radio4").checked === true,
          },
        ],
        quizQuestion: {
          questionId: questions.quizQuestions.questionID,
          questionData: form.get("question"),
        },
      };

      fetch(`${BASE_URL}/api/questions/update/quiz/data/${prop.sentenceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => {
          if (!response.ok) {
          }
          return response.text();
        })
        .then((data) => {
          alert(data);
        })
        .catch((error) => {});
    }
  };

  return (
    <div>
      <Popup
        trigger={
          <button className="button" onClick={reset}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <>
            {questions ? (
              <div className="edit-lesson-quiz-header-wrap">
                <h2 className="edit-lesson-quiz-header">Question List</h2>

                <form
                  onSubmit={handleSubmit}
                  className="edit-quiz-info-form-wrap"
                >
                  <input
                    type="text"
                    name="question"
                    placeholder="Enter the question"
                    defaultValue={questions.quizQuestions?.questionData || ""}
                    className="edit-quiz-info-question"
                  />

                  <div className="edit-quiz-info-element">
                    <input
                      type="radio"
                      id="edit-quiz-info-radio1"
                      name="correct"
                      defaultChecked={questions.quizAnswers?.[0]?.trueAnswer}
                    />

                    <input
                      name="answer1"
                      className="col-md-7"
                      placeholder="Answer 1"
                      defaultValue={questions.quizAnswers?.[0]?.answerData}
                    />
                    <input
                      name="explanation1"
                      className="col-md-4"
                      placeholder="Explanation"
                      defaultValue={questions.quizAnswers?.[0]?.explanation}
                    />
                  </div>
                  <div className="edit-quiz-info-element">
                    <input
                      type="radio"
                      id="edit-quiz-info-radio2"
                      name="correct"
                      defaultChecked={questions.quizAnswers?.[1]?.trueAnswer}
                    />
                    <input
                      name="answer2"
                      placeholder="Answer 2"
                      className="col-md-7"
                      defaultValue={questions.quizAnswers?.[1]?.answerData}
                    />
                    <input
                      name="explanation2"
                      placeholder="Explanation"
                      className="col-md-4"
                      defaultValue={questions.quizAnswers?.[1]?.explanation}
                    />
                  </div>
                  <div className="edit-quiz-info-element">
                    <input
                      type="radio"
                      id="edit-quiz-info-radio3"
                      name="correct"
                      defaultChecked={questions.quizAnswers?.[2]?.trueAnswer}
                    />
                    <input
                      name="answer3"
                      placeholder="Answer 3"
                      className="col-md-7"
                      defaultValue={questions.quizAnswers?.[2]?.answerData}
                    />
                    <input
                      name="explanation3"
                      placeholder="Explanation"
                      className="col-md-4"
                      defaultValue={questions.quizAnswers?.[2]?.explanation}
                    />
                  </div>
                  <div className="edit-quiz-info-element">
                    <input
                      type="radio"
                      name="correct"
                      id="edit-quiz-info-radio4"
                      defaultChecked={questions.quizAnswers?.[3]?.trueAnswer}
                    />
                    <input
                      name="answer4"
                      placeholder="Answer 4"
                      className="col-md-7"
                      defaultValue={questions.quizAnswers?.[3]?.answerData}
                    />
                    <input
                      name="explanation4"
                      placeholder="Explanation"
                      className="col-md-4"
                      defaultValue={questions.quizAnswers?.[3]?.explanation}
                    />
                  </div>

                  <div className="edit-quiz-info-wrap">
                    <button type="submit" className="edit-quiz-info-btn">
                      Save
                    </button>
                    <button
                      type="button"
                      className=" edit-quiz-info-btn"
                      onClick={close}
                    >
                      Exit
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <p>Questions are not available.</p>
            )}
          </>
        )}
      </Popup>
    </div>
  );
};
export default EditQuizInfo;
