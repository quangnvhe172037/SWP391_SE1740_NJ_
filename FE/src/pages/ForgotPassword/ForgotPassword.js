import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Thêm biến state để theo dõi trạng thái tải

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true); // Bắt đầu hiển thị hiệu ứng loading

        axios
            .post('http://localhost:8080/forgot-password', { email })
            .then((response) => {
                setMessage(response.data);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    setMessage("Can not found email!");
                } else {
                    setMessage('Something wrong! Please try again.');
                }
            })
            .finally(() => {
                setIsLoading(false); // Tắt hiệu ứng loading khi xong
            });
    };

    return (
        <div className="forgotpassword-container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2>Forgot Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Input Email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn" style={{ borderColor: "black", color: "black" }}>
                            {isLoading ? (
                                <>
                                    <span className="fa fa-spinner fa-spin"></span> It will take few second...
                                </>
                            ) : 'Reset password'}</button>
                    </form>
                    <div className="mt-3">{message}</div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
