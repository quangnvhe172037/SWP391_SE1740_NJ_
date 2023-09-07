import LoginSlidebar from "./loginslidebar";
import { useState } from "react";
import EmailInput from "./forgotpassword/EmailInput";
import OTPInput from "./forgotpassword/OtpInput";
function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isvalid, setIsValid] = useState(false);
    const [errorMessage,setErrorMessage] =useState('');
    function handleGetEmail(email) {
        setEmail(email);
    }
    function handleGetisValid(data){
        setIsValid(data)
    }
    function handleGetEmailMessage(data){
        setErrorMessage(data)
    }

    return (
        <LoginSlidebar>
            <div className="py-20">
                <div className="text-center">
                    <h1 className="text-black text-[32px] font-bold">FORGOT PASSWORD</h1>
                </div>
                <br></br>
                <div className="px-10 lg:px-[150px]"></div>
                {!isvalid ? (
                    <EmailInput getEmail={handleGetEmail} getIsvalid={handleGetisValid} getErrorMessage={handleGetEmailMessage}/>
                ) : (
                    <OTPInput email={email} ErrorMessage={errorMessage}/>
                )}
            </div>


        </LoginSlidebar>
    );
}

export default ForgotPassword;