import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {ChangePassword, ChangePasswordForgotPassword} from "../../../api/Account/account";
import getRole from "../../../role";
function OTPInput({email,ErrorMessage}) {
    const Email = email;
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(ErrorMessage);
    const [colorMess, setColorMess] = useState("text-green-700");
    const history = useNavigate();
    const role =getRole();
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    function handleOTPChange(e) {
        setOtp(e.target.value);
    }
    function handleToLoginPage(e) {
        history("/login");
    }
    function handleFormSubmit(e) {
        e.preventDefault();
        var regex = /^(?=.*[A-Za-z])(?=.*\d)(?!.*\s).{8,20}$/;
        var isValidPassword = regex.test(password);

        if (isValidPassword) {
            const account = {
                email: Email,
                password: password,
                otp: otp,
            };
            var response;
            const fetchData = async () => {
                if(role.getRole || !email){
                    const data= {
                        otp: otp,
                        password:password
                    }
                    response = await ChangePassword(data);
                    if(response.success && !response.message?.message){
                        setErrorMessage("Change Password Successfully!!!");
                        toLogin()
                    }
                    else if(response.message==='token has wrong or expired, please login again'){
                        setErrorMessage(response.message);
                        toLogin()
                    }
                    else{
                        setErrorMessage(response.message.message)
                    }
                }
                else{
                    response = await ChangePasswordForgotPassword(account);
                    if (response.status === 200) {
                        setErrorMessage(response.message);
                        if (response.message !== "Wrong OTP") {
                            setColorMess("text-green-700");
                        }
                    } else {
                        setErrorMessage("sever Error!!!");
                    }
                }
            };
            fetchData();
        } else {
            setPassword("");
            setErrorMessage(
                "Password must be between 8 and 20 characters, include at least 1 letter and 1 number and do not include spaces."
            );
        }
        function toLogin() {
            setTimeout(() => {
                history("/login");
                localStorage.clear();
            }, 3000);
        }
    };

    return (
        <div className="py-20 px-10 lg:px-[150px]">
            <form onSubmit={handleFormSubmit}>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="floating_otp"
                        id="floating_otp"
                        onChange={handleOTPChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        value={otp}
                        style={{color: "black"}}
                    />
                    <label
                        htmlFor="floating_otp"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Enter OTP code
                    </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="password"
                        name="floating_password"
                        id="floating_password"
                        onChange={handlePasswordChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        value={password}
                    />
                    <label
                        htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Enter New Password
                    </label>
                </div>
                {errorMessage && <p className={`${colorMess} py-1`}>{errorMessage}</p>}
                <button
                    type="submit"
                    className="focus:outline-none w-full text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                >
                    Submit
                </button>
            </form>
            <button
                onClick={handleToLoginPage}
                type="submit"
                className="focus:outline-none w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
                Back To Login Page
            </button>
        </div>
    );
}

export default OTPInput;