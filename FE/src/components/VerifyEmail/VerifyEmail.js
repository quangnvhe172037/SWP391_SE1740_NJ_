import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
            const response = await axios.get(`http://localhost:8080/register/verifyEmail/` + tokenParam, {});
            setResponse(response.data);
        } catch (error) {
            console.error('Lỗi khi gửi token:', error);
        }
    };

    return (
        <div>
            <h1>Welcome to quizzi</h1>
            {response === 'This account has already been verified, please login' ? (
                <div>
                    <p>This account has already been verified, please login.</p>
                    {/* Hiển thị nút hoặc liên kết để đến trang đăng nhập */}
                </div>
            ) : response === 'Invalid verification token' ? (
                <div>
                    <p>Invalid verification token. Please try again.</p>
                    {/* Hiển thị nút hoặc liên kết để quay lại trang xác minh email */}
                </div>
            ) : response === 'This account has been verified, please login' ? (
                <div>
                    <p>This account has been verified, please login</p>
                    {/* Hiển thị nút hoặc liên kết để quay lại trang xác minh email */}
                </div>
            ): null}
        </div>
    );
};

export default VerifyEmail;
