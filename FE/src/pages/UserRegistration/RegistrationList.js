import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import "./Registration.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BASE_URL from "../../api/baseapi";
import FE_URL from '../../api/frontendapi';
import jwtDecode from "jwt-decode";
import PrivateContent from "../../components/HandleException/PrivateContent";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate"; // Import the pagination component

function UserRes() {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    const [userPayments, setUserPayments] = useState([]);
    const [searchText, setSearchText] = useState(""); // Search text state
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;
    const offset = currentPage * itemsPerPage;

    useEffect(() => {
        axios
            .get(BASE_URL + "/myregistration/myRes" + "?userid=" + user.userId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const data = response.data.map((item) => ({
                    billID: item.billID,
                    status: item.status,
                    notify: item.notify,
                    purchase_date: item.purchaseDate,
                    subject: {
                        subjectID: item.subject.subjectID,
                        subjectName: item.subject.subjectName,
                        subjectImage: item.subject.image,
                    },
                    users: {
                        username: item.users.firstName + " " + item.users.lastName,
                    },
                }));
                data.sort((a, b) => a.status - b.status);
                setUserPayments(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        setCurrentPage(0); // Reset to the first page when searching
    };

    const filterUserPayments = (payments, searchText) => {
        return payments.filter((payment) =>
            payment.subject.subjectName.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    const displayPaginatedUserPayments = (payments) => {
        return payments
            .slice(offset, offset + itemsPerPage)
            .map((userPayment) => (
                <div key={userPayment.billID} className="course-card col-md-3">
                    <div className="post">
                        <Link to={`/practice`} state={userPayment.subject.subjectID}>
                            <div className="post-image">
                                <img src={FE_URL + '/' + userPayment.subject.subjectImage} alt="" />
                            </div>
                            <p>Subject: {userPayment.subject.subjectName}</p>
                        </Link>
                        <p>
                            Purchase Date:{" "}
                            {format(
                                new Date(userPayment.purchase_date),
                                "dd-MM-yyyy"
                            )}
                        </p>
                    </div>
                </div>
            ));
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    if (user.role !== "CUSTOMER") {
        return (
            <PrivateContent/>
        )
    } else {
        const filteredPayments = filterUserPayments(userPayments, searchText);

        return (
            <div className="container">
                <h1>My course</h1>
                <div className="search-box mb-3">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by subject name.."
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                        <div className="input-group-append">
                            <button
                                type="button"
                                className="btn btn-primary custom-search-button"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {filteredPayments.length === 0 ? (
                        <p>No data found</p>
                    ) : (
                        displayPaginatedUserPayments(filteredPayments)
                    )}
                </div>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={Math.ceil(filteredPayments.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination justify-content-center"} // Add Bootstrap class
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    previousLinkClassName={"page-link"} // Add Bootstrap class for previous button
                    nextLinkClassName={"page-link"} // Add Bootstrap class for next button
                    breakClassName={"page-item"} // Add Bootstrap class for break label
                    pageClassName={"page-item"} // Add Bootstrap class for page item
                    pageLinkClassName={"page-link"} // Add Bootstrap class for page link
                />

            </div>
        );
    }
}

export default UserRes;
