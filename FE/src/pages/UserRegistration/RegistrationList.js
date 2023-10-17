import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import "./Registration.css";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:8080";

function UserRes() {
    const [userPayments, setUserPayments] = useState([]);
    const [searchText, setSearchText] = useState(""); // Trạng thái tìm kiếm
    const [startDate, setStartDate] = useState(""); // Trạng thái ngày bắt đầu
    const [endDate, setEndDate] = useState(""); // Trạng thái ngày kết thúc

    useEffect(() => {
        axios.get(API_URL + '/myregistration/myRes')
            .then(response => {
                const data = response.data.map(item => ({
                    billID: item.billID,
                    status: item.status,
                    notify: item.notify,
                    purchase_date: item.purchase_date,
                    subject: {
                        subjectName: item.subject.subjectName,
                        subjectImage: item.subject.image
                    },
                    users: {
                        username: item.users.firstName + ' ' + item.users.lastName
                    }
                }));
                data.sort((a, b) => a.status - b.status);
                setUserPayments(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, []);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };


    // Lọc danh sách môn học dựa trên nội dung tìm kiếm và khoảng thời gian
    const filteredUserPayments = userPayments.filter(userPayment => {
        return userPayment.subject.subjectName.toLowerCase().includes(searchText.toLowerCase());
    });

    return (
        <div className="container">
            <h1>My course</h1>

            <div className="row">
                <div className="col-md-9">
                    {filteredUserPayments.map((userPayment) => (
                        <div key={userPayment.billID} className="course-card">
                            <div className="course-image">
                                <img src={userPayment.subjectImage} alt="" />
                            </div>
                            <div className="course-info">
                                <h2>Bill ID: {userPayment.billID}</h2>
                                <p>Notify: {userPayment.notify}</p>
                                <p>Purchase Date: {format(new Date(userPayment.purchase_date), 'dd-MM-yyyy')}</p>
                                <p>Subject: {userPayment.subject.subjectName}</p>
                                <p>User: {userPayment.users.username}</p>
                            </div>
                            <div className="course-details">
                                <button className={`btn ${userPayment.status === true ? 'btn-primary' : 'btn-secondary'} status-button`}>
                                    {userPayment.status === true ? 'Paid' : 'Pending'}
                                </button>
                                <button className="btn btn-success view-button">View</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-3 sidebar">
                    <h3 className="mb-3">Sidebar</h3>

                    <div className="search-box">
                        <div className="input-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm..."
                                value={searchText}
                                onChange={handleSearchChange}
                            />
                            <div className="input-group-append">
                                <button type="button" className="btn btn-primary custom-search-button">Tìm</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserRes;
