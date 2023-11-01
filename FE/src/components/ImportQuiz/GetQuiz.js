import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";

const QuizComponent = () => {
    const [questions, setQuestions] = useState([]);
    const {subjectId} = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/questions/get/${subjectId}`)
            .then((response) => {
                setQuestions(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleEdit = (questionId, id) => {
        // Xử lý sự kiện khi người dùng nhấn nút "Edit" cho câu hỏi với ID là `questionId`
    };

    const handleDelete = (quesId, subjectId) => {
        // Tạo đối tượng chứa `quesId` và `subjectId` để gửi trong phần body
        const data = {
            quesId: quesId,
            subjectId: subjectId,
        };

        axios.delete("http://localhost:8080/api/questions/delete", {
            headers: {
                "Content-Type": "application/json",
            },
            data: data, // Sử dụng data để gửi trong phần body
        })
            .then(response => {
                alert(response.data);
                window.location.reload();
            })
            .catch(error => {
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
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {questions.map((question, index) => (
                        <tr key={index}>
                            <td>{question.id}</td>
                            <td>{question.questionData}</td>
                            <td>
                                <button onClick={() => handleEdit(question.id, subjectId)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(question.id, subjectId)}>Delete</button>
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
