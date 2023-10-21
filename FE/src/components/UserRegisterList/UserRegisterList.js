import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const UserRegisterList = () => {
  const token = localStorage.getItem("token");
  const [accounts, setAccounts] = useState([]);
  const [editableAccounts, setEditableAccounts] = useState([]);
  const [sortByRoleAscending, setSortByRoleAscending] = useState(true);
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/user-registration-list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAccounts(response.data);
        setEditableAccounts(new Array(response.data.length).fill(false));
      } catch (error) {
        if (error.response && error.response.status === 403) {
          localStorage.removeItem("token");
        }
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div className="view-container mt-5">
      <h2 className="font-weight-bold h3">User Registration List</h2>
      {/* <input
        type="text"
        className="form-control"
        id="searchEmail"
        value={searchEmail}
        onChange={handleSearchChange}
      /> */}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Registration Time</th>
            <th>Subject</th>
            <th>Package</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Valid From</th>
            <th>Valid To</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link to={"1"}>1</Link>
            </td>
            <td>Email</td>
            <td>Registration Time</td>
            <td>Subject</td>
            <td>Package</td>
            <td>Cost</td>
            <td>Status</td>
            <td>Valid From</td>
            <td>Valid To</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserRegisterList;
