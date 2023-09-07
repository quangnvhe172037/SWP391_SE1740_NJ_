import LoginSlidebar from "./loginslidebar";
import {LoginApi} from "../../api/Account/account";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [noValid, setNovalid] = useState(false);
    const history = useNavigate();

    var account = {
        email: "",
        password: "",
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    const handlelogin = (e) => {
        e.preventDefault();
        account.email = email;
        account.password = password;
        const res = LoginApi(account);
        res.then((response) => {
            if (response.ok) {
                if (document.querySelector("#remember").checked) {
                    localStorage.setItem("rememberme", JSON.stringify(true));
                } else localStorage.setItem("rememberme", JSON.stringify(false));
                localStorage.setItem("token", JSON.stringify(response.token));
                sessionStorage.setItem("isLogin", JSON.stringify(true));
                history("/");
            } else {
                if (response.status === 401) {
                    setNovalid(true);
                    setEmail("");
                    setPassword("");
                    document.querySelector("#floating_email").focus();
                } else {
                    alert("Server Error!!!! " + response.status);
                }
            }
        });
    };

    return (
        <LoginSlidebar>
            <div className="py-20">
                <div className="text-center">
                    <h1 className="text-black text-[32px] font-bold">LOGIN</h1>
                </div>
                <div className="px-10 lg:px-[150px]">
                    <form onSubmit={handlelogin}>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="email"
                                name="floating_email"
                                id="floating_email"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={email}
                                required
                                onChange={handleEmail}
                                style={{color: "black"}}
                            />
                            <label
                                htmlFor="floating_email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Email
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="password"
                                name="floating_password"
                                id="floating_password"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={password}
                                onChange={handlePassword}
                                style={{color: "black"}}
                            />
                            <label
                                htmlFor="floating_password"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Password
                            </label>
                        </div>
                        <div className="grid items-start mb-6">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                />
                                <label
                                    htmlFor="remember"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Remember me
                                </label>
                            </div>

                            <Link
                                to="/forgotpassword"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 hover:cursor-pointer text-right"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        {noValid && (
                            <p className="text-red-700">Invalid Email or Password</p>
                        )}
                        <button
                            type="submit"
                            className="focus:outline-none w-full text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                        >
                            LOGIN
                        </button>
                        <button
                            type="button"
                            onClick={()=>{history('/')}}
                            className="focus:outline-none w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Return Home Page
                        </button>
                    </form>
                    <div className="  text-center">
                        <div className="flex items-center">
                            <h2 className="text-gray-400">don't have an account? </h2>
                            <Link
                                to="/register"
                                className="text-cyan-700 hover:cursor-pointer font-bold"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </LoginSlidebar>
    );
}

export default Login;