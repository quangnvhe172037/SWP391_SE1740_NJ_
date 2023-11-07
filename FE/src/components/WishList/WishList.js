
import { Routes, Route, Link,useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import jwtDecode from 'jwt-decode';
import DayJs from '../Home/DayJs';
import Button from "@mui/material/Button";
import BASE_URL from '../../api/baseapi';

const WishList = () => {
    const [deleteSubject,setDeleteSubject] = useState(0);
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
    useEffect(() => {
        fetch(`${BASE_URL}/user/subject/subjects-wishlist?userId=` + user.userId, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
    
          .then((dataJson) => {
            const data = dataJson.map((item) => ({
                subjectID: item.subjectID,
                subjectName: item.subjectName,
                subjectCategory: item.subjectCategory,
                status: item.status,
                description: item.description,
                create_date: item.create_date,
                image: item.image,
              }));
              return data;
          })
    
          .then((result) => {
            const mockData = result;
            console.log(mockData);
            setSubjects(mockData);
          });
      }, []);
      const handleCheckout = (subject) => {
        navigate(`/payment/checkout/course/${subject.subjectID}`);
        
      }
      const handleDelete = (subjectID) => {
        fetch(`${BASE_URL}/user/subject/deletesubjectwishlist?userId=` + user.userId + `&subjectId=` + subjectID, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
      
            .then((dataJson) => {
              const data = dataJson.map((item) => ({
                  subjectID: item.subjectID,
                  subjectName: item.subjectName,
                  subjectCategory: item.subjectCategory,
                  status: item.status,
                  description: item.description,
                  create_date: item.create_date,
                  image: item.image,
                }));
                return data;
            })
      
            .then((result) => {
              const mockData = result;
              console.log(mockData);
              setSubjects(mockData);
            });
      }
      return (
        <>
          <table className="table table-striped" border={"4px"}>
            <thead>
              <tr>
                <td scope="col" className="slider-table-header">
                  ID
                </td>
                <td scope="col" className="slider-table-header">
                  Image
                </td>
                <td scope="col" className="slider-table-header">
                  Name
                </td>
                <td scope="col" className="slider-table-header">
                  CategoryName
                </td>
                <td scope="col" className="slider-table-header">
                  Status
                </td>
                <td scope="col" className="slider-table-header">
                  Created Date
                </td>
                <td scope="col" className="slider-table-header">
                  Action
                </td>
              </tr>
            </thead>
            <tbody>
              {subjects.map((item, index) => (
                  <tr scope="row">
                    <td className="slider-table-data">{item.subjectID}</td>
                    <td className="slider-table-data">
                      <img src={`${item.image}`}  style={{height: "80px", width: "80px"}}/>
                    </td>
                    <td className="slider-table-data">{item.subjectName}</td>
                    <td className="slider-table-data">
                      {item.subjectCategory.cateName}
                    </td>
                    <td className="slider-table-data">
                      {item.status ? "active" : "deactive"}
                    </td>
                    <td className="slider-table-data">
                      {DayJs.from(item.create_date)}
                    </td>
                    <td className="slider-table-data">
                       <Button onClick={() => handleCheckout(item)}>Checkout</Button>
                       <Button onClick={() => handleDelete(`${item.subjectID}`)}>Remove</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      );
}

export default WishList;