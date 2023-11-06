import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../api/baseapi";
import { useEffect, useState } from "react";
import "./PaymentResult.css";

const PaymentResult = () => {
  const location = useLocation();
  const [paymentResult, setPaymentResult] = useState({});
const navigate = useNavigate();
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentInfo = {};
    for (const [key, value] of urlParams) {
      paymentInfo[key] = value;
    }
    sendPaymentInfoToBackend(paymentInfo);
  }, [location]);
  const sendPaymentInfoToBackend = async (paymentInfo) => {
      try {
        
          const encodedPaymentInfo = {};
          for (const key in paymentInfo) {
            const encodedValue = encodeURIComponent(paymentInfo[key]);
            encodedPaymentInfo[key] = encodedValue;
          }
      const response = await axios.get(`${BASE_URL}/api/payment/check/return`, {
        params: encodedPaymentInfo,
      });
      console.log(response.data);
      const data = {
        price: formatter.format(response.data.price),
        data: response.data.data,
        message: response.data.message,
      };

      setPaymentResult(data);
      // Thực hiện các hành động với dữ liệu trả về từ backend tại đây
    } catch (error) {
      console.error("Error while sending data to backend:", error);
    }
    };
    
    const handleBackToHome = () => {
        navigate("/");
    }

  // Lấy dữ liệu từ URL

  // Gửi dữ liệu đến backend

  return (
    <div className="payment-result-wrap">
      <h1>Payment Result</h1>
      <div className="payment-result-data">
        <span>
          {paymentResult.data}
          {paymentResult.price}
        </span>
      </div>

      <div>
        <span>{paymentResult.message}</span>
          </div>
          
          <div className="payment-result-btn-wrap">
              <button onClick={handleBackToHome} className="payment-result-btn">
                  Back to the home
              </button>
          </div>
    </div>
  );
};

export default PaymentResult;
