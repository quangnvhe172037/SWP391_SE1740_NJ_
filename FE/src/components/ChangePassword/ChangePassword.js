import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        else if (name === 'oldPassword') setOldPassword(value);
        else if (name === 'newPassword') setNewPassword(value);
        else if (name === 'confirmPassword') setConfirmPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra xem hai mật khẩu mới khớp nhau
        if (newPassword !== confirmPassword) {
            setMessage('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            setPasswordsMatch(false);
            return;
        }

        axios.post('http://localhost:8080/change-password', {
            email: email,
            oldPassword: oldPassword,
            newPassword: newPassword,
        })
            .then((response) => {
                setMessage(response.data);
                setPasswordsMatch(true);
                // Đặt thông báo thành công hoặc hiển thị thông tin khác cho người dùng
            })
            .catch((error) => {
                setMessage(error.response.data);
                setPasswordsMatch(true);
                // Xử lý lỗi hoặc hiển thị thông báo lỗi cho người dùng
            });
    };

    return (
        <div className="container">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Old password:</label>
                    <input
                        type="password"
                        name="oldPassword"
                        className="form-control"
                        value={oldPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>New password:</label>
                    <input
                        type="password"
                        name="newPassword"
                        className="form-control"
                        value={newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Change password</button>
            </form>
            {!passwordsMatch && <div className="mt-3 text-danger">Mật khẩu mới và xác nhận mật khẩu không khớp.</div>}
            {message && <div className="mt-3">{message}</div>}
        </div>
    );
}

export default ChangePassword;
