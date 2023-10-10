import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const [token, setToken] = useState('');
    const [response, setResponse] = useState('');
    const navigate = useNavigate();

    // Trích xuất token từ URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setToken(urlParams.get('token'));
        if (token) {
            // Gửi token lên server khi component được tạo
            sendTokenToServer(token);
        }
    }, []);

    const sendTokenToServer = async (tokenParam) => {
        try {
            const response = await axios.get(`http://localhost:8080/register/verifyEmail/${token}`, {

            });
            if (response.status === 200) {
                // Trường hợp thành công (status code 200), điều hướng đến trang login
                alert('Xác nhận email thành công. Đăng nhập ngay!');
                navigate('/login'); // Điều hướng đến trang login
            } else {
                // Trường hợp lỗi (không phải status code 200), hiển thị thông báo lỗi
                alert('Xác nhận email thất bại. Vui lòng thử lại hoặc đăng ký lại.');
                navigate('/register'); // Điều hướng đến trang register
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Lỗi khi gửi token:', error);
        }
    };

    return (

        <div>

        </div>
    );
};

export default VerifyEmail;
