import React, { useState, useEffect } from 'react';
import QuestionForm from "./QuestionForm";
import jwtDecode from "jwt-decode";
import PrivateContent from "../HandleException/PrivateContent";

const QuizForm = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({});

    const loadQuestions = async () => {
        try {
            const response = await fetch('/api/questions');

            if (response.ok) {
                const data = await response.json();
                setQuestions(data);
            }
        } catch (error) {
            console.error('Lỗi khi tải danh sách câu hỏi:', error);
        }
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    const handleAddQuestion = (questionData) => {
        setQuestions([...questions, questionData]);
    };
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    if (user.role !== "EXPERT") {
        return (
            <PrivateContent/>
        )
    } else {
        return (
            <div className="container" style={{display: "flex"}}>
                <div className="left-panel col-md-6">
                    <h1>Thêm câu hỏi</h1>
                    <QuestionForm onAddQuestion={handleAddQuestion}/>
                </div>
                <div className="right-panel col-md-6">
                    <h1>Danh sách câu hỏi đã thêm</h1>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Câu hỏi</th>
                            <th>Đáp án A</th>
                            <th>Đáp án B</th>
                            <th>Đáp án C</th>
                            <th>Đáp án D</th>
                            <th>Đáp án đúng</th>
                            <th>Lời giải thích</th>
                        </tr>
                        </thead>
                        <tbody>
                        {questions.map((question, index) => (
                            <tr key={index}>
                                <td>{question.question}</td>
                                <td>{question.answerOptions[0]}</td>
                                <td>{question.answerOptions[1]}</td>
                                <td>{question.answerOptions[2]}</td>
                                <td>{question.answerOptions[3]}</td>
                                <td>{question.correctAnswer}</td>
                                <td>{question.explanation}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default QuizForm;
