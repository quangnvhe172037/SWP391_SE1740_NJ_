import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginSlidebar from "../../login/loginslidebar";
import OTPInput from "../../login/forgotpassword/OtpInput";
import {setEmailChangePassword} from "../../../api/Account/account";

export default function ChangePasswordPage() {
    const [errorMessage, setErrorMessage] = useState("You will see OTP in your email!!!");
    const [isLoading, setIsLoading] = useState(true);
    const history = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const result = await setEmailChangePassword();
            setErrorMessage(result.message);
            setIsLoading(false);

            if (result.message === "token has wrong or expired, please login again") {
                toLogin();
            }
        };

        fetchData();
    }, []);

    function toLogin() {
        setTimeout(() => {
            history("/login");
            localStorage.clear();
        }, 3000);
    }

    return (
        <LoginSlidebar>
            {isLoading ? (
                <div className="text-center">Wait a minute</div>
            ) : (
                <div className="py-20">
                    <div className="text-center">
                        <h1 className="text-black text-[32px] font-bold">CHANGE PASSWORD</h1>
                    </div>
                    <br />
                    <div className="px-10 lg:px-[150px]"></div>
                    <OTPInput email="" ErrorMessage={errorMessage} />
                </div>
            )}
        </LoginSlidebar>
    );
}