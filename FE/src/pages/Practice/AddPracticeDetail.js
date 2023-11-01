import React, { useState, useEffect } from "react";
import axios from "axios";

const api_url = "YOUR_API_ENDPOINT";

const AddPracticeDetail = () => {
    const [subjectNames, setSubjectName] = useState('');
    const [examLevel, setExamLevel] = useState('easy');
    const [quizName, setQuizName] = useState('');
    const [durationTime, setDurationTime] = useState('00:00:00');
    const [passRate, setPassRate] = useState(0);

    // Use useEffect to load data from the API when the component mounts
    useEffect(() => {
        axios
            .get(api_url)
            .then((response) => {
                const data = response.data;
                setSubjectName(data.subjectName);
                setExamLevel(data.examLevel);
                setQuizName(data.quizName);
                setDurationTime(data.durationTime);
                setPassRate(data.passRate);
            })
            .catch((error) => {
                console.error('Error loading data from the API:', error);
            });
    }, []);

    const handleSubjectNameChange = (event) => {
        setSubjectName(event.target.value);
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

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const newExamInfo = {
            subjectNames,
            examLevel,
            quizName,
            durationTime,
            passRate,
        };

        axios
            .post(api_url, newExamInfo, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                // Handle a successful response here
                console.log('Data sent successfully');
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error sending data to the API:', error);
            });
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
                                onChange={handleQuizNameChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="durationTime">Thời gian (hh:mm:ss):</label>
                            <input
                                type="time"
                                step="1"
                                className="durationTime form-control"
                                value={durationTime}
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
                                value={passRate}
                                onChange={handlePassRateChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="examLevel">Mức độ kiểm tra:</label>
                            <select
                                className="form-control"
                                id="examLevel"
                                value={examLevel}
                                onChange={handleExamLevelChange}
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
            </div>
        </div>
    );
};

export default AddPracticeDetail;
