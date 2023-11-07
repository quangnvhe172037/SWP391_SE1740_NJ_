import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../components/VerifyEmail/VerifyEmail.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faDoorClosed, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import BASE_URL from '../../api/baseapi';
const VerifyEmail = () => {
    const [token, setToken] = useState('');
    const [response, setResponse] = useState('');
    const navigate = useNavigate();

    // Trích xuất token từ URL và gửi yêu cầu khi component được tạo
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');
        setToken(tokenParam);
        if (tokenParam) {
            sendTokenToServer(tokenParam);
        }
    }, []);

    const sendTokenToServer = async (tokenParam) => {
        try {
            const response = await axios.get(
              `${BASE_URL}/register/verifyEmail/` + tokenParam,
              {}
            );
            setResponse(response.data);
        } catch (error) {
            console.error('Lỗi khi gửi token:', error);
        }
    };

    return (
        <div className="centered-content">
            <h1>Welcome to quizzi</h1>
            {response === 'This account has already been verified, please login' ? (
                <div>
                    <p>This account has already been verified, please login.<FontAwesomeIcon icon={faDoorOpen}/></p>

                    {/* Hiển thị nút hoặc liên kết để đến trang đăng nhập */}
                </div>
            ) : response === 'Invalid verification token' ? (
                <div>
                    <p>Invalid verification token. Please try again.<FontAwesomeIcon icon={faDoorClosed}/></p>

                    {/* Hiển thị nút hoặc liên kết để quay lại trang xác minh email */}
                </div>
            ) : response === 'Token has been expired, register again.' ? (
                <div>
                    <p>Token is expired. Please register again.<FontAwesomeIcon icon={faDoorClosed}/></p>
                    {/* Hiển thị nút hoặc liên kết để quay lại trang xác minh email */}
                </div>
            ):  (
                <div>
                    <p>This account has been verified, please login.<FontAwesomeIcon icon={faDoorOpen}/></p>
                    {/* Hiển thị nút hoặc liên kết để quay lại trang xác minh email */}
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;
