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

    useEffect(() => {
        axios.get(API_URL + "/practice/list" + "?userid=" + user.userId)
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
                    },
                    correctAnswer: item.correctAnswer,
                    nullAnswer: item.nullAnswer,
                    falseAnswer: item.falseAnswer,
                    isPass: item.isPass,
                }));
                setPracticeList(data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-md-6">
                    {/*<label htmlFor="practice-type">Subject:</label>*/}
                    {/*<select className="custom-select" id="practice-type">*/}
                    {/*    <option value="loai1">Loại 1</option>*/}
                    {/*    <option value="loai2">Loại 2</option>*/}
                    {/*    <option value="loai3">Loại 3</option>*/}
                    {/*</select>*/}
                </div>
                <div className="col-md-6 text-right">
                    <button className="btn btn-success">New practice</button>
                    <button className="btn btn-success">Simulation exam</button>
                </div>
            </div>

            {practiceList.map((item, index) => (
                <div key={index} className="card mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4 custom-border">
                                <h5 className="mb-3">Quiz name: {item.quizzes.quizName}</h5>
                                <h6>Date create: {format(new Date(item.quizzes.quizDateCreate), 'dd-MM-yyyy')}</h6>


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
            ))}
        </div>
    );
}

export default PracticeList;
