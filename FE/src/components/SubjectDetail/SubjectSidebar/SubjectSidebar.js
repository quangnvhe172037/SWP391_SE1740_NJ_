import { Link, useNavigate, useParams } from "react-router-dom";
import "./SubjectSidebar.css";
import BASE_URL from "../../../api/baseapi";
import { toast } from "react-toastify";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";

const SubjectSidebar = (prop) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const preId = prop.preId;
  let price = prop.price;
  if (price !== undefined) {
    price = price.toLocaleString();
  }
  const image = prop.image;
  const lessonId = prop.lessonId;
  const billId = prop.billId;
  const userID = prop.userID;
  console.log("test bill" + billId);
  const purchaseDate = prop.purchaseDate;
  console.log(preId, price, billId, purchaseDate);
  const { subjectId } = useParams();
  const apiSubjects = `${BASE_URL}/user/subject/addToWishList`;
  const handleAddToWishList = (e) => {
    const formData = new FormData();
    formData.append("subjectId", subjectId);
    formData.append("userId", userID);
    fetch(apiSubjects, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (response.status == 406) {
          return null;
        }
        if (!response.ok) {
          throw new Error(response.data.status);
        }
        return response.json();
      })
      .then((data) => {
        if (data == null) {
          alert("Subject is existed in your wish list");
        } else {
          alert("Add To Wish List Successful!");
        }
      })
      .catch((error) => {
        console.error("Error updating slider data:", error);
      });
  };

  const handleUpdate = () => {
    navigate(`/payment/checkout/course/${subjectId}`);
  };
  return (
    <div className="subject-detail-sidebar-wrap">
      <div>
        <img src={`${image}`} alt="the class" className="img-fluid" />
      </div>

      {billId == null ? (
        <div className="subject-detail-sidebar-payment">
          <div className="subject-detail-sidebar-price">{price} VND</div>
          <button
            className="subject-detail-sidebar-button-cart"
            onClick={() => handleAddToWishList()}
          >
            Add to Wishlist
          </button>
          <button
            className="subject-detail-sidebar-button-buy"
            onClick={() => handleUpdate()}
          >
            Buy now
          </button>
        </div>
      ) : (
        <div className="subject-detail-sidebar-payment">
          <div className="subject-detail-sidebar-purchase">
            You purchased this course on {purchaseDate}
          </div>
          <button className="subject-detail-sidebar-button">
            <Link to={`/subject/${subjectId}/lesson/${lessonId}`}>
              Go to course
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default SubjectSidebar;
