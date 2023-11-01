import React, { useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const API_URL = "";
function ViewQuizResult() {
    const { resultid } = useParams();
    const [quizResult, setQuizResult] = useState({});

    useEffect(() =>{
        axios.get()
        }

    )

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center">Thông tin bài kiểm tra</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="subjectName">Tên môn học (chỉ đọc):</label>
                            <input
                                type="text"
                                className="form-control"
                                id="subjectName"
                                value={subjectNames}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quizName">Tên bài kiểm tra:</label>
                            <input
                                type="text"
                                className="quizName form-control"
                                value={quizName}
                                name="quizName"
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="durationTime">Thời gian (hh:mm:ss):</label>
                            <input
                                type="time"
                                step="1"
                                className="durationTime form-control"
                                value={durationTime}
                                name="durationTime"
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passRate">Phần trăm đạt (0-100%):</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                className="passRate form-control"
                                value={passRate}
                                name="passRate"
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="examLevel">Mức độ kiểm tra:</label>
                            <select
                                className="form-control"
                                id="examLevel"
                                value={examLevel}
                                name="examLevel"
                                readOnly
                            >
                                <option value="easy">Dễ</option>
                                <option value="medium">Trung bình</option>
                                <option value="hard">Khó</option>
                            </select>
                        </div>
                        <button type="submit" className="practice btn btn-primary">
                            New Practice
                        </button>
                    </form>
                </div>
                <div className="col-md-6">
                    <div style={{ textAlign: 'center' }}>
                        <p>Số câu đúng: <span id="correctAnswers">{correctAnswers}</span></p>
                        <p>Số câu sai: <span id="incorrectAnswers">{incorrectAnswers}</span></p>
                        <p>Số câu không khoanh: <span id="unansweredQuestions">{unansweredQuestions}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewQuizResult;
