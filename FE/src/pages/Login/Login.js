import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from "axios";
import jwtDecode from "jwt-decode";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = () => {
    const navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setUserName(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            axios
                .post("http://localhost:8080/authenticate", {
                    userName,
                    password,
                })
                .then((response) => {
                    const token = response.data;
                    if (localStorage.getItem("token") !== null) {
                        localStorage.clear();
                    }
                    localStorage.setItem("token", token);
                    const user = jwtDecode(token);
                    switch (user.role) {
                      case "ADMIN":
                        navigate("/admin/dashboard");
                        window.location.reload();
                        break;
                      case "EXPERT":
                        navigate("/expert/dashboard");
                        window.location.reload();
                        break;
                      case "MARKETING":
                        navigate("/marketing/dashboard");
                        window.location.reload();
                        break;
                      default:
                        navigate("/home");
                        window.location.reload();
                        break;
                    }
                    
                })
                .catch((error) => {
                    if (error.response && error.response.status === 403) {
                        setMessage("Wrong email or password");
                    } else {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        setMessage(resMessage);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="containers">
            <div className="row justify-content-center">
                <div className="col-md-6 offset-md-6">
                    <div className="card card-container ">
                        <img
                            src="/Profile.PNG"
                            alt="profile-img"
                            className="profile-img-card"
                        />

                        <Form onSubmit={handleLogin} ref={form}>
                            <div className="form-group">
                                <label htmlFor="username">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={userName}
                                    onChange={onChangeEmail}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block" disabled={loading} style={{backgroundColor: "white", color: "black", border: "1px solid black"}}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Login</span>
                                </button>
                            </div>

                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}

                            <div className="form-group">
                                <Link to="/forgot-password" style={{color: "black"}}>Forgot your Password?</Link>
                            </div>

                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
