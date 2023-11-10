import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import BASE_URL from "../../api/baseapi";
const API_URL = `${BASE_URL}`;

const AddPracticeDetail = (props) => {
    const [examLevel, setExamLevel] = useState('easy');
    const [quizName, setQuizName] = useState('');
    const [durationTime, setDurationTime] = useState(0);
    const [passRate, setPassRate] = useState(0);
    const [description, setDescription] = useState('');
    const [quizAdded, setQuizAdded] = useState(null);
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    const quizTypeId = 2;

    const location = useLocation();
    const subjectId = location.state;
    console.log("SubjectID "+subjectId);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        
        const newExamInfo = {
            subjectId,
            examLevel,
            quizName,
            description,
            durationTime,
            passRate,
            quizTypeId,
        };

        try {
            const firstResponse = await axios.post(`${API_URL}/practice/add`, newExamInfo, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });


            const secondResponse = await fetch(
                `${BASE_URL}/attempt/quiz/add/result/${firstResponse.data.quizID}?userId=${user.userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(secondResponse);
            if (!secondResponse.ok) {
                console.error(secondResponse.message);                           
            }

            const data = await secondResponse.text();


            // Chuyển hướng người dùng sau khi thành công
            const newURL = `/quiz/take/${firstResponse.data.quizID}/${data}`;
            window.location.href = newURL; // Sử dụng window.location để chuyển hướng
        } catch (error) {
            // Xử lý lỗi khi gửi dữ liệu thất bại
            console.error('Error sending data to the API:', error);
        }
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

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    return (
        <div className="container add-practice-detail-container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center add-practice-title-name">Practice Detail</h2>
                    <form onSubmit={handleFormSubmit} className="add-practice-detail-form">
                        <div className="form-group">
                            <label htmlFor="quizName">Practice Name:</label>
                            <input
                                type="text"
                                className="quizName form-control"
                                onChange={handleQuizNameChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Note:</label>
                            <input
                                type="text-area"
                                className="quizName form-control"
                                onChange={handleDescriptionChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="durationTime">Duration Time (minutes):</label>
                            <input
                                type="number"
                                className="durationTime form-control"
                                onChange={handleDurationTimeChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passRate">Pass Rate (0-100%):</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                className="passRate form-control"
                                onChange={handlePassRateChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="examLevel">Practice Level:</label>
                            <select
                                className="form-control"
                                onChange={handleExamLevelChange}
                            >
                                <option value="easy">Easy (40)</option>
                                <option value="medium">Medium (50)</option>
                                <option value="hard">Hard (60)</option>
                            </select>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-dark btn-submit-add-practice">
                            New Practice
                        </button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPracticeDetail;
