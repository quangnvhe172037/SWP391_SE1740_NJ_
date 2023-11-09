import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./style.css";
import {format} from "date-fns";
import { Card, Row, Col, Button,Table  } from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom';

import AddPracticeDetail from "./AddPracticeDetail";
import BASE_URL from "../../api/baseapi";
const API_URL = `${BASE_URL}`;





function PracticeList() {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    const [practiceList, setPracticeList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [subjectNameinweb, setSubjectNameinweb] = useState("");

    const location = useLocation();
    const subjectid = location.state;
    console.log("SubjectID "+subjectid);
    useEffect(() => {
        axios.get(API_URL + "/practice/list" + "?userid=" + user.userId + "&" + "subjectid=" + subjectid)
            .then((response) => {
                const data = response.data.map((item) => ({
                    resultID: item.resultID,
                    score: item.score,
                    user: {
                        usersid: item.user.id,
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
                        quizDescription: item.quizzes.description,
                    },
                    correctAnswer: item.correctAnswer,
                    nullAnswer: item.nullAnswer,
                    falseAnswer: item.falseAnswer,
                    isPass: item.isPass,
                }));

                setPracticeList(data);
                setSubjectNameinweb(data[0].quizzes.subjectName);
                console.log(subjectNameinweb);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    // const handleDelete = (event, resultID) => {
    //     event.preventDefault();
    //
    //     const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    //
    //     if (confirmDelete) {
    //         // Gửi yêu cầu xóa đến máy chủ với resultID
    //         axios.delete(`${API_URL}/practice/delete/${resultID}`)
    //             .then((response) => {
    //                 // Xử lý phản hồi từ máy chủ (nếu cần)
    //                 console.log("Item deleted successfully.");
    //                 // Sau khi xóa thành công, bạn có thể cập nhật danh sách bằng cách gọi lại API hoặc cập nhật state
    //             })
    //             .catch((error) => {
    //                 console.error("Error deleting item: ", error);
    //             });
    //     }
    // };

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
                    <h1 style={{ textAlign: 'center' }}>{subjectNameinweb}</h1>
                </div>

            </div>
            <div className="row mb-4">
                <div className="col-md-6">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo Quiz Name..."
                        className="form-control"
                        id="search-input"
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="col-md-4 text-right">
                <Link to={"/practice/add"} state={subjectid}>
                    <button className="practice btn btn-success f">New practice</button>
                </Link>
            </div>
            </div>
            {filteredPracticeList.length === 0 ? (
                <p>Not Found</p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Quiz Name</th>
                        <th>Note</th>
                        <th className="action-column">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredPracticeList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.resultID}</td>
                            <td>
                                <div>
                                    <span>{item.quizzes.quizName}</span>
                                    <br />
                                    <span>{format(new Date(item.quizzes.quizDateCreate), 'dd-MM-yyyy')}</span>
                                </div>
                            </td>
                            <td>{item.quizzes.quizDescription}</td>
                            <td style={{ width: '200px' }}>
                                <div className="actions">
                                    <Link to={`/practice/view/${item.resultID}`}>View Details</Link>
                                    {/*<a href="#" onClick={(e) => handleDelete(e, item.resultID)}>Delete</a>*/}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </div>

    );
}

export default PracticeList;
