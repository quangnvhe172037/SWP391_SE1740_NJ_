import React, {useRef, useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CkeckButton from "react-validation/build/button";
import axios from "axios";
import {useNavigate} from "react-router-dom";

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
                        }
                    )
                    .then((response) => {
                        const token = response.data;
                        // Lưu thông tin vào localStorage

                        navigate('/home')
                        if (localStorage.getItem("token") !== null) {
                            localStorage.clear();
                        }
                        localStorage.setItem("token", token);
                    })
                    .catch((error) => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        setMessage(resMessage);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                setLoading(false);
            }
        }
    ;

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
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
                        <button className="btn btn-primary btn-block" disabled={loading}>
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
                    <CkeckButton style={{display: "none"}} ref={checkBtn}/>
                </Form>
            </div>
        </div>
    );
};

export default Login;
