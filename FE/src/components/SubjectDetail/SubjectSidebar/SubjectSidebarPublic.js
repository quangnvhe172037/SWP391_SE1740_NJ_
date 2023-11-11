import { Link, useNavigate, useParams } from "react-router-dom";
import "./SubjectSidebar.css";
import BASE_URL from "../../../api/baseapi";
import { toast } from "react-toastify";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";

const SubjectSidebarPublic = (prop) => {
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
      navigate('/login')
  };

  const handleUpdate = () => {
    navigate(`/login`);
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

export default SubjectSidebarPublic;
