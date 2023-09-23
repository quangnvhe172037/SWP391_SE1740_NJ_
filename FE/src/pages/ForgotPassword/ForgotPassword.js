import React, {useState} from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8080/forgot-password', {email})
            .then((response) => {
                setMessage(response.data);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    setMessage("Can not found email!")
                } else {
                    setMessage('Something wrong! Please try again.');
                }
            });
    };

    return (
        <div className="container mt-5">
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
                                placeholder="Nhập địa chỉ Email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Reset password
                        </button>
                    </form>
                    <div className="mt-3">{message}</div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;