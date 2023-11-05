import { Link, useNavigate, useParams } from "react-router-dom";
import "./CheckoutBill.css";
import BASE_URL from "../../api/baseapi";
import { useState } from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

const CheckoutBill = () => {
  const { subjectId } = useParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const user = jwtDecode(token);
  useEffect(() => {
    fetch(`${BASE_URL}/api/payment/get/price/${subjectId}`, {
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
        const data = {
          subjectId: dataJson.subjectId,
          subjectName: dataJson.subjectName,
          subjectImage: dataJson.subjectImage,
          preId: dataJson.preId,
          price: dataJson.price.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          }),
        };

        return data;
      })

      .then((result) => {
        const mockData = result;
        setPaymentInfo(mockData);
      });
  }, []);

  const handleComplete = () => {
    fetch(`${BASE_URL}/api/payment/add/transaction/${subjectId}?userId=${user.userId}&preId=${paymentInfo.preId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          alert("There was an error during processing, please try again");
        }
        return response.json();
      })
      .then((data) => {
        window.location.replace(`${data.url}`);
      })

      .catch((error) => {
        console.error("Error updating slider data:", error);
      });
  };

  return (
    <div className="checkout-bill-wrap">
      <h1 className="checkout-bill-title">Check out</h1>
      <div className="checkout-bill-content-wrap">
        <div className="checkout-bill-left">
          <div className="">
            <h2 className="checkout-bill-method-payment">Payment method</h2>

            <div className="checkout-method-wrap">
              <div className="checkout-method-detail">
                <input type="radio" checked />

                <img
                  src="https://cdn2.cellphones.com.vn/x/media/logo/gw2/vnpay.png"
                  alt="the payment method"
                  className="checkout-method-img"
                />

                <span className="checkout-method-name"> VNPay</span>
              </div>
            </div>
          </div>

          <div className="">
            <h2 className="checkout-bill-detail">Order details</h2>
            <div className="checkout-bill-item">
              <div className="checkout-bill-subject-info">
                <img
                  src={`${paymentInfo.subjectImage}`}
                  alt="the ava of the subject"
                  className="checkout-bill-img-item"
                />

                <span className="checkout-bill-subject-name">
                  {paymentInfo.subjectName}
                </span>
              </div>

              <span>{paymentInfo.price}</span>
            </div>
          </div>
        </div>

        <div className="checkout-bill-right">
          <h2 className="checkout-bill-summary">Summary</h2>
          <div className="checkout-bill-list-total">
            <span>Original price</span>

            <span>{paymentInfo.price}</span>
          </div>

          <div className="checkout-bill-total-wrap">
            <span>Total:</span>
            <span>{paymentInfo.price}</span>
          </div>
          <div className="checkout-bill-term-wrap">
            <span className="checkout-bill-term">
              By completing your purchase you agree to these{" "}
              <Link to={`#`}>Term of services</Link>
            </span>
          </div>

          <div className="checkout-bill-btn-wrap">
            <button
              type="button"
              className="checkout-bill-btn"
              onClick={handleComplete}
            >
              Complete Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBill;
