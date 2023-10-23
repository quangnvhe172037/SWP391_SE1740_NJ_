import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./style.css";
import {format} from "date-fns";
const API_URL = "http://localhost:8080";

function PracticeList() {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    const [practiceList, setPracticeList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const subjectid = 4;
    let subjectNameinweb = "";
    useEffect(() => {
        axios.get(API_URL + "/practice/detail" + "?userid=" + user.userId + "?" + "subjectid=" + subjectid)
            .then((response) => {
                const data = response.data.map((item) => ({
                    resultID: item.resultID,
                    score: item.score,
                    user: {
                        usersid: item.user.usersid,
                        firstName: item.user.firstName,
                        lastName: item.user.lastName,
                    },
                    dateTaken: item.dateTaken,
                    quizzes: {
                        quizid: item.quizzes.quizID,
                        quizName: item.quizzes.quizName,
                        quizDuration: item.quizzes.durationTime,
                        quizDateCreate: item.quizzes.dateCreate,
                        subjectName: item.quizzes.subject.subjectName,
                    },
                    correctAnswer: item.correctAnswer,
                    nullAnswer: item.nullAnswer,
                    falseAnswer: item.falseAnswer,
                    isPass: item.isPass,
                }));

                setPracticeList(data);
                console.log(data[0]);
                if (data.length > 0) {
                    subjectNameinweb = data[0].quizzes.subject.subjectName;
                }
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Lọc danh sách dựa trên giá trị tìm kiếm
    const filteredPracticeList = practiceList.filter((item) => {
        return item.quizzes.quizName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-md-6">

                    <div className="col-md-6">
                        
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo Quiz Name..."
                            className="form-control"
                            id="search-input"
                            onChange={handleSearchChange} // Gắn sự kiện onChange vào ô tìm kiếm
                        />
                    </div>
                </div>
                <div className="col-md-6 text-right">
                    <button className="btn btn-success">New practice</button>
                    <button className="btn btn-success">Simulation exam</button>
                </div>
            </div>
            {filteredPracticeList.length === 0 ? (
                <p>Not Found</p>
            ) : (
                filteredPracticeList.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 custom-border">
                                    <h5 className="mb-3">Quiz name: {item.quizzes.quizName}</h5>
                                    <h6>Date create: {format(new Date(item.quizzes.quizDateCreate), 'dd-MM-yyyy')}</h6>
                                    <h6>Status: {item.isPass === "true" ? "pass" : "not pass"}</h6>
                                </div>
                                <div className="col-md-2 custom-border center-text">
                                    <p>Date taken:</p>
                                    <br/>
                                    {format(new Date(item.dateTaken), 'dd-MM-yyyy')}
                                </div>
                                <div className="col-md-2 custom-border center-text">
                                    <p>{item.correctAnswer} Correct</p>
                                    <p>per</p>
                                    <p>{(item.correctAnswer + item.nullAnswer + item.falseAnswer)} questions</p>
                                </div>
                                <div className="col-md-2 custom-border center-text">
                                    <p>{((item.correctAnswer / (item.correctAnswer + item.nullAnswer + item.falseAnswer)) * 100).toFixed(2)}%<br />Correct</p>
                                </div>
                                <div className="col-md-2 center-text centered-button-div">
                                    <div className="button-wrapper">
                                        <a href="#" className="btn btn-primary">
                                            View Details
                                        </a>
                                        <p>Duration: {item.quizzes.quizDuration}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}

        </div>
    );
}

export default PracticeList;
