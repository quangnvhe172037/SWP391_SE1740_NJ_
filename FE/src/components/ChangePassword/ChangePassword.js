import React, { useState } from 'react';
import axios from 'axios';
const token = localStorage.getItem("token");

// Regular expression to check for a strong password
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [isPasswordStrong, setIsPasswordStrong] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        else if (name === 'oldPassword') setOldPassword(value);
        else if (name === 'newPassword') setNewPassword(value);
        else if (name === 'confirmPassword') setConfirmPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the new passwords match
        if (newPassword !== confirmPassword) {
            setMessage('New password and confirm password do not match.');
            setPasswordsMatch(false);
            return;
        }

        // Check if the new password is strong enough
        if (!passwordRegex.test(newPassword)) {
            setMessage('The new password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.');
            setIsPasswordStrong(false);
            return;
        }

        axios.post('http://localhost:8080/change-password', {
            email: email,
            oldPassword: oldPassword,
            newPassword: newPassword,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setMessage(response.data);
                setPasswordsMatch(true);
                setIsPasswordStrong(true);
                // Set success message or display other information to the user
            })
            .catch((error) => {
                setMessage(error.response.data);
                setPasswordsMatch(true);
                setIsPasswordStrong(true);
                // Handle errors or display error message to the user
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
            {!passwordsMatch && <div className="mt-3 text-danger">New password and confirm password do not match.</div>}
            {!isPasswordStrong && <div className="mt-3 text-danger">The new password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.</div>}
            {message && <div className="mt-3">{message}</div>}
        </div>
    );
}

export default ChangePassword;
