import { Link, useParams } from "react-router-dom";
import "./SubjectSidebar.css";

const SubjectSidebar = (prop) => {
  const preId = prop.preId;
  let price = prop.price;
  if (price !== undefined) {
    price = price.toLocaleString();
  }
    const image = prop.image;
    const lessonId = prop.lessonId;
    const billId = prop.billId;
    console.log("test bill" +billId);
  const purchaseDate = prop.purchaseDate;
  console.log(preId, price, billId, purchaseDate);
  const { subjectId } = useParams();
  return (
    <div className="subject-detail-sidebar-wrap">
      <div>
        <img src={`/${image}`} alt="the class" />
      </div>

      {billId == null ? (
        <div className="subject-detail-sidebar-payment">
          <div className="subject-detail-sidebar-price">{price} VND</div>
          <button className="subject-detail-sidebar-button-cart">Add to cart</button>

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
