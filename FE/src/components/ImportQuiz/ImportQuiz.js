import React, { useState, useEffect } from 'react';
import QuestionForm from "./QuestionForm";
import jwtDecode from "jwt-decode";
import PrivateContent from "../HandleException/PrivateContent";
import QuizComponent from "./GetQuiz"; // Import Axios

const QuizForm = () => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    if (user.role !== "EXPERT") {
        return (
            <PrivateContent />
        )
    } else {
        return (
            <div className="container" style={{ display: "flex" }}>
                <div className="left-panel col-md-6">
                    <QuestionForm />
                </div>
                <div className="right-panel col-md-6">
                    <QuizComponent />
                </div>
            </div>
        );
    }
}

export default QuizForm;
