import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { formatDateToCustomFormat } from "../UserRegistrationListFunc";
import { toast } from "react-toastify";

const UserRegistrationDetail = () => {
  const token = localStorage.getItem("token");
  const [bill, setBill] = useState({});
  const [status, setStatus] = useState("");
  const [notify, setNotify] = useState("");

  const { billID } = useParams();
  useEffect(() => {
    const fetchBillDetail = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/user-registration-list/" + billID,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBill(response.data);
        setStatus(response.data.status.toString());
        setNotify(response.data.notify);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          localStorage.removeItem("token");
        }
        console.error("Error fetching accounts:", error);
      }
    };
    fetchBillDetail();
  }, []);

  const handleStatusChange = (event) => {
    setStatus(JSON.parse(event.target.value)); // Cập nhật trạng thái khi giá trị thay đổi
  };

  const handleNotifyChange = (event) => {
    setNotify(event.target.value); // Cập nhật trạng thái khi giá trị thay đổi
  };

  const handleOnSubmit = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8080/admin/user-registration-list/" + billID,
        {
          status: JSON.parse(status),
          notify,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBill(response.data);
      setStatus(response.data.status.toString());
      setNotify(response.data.notify);
      toast.success("Update Success");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        localStorage.removeItem("token");
      }
      console.error("Error fetching accounts:", error);
    }
  };

  return (
    <div className="container">
      <div className="view-container mt-5">
        <h2 className="font-weight-bold h3">User {bill?.users?.email}</h2>
        <form className="row mb-5">
          <div className="form-group col-md-6">
            <label for="exampleFormControlInput1">Full name</label>
            <input
              value={`${bill?.users?.lastName} ${bill?.users?.firstName}`}
              readOnly
              className="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div className="form-group col-md-3 col-6">
            <label for="exampleFormControlInput1">Gender</label>
            <button
              type="button"
              className={`btn btn-outline-primary w-100 ${
                bill?.users?.gender ? "active" : ""
              }`}
              readOnly
            >
              Male
            </button>
          </div>
          <div className="form-group col-md-3 col-6">
            <label for="exampleFormControlInput1">
              <br />
            </label>
            <button
              type="button"
              className={`btn btn-outline-danger w-100 ${
                !bill?.users?.gender ? "active" : ""
              }`}
              readOnly
            >
              Female
            </button>
          </div>
          <div className="form-group col-md-6">
            <label for="exampleFormControlInput1">Email address</label>
            <input
              value={bill?.users?.email}
              readOnly
              className="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div className="form-group col-md-6">
            <label for="exampleFormControlInput1">Registration time</label>
            <input
              value={formatDateToCustomFormat(
                bill?.purchaseDate,
                "DD/MM/YYYY hh:mm:ss"
              )}
              readOnly
              className="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div className="form-group col-md-6">
            <label for="exampleFormControlInput1">Subject</label>
            <input
              value={bill?.subject?.subjectName}
              readOnly
              className="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div className="form-group col-md-6">
            <label for="exampleFormControlInput1">Package</label>
            <input
              value={bill?.subject?.subjectCategory?.cateName}
              readOnly
              className="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div className="form-group col-md-6">
            <label for="exampleFormControlInput1">Valid From</label>
            <input
              value={"ValidFrom"}
              readOnly
              className="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div className="form-group col-md-6">
            <label for="exampleFormControlInput1">Valid To</label>
            <input
              value={"ValidTo"}
              readOnly
              className="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div className="form-group col-md-6">
            <label for="exampleFormControlInput1">Cost</label>
            <input
              value={bill?.subjectPrice?.price}
              readOnly
              className="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div className="form-group col-md-6">
            <label for="exampleFormControlSelect1">Status</label>
            <select
              onChange={handleStatusChange}
              className="form-control"
              id="exampleFormControlSelect1"
            >
              <option selected={status === "false"} value={"false"}>
                Đang chờ kiểm duyệt
              </option>
              <option selected={status === "true"} value={"true"}>
                Đăng kí thành công
              </option>
            </select>
          </div>
          <div className="form-group col-12">
            <label for="exampleFormControlTextarea2">Notify</label>
            <textarea
              value={notify}
              onChange={handleNotifyChange}
              className="form-control"
              id="exampleFormControlTextarea2"
              rows="3"
            ></textarea>
          </div>
          <div className="form-group col-12">
            <button
                onClick={handleOnSubmit}
                type="button"
                className="btn-primary w-100"
                style={{ backgroundColor: 'blue' }}
            >
              Save
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationDetail;
