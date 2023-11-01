import React, { useState } from 'react';
import './QuestionForm.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function QuestionForm({ onAddQuestion }) {
    const [question, setQuestion] = useState('');
    const [answerA, setAnswerA] = useState('');
    const [answerB, setAnswerB] = useState('');
    const [answerC, setAnswerC] = useState('');
    const [answerD, setAnswerD] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [explanation, setExplanation] = useState('');
    const [previewQuestion, setPreviewQuestion] = useState(null);
    const { subjectId } = useParams();
    const [questionData, setQuestionData] = useState({
        question: '',
        answerOptions: ['', '', '', ''],
        correctAnswer: '',
        explanation: '',
    });

    const addQuestionToServer = async () => {
        if (
            !questionData.question ||
            !questionData.answerOptions[0] ||
            !questionData.answerOptions[1] ||
            !questionData.answerOptions[2] ||
            !questionData.answerOptions[3] ||
            !questionData.correctAnswer ||
            !questionData.explanation
        ) {
            alert('Please fill in all the question details.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/questions/add/${subjectId}`, questionData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                alert('Question added successfully.');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error when adding a question:', error);
        }
    };

    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        if (name === 'question') {
            setQuestionData((prevData) => ({ ...prevData, question: value }));
        } else if (name === 'answerOptions') {
            setQuestionData((prevData) => {
                const updatedAnswerOptions = [...prevData.answerOptions];
                updatedAnswerOptions[index] = value;
                return { ...prevData, answerOptions: updatedAnswerOptions };
            });
        } else {
            setQuestionData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    return (
        <div className="import-quiz">
            <h1>Add Question</h1>
            <div className="form-group">
                <label>Question</label>
                <input
                    type="text"
                    className="form-control"
                    name="question"
                    value={questionData.question}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group-answer" style={{ display: 'flex', alignItems: 'center' }}>
                <label>A</label>
                <input
                    type="text"
                    className="form-control"
                    name="answerOptions"
                    value={questionData.answerOptions[0]}
                    onChange={(e) => handleInputChange(e, 0)}
                />
                <label>B</label>
                <input
                    type="text"
                    className="form-control"
                    name="answerOptions"
                    value={questionData.answerOptions[1]}
                    onChange={(e) => handleInputChange(e, 1)}
                />
            </div>

            <div className="form-group-answer" style={{ display: 'flex', alignItems: 'center' }}>
                <label>C</label>
                <input
                    type="text"
                    className="form-control"
                    name="answerOptions"
                    value={questionData.answerOptions[2]}
                    onChange={(e) => handleInputChange(e, 2)}
                />
                <label>D</label>
                <input
                    type="text"
                    className="form-control"
                    name="answerOptions"
                    value={questionData.answerOptions[3]}
                    onChange={(e) => handleInputChange(e, 3)}
                />
            </div>
            <div className="form-group">
                <label>Correct answer</label>
                <input
                    type="text"
                    className="form-control"
                    name="correctAnswer"
                    value={questionData.correctAnswer}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Explaination</label>
                <textarea
                    className="form-control"
                    name="explanation"
                    value={questionData.explanation}
                    onChange={handleInputChange}
                />
            </div>
            <button className="btn " onClick={addQuestionToServer} style={{backgroundColor: "white", color: "black", border: "1px solid black"}}>
                Add
            </button>
        </div>
    );
}

export default QuestionForm;
