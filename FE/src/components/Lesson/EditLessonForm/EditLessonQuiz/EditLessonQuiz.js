import { useState } from "react";
import "./EditLessonQuiz.css";
const EditLessonQuiz= (prop) => {
//   const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

    const initialQuestions = [
      {
        question: "Câu hỏi mẫu 1",
        answers: ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
        explanation: "Giải thích câu hỏi 1",
        correctAnswer: "answer2",
      },
      {
        question: "Câu hỏi mẫu 2",
        answers: ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
        explanation: "Giải thích câu hỏi 2",
        correctAnswer: "answer3",
      },
    ];

    const [questions, setQuestions] = useState(initialQuestions);
    
  const addQuestion = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const question = formData.get("question");
    const answers = [];
    for (let i = 0; i < 4; i++) {
      answers.push(formData.get(`answer${i + 1}`));
    }
    const explanation = formData.get("explanation");
    const correctAnswer = formData.get("correct");

    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        question,
        answers,
        explanation,
        correctAnswer,
      },
    ]);
    setShowForm(false);
  };

  return (
    <div>
      <button onClick={addQuestion}>Thêm câu hỏi</button>

      {showForm ? (
        <form onSubmit={handleSubmit}>
          <input name="question" placeholder="Nhập câu hỏi" />

          <input name="answer1" placeholder="Đáp án 1" />
          <input name="answer2" placeholder="Đáp án 2" />
          <input name="answer3" placeholder="Đáp án 3" />
          <input name="answer4" placeholder="Đáp án 4" />

          <input type="radio" name="correct" value="answer1" />
          <input type="radio" name="correct" value="answer2" />
          <input type="radio" name="correct" value="answer3" />
          <input type="radio" name="correct" value="answer4" />

          <input name="explanation" placeholder="Giải thích" />

          <button type="submit">Lưu câu hỏi</button>
        </form>
      ) : (
        <ul>
          {questions.map((q) => (
            <li key={q.question}>{q.question}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default EditLessonQuiz;
