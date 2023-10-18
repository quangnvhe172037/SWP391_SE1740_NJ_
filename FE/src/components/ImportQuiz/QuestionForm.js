import React, { useState } from 'react';
import './QuestionForm.css';

function QuestionForm({ onAddQuestion }) {
    const [question, setQuestion] = useState('');
    const [answerA, setAnswerA] = useState('');
    const [answerB, setAnswerB] = useState('');
    const [answerC, setAnswerC] = useState('');
    const [answerD, setAnswerD] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [explanation, setExplanation] = useState('');
    const [previewQuestion, setPreviewQuestion] = useState(null);

    const handleAddQuestion = () => {
        const questionData = {
            question,
            answerOptions: [answerA, answerB, answerC, answerD],
            correctAnswer,
            explanation,
        };

        setPreviewQuestion(questionData);
        onAddQuestion(questionData);
    };

    return (
        <div className="question-form">
            <div className="form-group">
                <label>Câu hỏi</label>
                <input type="text" className="form-control" value={question} onChange={(e) => setQuestion(e.target.value)} />
            </div>
            <div className="form-group answer-group">
                <label>Đáp án A</label>
                <input type="text" className="form-control" value={answerA} onChange={(e) => setAnswerA(e.target.value)} />
                <label>Đáp án B</label>
                <input type="text" className="form-control" value={answerB} onChange={(e) => setAnswerB(e.target.value)} />
            </div>
            <div className="form-group answer-group">
                <label>Đáp án C</label>
                <input type="text" className="form-control" value={answerC} onChange={(e) => setAnswerC(e.target.value)} />
                <label>Đáp án D</label>
                <input type="text" className="form-control" value={answerD} onChange={(e) => setAnswerD(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Đáp án đúng</label>
                <input type="text" className="form-control" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Lời giải thích</label>
                <textarea className="form-control" value={explanation} onChange={(e) => setExplanation(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={handleAddQuestion}>Thêm</button>
        </div>
    );
}

export default QuestionForm;
