import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import PieChart from "../../PipeChart";
import BASE_URL from "../../api/baseapi";
const API_URL = `${BASE_URL}`;

function ViewQuizResult() {
    const { resultid } = useParams();
    const [quizResult, setQuizResult] = useState({});

    useEffect(() => {
        axios
            .get(`${API_URL}/practice/view/${resultid}`)
            .then((response) => {
                const data = response.data; // Lấy dữ liệu từ API

                // Sử dụng map để bóc tách các trường từ dữ liệu API và lưu vào state
                const quizResultData = {
                    resultID: data.resultID,
                    score: data.score,
                    user: {
                        userId: data.user.id,
                        firstName: data.user.firstName,
                        lastName: data.user.lastName,
                        email: data.user.email,
                    },
                    dateTaken: data.dateTaken,
                    quizzes: {
                        quizID: data.quizzes.quizID,
                        quizName: data.quizzes.quizName,
                        description: data.quizzes.description,
                        subject: {
                            subjectID: data.quizzes.subject.subjectID,
                            subjectName: data.quizzes.subject.subjectName,
                        },
                        lessonid: data.quizzes.lessonid,
                        quizTypes: data.quizzes.quizTypes,
                        dateCreate: data.quizzes.dateCreate,
                        durationTime: data.quizzes.durationTime,
                        passRate: data.quizzes.passRate,
                    },
                    correctAnswer: data.correctAnswer,
                    nullAnswer: data.nullAnswer,
                    falseAnswer: data.falseAnswer,
                    isPass: data.isPass,
                };

                // Set state với đối tượng mới
                setQuizResult(quizResultData);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, [resultid]);


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center">Quiz result information</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="subjectName">Subject name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="subjectName"
                                value={quizResult.quizzes && quizResult.quizzes.subject.subjectName} // Truy cập dữ liệu bên trong API
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quizName">Quiz name:</label>
                            <input
                                type="text"
                                className="quizName form-control"
                                value={quizResult.quizzes && quizResult.quizzes.quizName}
                                name="quizName"
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="durationTime">Date taken:</label>
                            <input
                                type="text"
                                className="durationTime form-control"
                                value={quizResult.quizzes && format(new Date(quizResult.dateTaken), "dd-MM-yyyy")}
                                name="durationTime"
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passRate">Pass rate:</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                className="passRate form-control"
                                value={quizResult.quizzes && quizResult.quizzes.passRate}
                                name="passRate"
                                readOnly
                            />
                        </div>

                        <button
                            className={`practice btn ${
                                quizResult.isPass ? "btn-success" : "btn-danger"
                            }`}
                        >
                            {quizResult.isPass ? "Pass" : "Not Pass"}
                        </button>
                    </form>
                </div>
                <div className="col-md-6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ marginBottom: '30px' }}>Test Results</h1>
                        <PieChart trueAnswer={quizResult.correctAnswer} falseAnswer={quizResult.falseAnswer} nullAnswer={quizResult.nullAnswer} />
                    </div>

                </div>

            </div>
        </div>
    );
}

export default ViewQuizResult;
