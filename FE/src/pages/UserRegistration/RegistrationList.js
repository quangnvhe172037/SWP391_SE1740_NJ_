import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import "./Registration.css";
import "bootstrap/dist/css/bootstrap.min.css";

import jwtDecode from "jwt-decode";
import PrivateContent from "../../components/HandleException/PrivateContent";

const API_URL = "http://localhost:8080";
const Local_URL = "http://localhost:8081";

function UserRes() {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    const [userPayments, setUserPayments] = useState([]);
    const [searchText, setSearchText] = useState(""); // Trạng thái tìm kiếm
    // const [startDate, setStartDate] = useState(""); // Trạng thái ngày bắt đầu
    // const [endDate, setEndDate] = useState(""); // Trạng thái ngày kết thúc
    console.log(user);
    console.log("check");
    console.log(API_URL + '/myregistration/myRes' + '?userid=' + user.userId);
    useEffect(() => {
        axios .get(API_URL + '/myregistration/myRes' + '?userid=' + user.userId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                console.log(response);
                const data = response.data.map(item => ({
                    billID: item.billID,
                    status: item.status,
                    notify: item.notify,
                    purchase_date: item.purchaseDate,
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

    if (user.role !== "CUSTOMER") {
        return (
            <PrivateContent/>
        )
    } else {
        return (
          <div className="container">
            <h1>My course</h1>
            <div className="search-box mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm theo subject name.."
                  value={searchText}
                  onChange={handleSearchChange}
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-primary custom-search-button"
                  >
                    Tìm
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              {filteredUserPayments.length === 0 ? (
                <p>No data found</p>
              ) : (
                filteredUserPayments.map((userPayment) => (
                  <div
                    key={userPayment.billID}
                    className="course-card col-md-3"
                  >
                    <div className="post">
                      <div className="post-image">
                        <img
                          src={Local_URL +'/' + userPayment.subject.subjectImage}
                          alt=""
                        />
                      </div>
                      <p>Subject: {userPayment.subject.subjectName}</p>
                      <p>
                        Purchase Date:{" "}
                        {format(
                          new Date(userPayment.purchase_date),
                          "dd-MM-yyyy"
                        )}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
    }
}

export default UserRes;
