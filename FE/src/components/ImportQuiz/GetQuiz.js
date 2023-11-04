import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './GetQuiz.css';
import EditQuizInfo from "../Lesson/EditLessonForm/EditQuizInfo/EditQuizInfo"; // Tạo một file CSS riêng cho QuizComponent
import BASE_URL from '../../api/baseapi';
const QuizComponent = () => {
    const [questions, setQuestions] = useState([]);
    const { subjectId } = useParams();
    const [editingQuestionId, setEditingQuestionId] = useState(null); // Trạng thái chỉnh sửa
    const [editedQuestion, setEditedQuestion] = useState({}); // Dữ liệu chỉnh sửa
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios
          .get(`${BASE_URL}/api/questions/get/${subjectId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setQuestions(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
    }, []);

    const handleEdit = (questionId) => {
        // Xử lý sự kiện khi người dùng nhấn nút "Edit" cho câu hỏi với ID là `questionId`
        setEditingQuestionId(questionId);
        const editedQuestion = { ...questions.find((question) => question.id === questionId) };
        setEditedQuestion(editedQuestion);

    };

    const handleSave = (questionId) => {
        // Xử lý sự kiện khi người dùng nhấn nút "Save" sau khi chỉnh sửa câu hỏi
        const updatedQuestions = questions.map((question) => {
            if (question.id === questionId) {
                return editedQuestion;
            }
            return question;
        });

        axios
          .put(`${BASE_URL}/api/questions/update/${questionId}`, editedQuestion)
          .then(() => {
            setQuestions(updatedQuestions);
            setEditingQuestionId(null);
          })
          .catch((error) => {
            console.error(error);
          });
    };

    const handleInputChange = (event, field) => {
        const { name, value } = event.target;
        setEditedQuestion({
            ...editedQuestion,
            [name]: value,
        });
    };

    const isEditing = (questionId) => {
        return questionId === editingQuestionId;
    };

    const handleDelete = (quesId, subjectId) => {
        // Tạo đối tượng chứa `quesId` và `subjectId` để gửi trong phần body
        const data = {
            quesId: quesId,
            subjectId: subjectId,
        };

        axios
          .delete(`${BASE_URL}/api/questions/delete`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: data, // Sử dụng data để gửi trong phần body
          })
          .then((response) => {
            alert(response.data);
            window.location.reload();
          })
          .catch((error) => {
            alert(error);
          });
    };

    return (
        <div>
            <h1>Quiz Questions</h1>
            <div className="getquiz" style={{ maxHeight: '300px', overflow: 'auto' }}>
                <table className="table-bordered">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Question</th>
                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                        <th>D</th>
                        <th>Correct Answer</th>
                        <th>Explaination</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {questions.map((question, index) => (
                        <tr key={index}>
                            <td>{question.id}</td>
                            <td>
                                {isEditing(question.id) ? (
                                    <input
                                        type="text"
                                        name="questionData"
                                        value={editedQuestion.questionData}
                                        onChange={(e) => handleInputChange(e, 'questionData')}
                                    />
                                ) : (
                                    question.questionData
                                )}
                            </td>
                            <td>
                                {isEditing(question.id) ? (
                                    <input
                                        type="text"
                                        name={`editedQuestion-${question.id}-answerOptions[0]`}
                                        value={editedQuestion.answerOptions[0]}
                                        onChange={(e) => handleInputChange(e, 'answerOptions[0]')}
                                    />
                                ) : (
                                    question.answerOptions[0]
                                )}
                            </td>
                            <td>
                                {isEditing(question.id) ? (
                                    <input
                                        type="text"
                                        name={`editedQuestion-${question.id}-answerOptions[1]`}
                                        value={editedQuestion.answerOptions[1]}
                                        onChange={(e) => handleInputChange(e, 'answerOptions[1]')}
                                    />
                                ) : (
                                    question.answerOptions[1]
                                )}
                            </td>
                            <td>
                                {isEditing(question.id) ? (
                                    <input
                                        type="text"
                                        name={`editedQuestion-${question.id}-answerOptions[2]`}
                                        value={editedQuestion.answerOptions[2]}
                                        onChange={(e) => handleInputChange(e, 'answerOptions[2]')}
                                    />
                                ) : (
                                    question.answerOptions[2]
                                )}
                            </td>
                            <td>
                                {isEditing(question.id) ? (
                                    <input
                                        type="text"
                                        name={`editedQuestion-${question.id}-answerOptions[3]`}
                                        value={editedQuestion.answerOptions[3]}
                                        onChange={(e) => handleInputChange(e, 'answerOptions[3]')}
                                    />
                                ) : (
                                    question.answerOptions[3]
                                )}
                            </td>
                            <td>
                                {isEditing(question.id) ? (
                                    <input
                                        type="text"
                                        name="correctAnswer"
                                        value={editedQuestion.correctAnswer}
                                        onChange={(e) => handleInputChange(e, 'correctAnswer')}
                                    />
                                ) : (
                                    question.correctAnswer
                                )}
                            </td>
                            <td>
                                {isEditing(question.id) ? (
                                    <input
                                        type="text"
                                        name="explanation"
                                        value={editedQuestion.explanation}
                                        onChange={(e) => handleInputChange(e, 'explanation')}
                                    />
                                ) : (
                                    question.explanation
                                )}
                            </td>
                            <td>
                                {isEditing(question.id) ? (
                                    <button onClick={() => handleSave(question.id)}>Save</button>
                                ) : (
                                   <EditQuizInfo sentenceId = {question.id}/>
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleDelete(question.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QuizComponent;
