import { Link, useNavigate, useParams } from "react-router-dom";
import "./SubjectSidebar.css";
import { toast } from "react-toastify";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";

const SubjectSidebar = (prop) => {
  const [WishList, setWishList] = useState({});
  const token = localStorage.getItem("token");
   const navigate = useNavigate()
  const preId = prop.preId;
  let price = prop.price;
  if (price !== undefined) {
    price = price.toLocaleString();
  }
    const image = prop.image;
    const lessonId = prop.lessonId;
    const billId = prop.billId;
    const userID = prop.userID;
    console.log("test bill" +billId);
  const purchaseDate = prop.purchaseDate;
  console.log(preId, price, billId, purchaseDate);
  const { subjectId } = useParams();
  const apiSubjects = "http://localhost:8080/user/subject/addToWishList";
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
            if (!response.ok) {
              throw new Error(response.data.status);
            }
            return response.json();
          })
          .then((data) => {
            alert("Add To Wish List Successful!");
          })
          .catch((error) => {
            console.error("Error updating slider data:", error);
          });
  }

  useEffect(() => {
    fetch(`http://localhost:8080/user/subject/wishlist?subjectId=${subjectId}&userId=${userID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }    
    })
      .then((response) => {
        if(response.status == 404){
          return '';
        }
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })

      .then((dataJson) => {
        if(dataJson != ''){
          const data = {
            Id : dataJson.id
          };
          return data;
        }
       return dataJson;
      })
      .then((result) => {
        setWishList(result);
      });
  }, {});

  return (
    <div className="subject-detail-sidebar-wrap">
      <div>
        <img src={`/${image}`} alt="the class" className="img-fluid"/>
      </div>

      {billId == null ? (
        <div className="subject-detail-sidebar-payment">
          <div className="subject-detail-sidebar-price">{price} VND</div>
          <button className="subject-detail-sidebar-button-cart" disabled={WishList != ''} onClick={() => handleAddToWishList()}>Add to cart</button>
          <button className="subject-detail-sidebar-button-buy">Buy now</button>
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
