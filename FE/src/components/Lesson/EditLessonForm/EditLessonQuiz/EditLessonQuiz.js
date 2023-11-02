import { useEffect, useState } from "react";
import "./EditLessonQuiz.css";
import jwtDecode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import EditQuizInfo from "../EditQuizInfo/EditQuizInfo";
const EditLessonQuiz = (prop) => {
  const [showForm, setShowForm] = useState(false);
  const lessonId = prop.lessonId;
  const { subjectId } = useParams();
  const [questions, setQuestions] = useState([]);
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const [seed, setSeed] = useState(1);

  const reset = () => {
    setSeed(Math.random());
  };

  const GetData = () => {
    useEffect(() => {
      console.log("check lessonId: " + lessonId);
      fetch(`http://localhost:8080/api/questions/get/lesson/${lessonId}`, {
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
            quizAnswers: [item.quizAnswers],
            quizQuestion: item.quizQuestions,
          }));
          return data;
        })

        .then((result) => {
          const mockData = result;
          setQuestions(mockData);
        });
    }, [seed]);
  };
  const addQuestion = () => {
    setShowForm(true);
  };

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
      setShowForm(false);
      return;
    }

    const dataToSend = {
      quizAnswers: [
        {
          answerData: form.get("answer1"),
          explanation: form.get("explanation1"),
          trueAnswer: form.get("correct1") === "answer1",
        },
        {
          answerData: form.get("answer2"),
          explanation: form.get("explanation2"),
          trueAnswer: form.get("correct2") === "answer2",
        },
        {
          answerData: form.get("answer3"),
          explanation: form.get("explanation3"),
          trueAnswer: form.get("correct3") === "answer3",
        },
        {
          answerData: form.get("answer4"),
          explanation: form.get("explanation4"),
          trueAnswer: form.get("correct4") === "answer4",
        },
      ],
      quizQuestions: { questionData: form.get("question") },
    };

    fetch(
      `http://localhost:8080/api/questions/add/lesson/${lessonId}?subjectId=${subjectId}`,
      {
        method: "POST",
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
    setShowForm(false);
  };

  const handleExit = () => {
    setShowForm(false);

    reset();
  };

  const handleDelete = (sentenceId) => {
    fetch(
      `http://localhost:8080/api/questions/delete/sentence/${sentenceId}?lessonId=${lessonId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
        }
        return response.text();
      })
      .then((data) => {
        alert(data);
        reset();
      })
      .catch((error) => {});
  };

  return (
    <div>
      <Popup
        trigger={
          <button className="button" onClick={GetData()}>
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div>
            <div className="edit-lesson-quiz-header-wrap">
              <h2 className="edit-lesson-quiz-header">Question List</h2>
              <div className="edit-lesson-quiz-add-btn-wrap">
                <button
                  className="edit-lesson-quiz-add-btn"
                  onClick={addQuestion}
                >
                  Add new Question
                </button>
              </div>
            </div>

            {showForm ? (
              <form onSubmit={handleSubmit} className="edit-lesson-quiz-list">
                <input
                  name="question"
                  placeholder="Enter the question"
                  className="edit-lesson-form-question"
                />

                <div className="edit-lesson-form-element row">
                  <input type="radio" name="correct1" defaultChecked/>
                  <input className="" name="answer1" placeholder="Answer 1" />
                  <input name="explanation1" placeholder="Explanation" />
                </div>

                <div className="edit-lesson-form-element">
                  <input type="radio" name="correct1" value="answer2" />
                  <input name="answer2" placeholder="Answer 2" />
                  <input name="explanation2" placeholder="Explanation" />
                </div>
                <div className="edit-lesson-form-element">
                  <input type="radio" name="correct1" value="answer3" />
                  <input name="answer3" placeholder="Answer 3" />
                  <input name="explanation3" placeholder="Explanation" />
                </div>

                <div className="edit-lesson-form-element">
                  <input type="radio" name="correct1" value="answer4" />
                  <input name="answer4" placeholder="Answer 4" />
                  <input name="explanation4" placeholder="Explanation" />
                </div>

                <div className="edit-lesson-quiz-form-btn-wrap">
                  <button
                    type="submit "
                    className="edit-lesson-quiz-btn-add-sentence"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="edit-lesson-quiz-btn-add-sentence"
                    onClick={handleExit}
                  >
                    Exit
                  </button>
                </div>
              </form>
            ) : (
              <div className="edit-lesson-quiz-list">
                <ul>
                  {questions.map((q, index) => (
                    <li key={q.quizQuestion.questionID}>
                      <label>
                        {index + 1} {q.quizQuestion.questionData}
                        <button className="button edit-lesson-quiz-btn-edit">
                          <EditQuizInfo sentenceId={q.sentenceId} />
                        </button>
                        <button onClick={() => handleDelete(q.sentenceId)}>
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Popup>
    </div>
  );
};
export default EditLessonQuiz;
