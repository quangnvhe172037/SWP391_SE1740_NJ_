import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080";

const AddPracticeDetail = () => {
    const [subjectId, setSubjectId] = useState(1);
    const [examLevel, setExamLevel] = useState('easy');
    const [quizName, setQuizName] = useState('');
    const [durationTime, setDurationTime] = useState(0);
    const [passRate, setPassRate] = useState(0);
    const quizTypeId = 2;

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const newExamInfo = {
            subjectId,
            examLevel,
            quizName,
            durationTime,
            passRate,
            quizTypeId,
        };
        console.log(newExamInfo);
        axios
            .post(`${API_URL}/practice/add`, newExamInfo, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                // Xử lý khi gửi dữ liệu thành công
                console.log('Data sent successfully');
            })
            .catch((error) => {
                // Xử lý khi gửi dữ liệu thất bại
                console.error('Error sending data to the API:', error);
            });
    };

    const handleExamLevelChange = (event) => {
        setExamLevel(event.target.value);
    };

    const handleQuizNameChange = (event) => {
        setQuizName(event.target.value);
    };

    const handleDurationTimeChange = (event) => {
        setDurationTime(event.target.value);
    };

    const handlePassRateChange = (event) => {
        setPassRate(parseInt(event.target.value));
    };
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center">Thông tin bài kiểm tra</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="subjectName">Tên môn học (chỉ đọc):</label>
                            <input
                                type="text"
                                className="form-control"
                                id="subjectName"
                                value={"HTML"}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quizName">Tên bài kiểm tra:</label>
                            <input
                                type="text"
                                className="quizName form-control"
                                onChange={handleQuizNameChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="durationTime">Thời gian (phút):</label>
                            <input
                                type="number"
                                className="durationTime form-control"
                                onChange={handleDurationTimeChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passRate">Phần trăm đạt (0-100%):</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                className="passRate form-control"
                                onChange={handlePassRateChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="examLevel">Mức độ kiểm tra:</label>
                            <select
                                className="form-control"
                                onChange={handleExamLevelChange}
                            >
                                <option value="easy">Dễ (40)</option>
                                <option value="medium">Trung bình (50)</option>
                                <option value="hard">Khó (60)</option>
                            </select>
                        </div>
                        <button type="submit" className="practice btn btn-primary">
                            New Practice
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPracticeDetail;
