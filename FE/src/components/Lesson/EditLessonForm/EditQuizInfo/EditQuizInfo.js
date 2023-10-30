import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Popup from "reactjs-popup";
const EditQuizInfo = (prop) => {
  const [questions, setQuestions] = useState({});
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const [seed, setSeed] = useState(1);

  const reset = () => {
    setSeed(Math.random());
  };

 
    useEffect(() => {
      fetch(
        `http://localhost:8080/api/questions/get/quiz/sentence/${prop.sentenceId}`,
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
      const dataToSend = {
        sentenceId: prop.sentenceId,
        quizAnswers: [
          {
            answerId: questions.quizAnswers[0].answerID,
            answerData: form.get("answer1"),
            explanation: form.get("explanation1"),
            trueAnswer: form.get("correct1") === "answer1",
          },
          {
            answerId: questions.quizAnswers[1].answerID,
            answerData: form.get("answer2"),
            explanation: form.get("explanation2"),
            trueAnswer: form.get("correct2") === "answer2",
          },
          {
            answerId: questions.quizAnswers[2].answerID,
            answerData: form.get("answer3"),
            explanation: form.get("explanation3"),
            trueAnswer: form.get("correct3") === "answer3",
          },
          {
            answerId: questions.quizAnswers[3].answerID,
            answerData: form.get("answer4"),
            explanation: form.get("explanation4"),
            trueAnswer: form.get("correct4") === "answer4",
          },
        ],
        quizQuestion: {
          questionId: questions.quizQuestions.questionID,
          questionData: form.get("question"),
        },
      };

      console.log(questions);
    fetch(
      `http://localhost:8080/api/questions/update/quiz/data/${prop.sentenceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      }
    )
      .then((response) => {
        if (!response.ok) {
        }
        return response.json();
      })
      .then((data) => {
        alert("Update successful");
        reset();
      })
      .catch((error) => {});
  };

  const handleExit = () => {
    reset();
  };

  const handleDelete = () => {};

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
              <div>
                <h2>Question List</h2>

                <form onSubmit={handleSubmit}>
                  <input
                    name="question"
                    placeholder="Enter the question"
                    value={questions.quizQuestions?.questionData || ""}
                  />

                  <div>
                    <input
                      type="radio"
                      name="correct1"
                      defaultChecked={questions.quizAnswers?.[0]?.trueAnswer}
                    />
                    <input
                      name="answer1"
                      placeholder="Answer 1"
                      defaultValue={questions.quizAnswers?.[0]?.answerData}
                    />
                    <input
                      name="explanation1"
                      placeholder="Explanation"
                      defaultValue={questions.quizAnswers?.[0]?.explanation}
                    />
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="correct2"
                      defaultChecked={questions.quizAnswers?.[1]?.trueAnswer}
                    />
                    <input
                      name="answer2"
                      placeholder="Answer 2"
                      defaultValue={questions.quizAnswers?.[1]?.answerData}
                    />
                    <input
                      name="explanation2"
                      placeholder="Explanation"
                      defaultValue={questions.quizAnswers?.[1]?.explanation}
                    />
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="correct3"
                      defaultChecked={questions.quizAnswers?.[2]?.trueAnswer}
                    />
                    <input
                      name="answer3"
                      placeholder="Answer 3"
                      defaultValue={questions.quizAnswers?.[2]?.answerData}
                    />
                    <input
                      name="explanation3"
                      placeholder="Explanation"
                      defaultValue={questions.quizAnswers?.[2]?.explanation}
                    />
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="correct4"
                      defaultChecked={questions.quizAnswers?.[3]?.trueAnswer}
                    />
                    <input
                      name="answer4"
                      placeholder="Answer 4"
                      defaultValue={questions.quizAnswers?.[3]?.answerData}
                    />
                    <input
                      name="explanation4"
                      placeholder="Explanation"
                      defaultValue={questions.quizAnswers?.[3]?.explanation}
                    />
                  </div>

                  <button type="submit">Save</button>
                  <button type="button" onClick={handleExit}>
                    Exit
                  </button>
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
