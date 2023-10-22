import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  convertToYYYYMMDD,
  formatDateToCustomFormat,
  formatDateToYYYYMMDD,
} from "./UserRegistrationListFunc";

const UserRegisterList = () => {
  const token = localStorage.getItem("token");
  const [bills, setBills] = useState([]);
  const [billsView, setBillsView] = useState([]);
  const [sortItem, setSortItem] = useState({
    billID: true,
    email: true,
    purchaseDate: true,
    subjectName: true,
    cateName: true,
    price: true,
    status: true,
    validFrom: true,
    validTo: true,
  });
  const [searchValue, setSearchValue] = useState("");
  const [validFrom, setValidFrom] = useState(formatDateToYYYYMMDD(new Date()));
  const [validTo, setValidTo] = useState(formatDateToYYYYMMDD(new Date()));

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/user-registration-list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const apiBills = response.data.map((item) => ({
          billID: item.billID.toString(),
          email: item.users.email,
          purchaseDate: formatDateToCustomFormat(
            item.purchaseDate,
            "DD/MM/YYYY hh:mm:ss"
          ),
          subjectName: item.subject.subjectName,
          cateName: item.subject.subjectCategory.cateName,
          price: item.subjectPrice.price.toString(),
          status: item.status.toString(),
          validFrom: "Valid From",
          validTo: "Valid To",
        }));
        setBills(apiBills);
        setBillsView(
          apiBills.filter((item) => {
            return (
              new Date(convertToYYYYMMDD(item.purchaseDate)).getDate() ===
                new Date().getDate() &&
              new Date(convertToYYYYMMDD(item.purchaseDate)).getMonth() ===
                new Date().getMonth() &&
              new Date(convertToYYYYMMDD(item.purchaseDate)).getFullYear() ===
                new Date().getFullYear()
            );
          })
        );
      } catch (error) {
        if (error.response && error.response.status === 403) {
          localStorage.removeItem("token");
        }
        console.error("Error fetching accounts:", error);
      }
    };

    fetchBills();
  }, []);

  const onChangeSortItem = (item) => {
    // Tạo một bản sao của mảng bills để không ảnh hưởng đến mảng gốc
    const listTemp = [...billsView];

    // Sắp xếp mảng listTemp dựa trên thuộc tính được chọn (item)
    listTemp.sort((a, b) => {
      const result = a[item].localeCompare(b[item]);
      if (result < 0 && sortItem[item]) {
        return 1;
      }
      if (result > 0 && sortItem[item]) {
        return -1;
      }
      if (result < 0 && !sortItem[item]) {
        return -1;
      }
      if (result > 0 && !sortItem[item]) {
        return 1;
      }
      return 0;
    });

    // Lưu mảng đã sắp xếp vào billsView để hiển thị
    setBillsView(listTemp);

    // Cập nhật trạng thái sắp xếp cho item
    sortItem[item] = !sortItem[item];
    setSortItem(sortItem);
  };

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    let searchValueF = searchValue;
    let validFromF = validFrom;
    let validToF = validTo;
    if (e.target.name === "email") searchValueF = e.target.value;
    if (e.target.name === "validFrom") validFromF = e.target.value;
    if (e.target.name === "validTo") validToF = e.target.value;

    const lstTemp = bills.filter(
      (item) =>
        item.email.toLowerCase().includes(searchValueF.toLowerCase()) &&
        new Date(convertToYYYYMMDD(item.purchaseDate)) >=
          new Date(validFromF) &&
        new Date(convertToYYYYMMDD(item.purchaseDate)) <= new Date(validToF)
    );
    setSearchValue(searchValueF);
    setValidFrom(validFromF);
    setValidTo(validToF);
    setBillsView(lstTemp);
  };

  return (
    <div className="view-container mt-5 container">
      <h2 className="font-weight-bold h3">User Registration List</h2>
      <div className="row">
        <div className="col-md-6">
          <input
            name="email"
            type="text"
            className="form-control w-100"
            value={searchValue}
            placeholder="Enter Email"
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control w-100"
            name="validFrom"
            value={validFrom}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control w-100"
            name="validTo"
            value={validTo}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="row" style={{ padding: "15px" }}>
        <table className="table mt-3 table-hover">
          <thead>
            <tr>
              <th>
                Id
                <span onClick={() => onChangeSortItem("billID")}>
                  {sortItem.billID ? "▲" : "▼"}
                </span>
              </th>
              <th>
                Email
                <span onClick={() => onChangeSortItem("email")}>
                  {sortItem.email ? "▲" : "▼"}
                </span>
              </th>
              <th>
                Registration Time
                <span onClick={() => onChangeSortItem("purchaseDate")}>
                  {sortItem.purchaseDate ? "▲" : "▼"}
                </span>
              </th>
              <th>
                Subject
                <span onClick={() => onChangeSortItem("subjectName")}>
                  {sortItem.subjectName ? "▲" : "▼"}
                </span>
              </th>
              <th>
                Package
                <span onClick={() => onChangeSortItem("cateName")}>
                  {sortItem.cateName ? "▲" : "▼"}
                </span>
              </th>
              <th>
                Cost
                <span onClick={() => onChangeSortItem("price")}>
                  {sortItem.price ? "▲" : "▼"}
                </span>
              </th>
              <th>
                Status
                <span onClick={() => onChangeSortItem("status")}>
                  {sortItem.status ? "▲" : "▼"}
                </span>
              </th>
              <th>
                Valid From
                <span onClick={() => onChangeSortItem("validFrom")}>
                  {sortItem.validFrom ? "▲" : "▼"}
                </span>
              </th>
              <th>
                Valid To
                <span onClick={() => onChangeSortItem("validTo")}>
                  {sortItem.validTo ? "▲" : "▼"}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {billsView.map((item) => (
              <tr key={item.billID}>
                <td>
                  <Link to={item.billID}>{item.billID}</Link>
                </td>
                <td>{item.email}</td>
                <td>{item.purchaseDate}</td>
                <td>{item.subjectName}</td>
                <td>{item.cateName}</td>
                <td>{item.price}</td>
                <td>{item.status}</td>
                <td>{item.validFrom}</td>
                <td>{item.validTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRegisterList;
