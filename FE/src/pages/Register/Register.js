import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Register.css";

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "CUSTOMER",
        agreeTerms: false,
    });

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isStrongPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;
        return regex.test(password);
    };

    const resetForm = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "CUSTOMER",
            agreeTerms: false,
        });
        setMessage("");
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === "checkbox") {
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }

        if (name === "password") {
            if (!isStrongPassword(value)) {
                setMessage("Password is not strong enough (must contain at least 8 characters, uppercase, number, special character).");
            } else {
                setMessage("");
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.agreeTerms) {
            setMessage("You must agree to the Terms and Conditions.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage("Confirm Password does not match!");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:8080/register", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setMessage(response.data.message);

            if (response.status === 200) {
                resetForm();
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage(error.response.data.message);
            } else {
                console.error(error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="containers">
            <div className="row justify-content-center">
                <div className="col-md-4 offset-md-7">
                    <div className="card" style={{ marginTop: "20px" }}>
                        <div className="card-body">
                            <h2 className="card-title">Register</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>First Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="agreeTerms"
                                        checked={formData.agreeTerms}
                                        onChange={handleInputChange}
                                    />
                                    <label className="form-check-label" htmlFor="agreeTerms">
                                        I agree to the <a href="/terms" target="_blank">Terms and Conditions</a>
                                    </label>
                                </div>
                                {isLoading ? (
                                    <div className="text-center">
                                        <p>It will take a few seconds... <FontAwesomeIcon icon={faSpinner} spin size="3px"/></p>
                                    </div>
                                ) : (
                                    <div>
                                        {message && <div className="alert mt-2">{message}</div>}
                                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: "black", color: "white", border: "1px solid", height: "35px", width: "100px", marginLeft: "75px" }}>
                                            Register
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
