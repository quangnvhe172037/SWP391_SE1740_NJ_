import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {ForgotPasswordgetEmail} from "../../../api/Account/account";

function EmailInput({ getEmail, getIsvalid, getErrorMessage }) {
    const [email, setEmail] = useState("");
    const [isvalid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [colorMess, setColorMess] = useState("text-green-700");
    const history = useNavigate();

    useEffect(() => {
        // Đảm bảo giá trị isvalid đã được cập nhật trước khi gọi hàm callback
        getEmail(email);
        getIsvalid(isvalid);
        getErrorMessage(errorMessage);
    }, [email, isvalid, getEmail, getIsvalid,errorMessage, getErrorMessage]);

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handleToLoginPage(e) {
        history("/login");
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        setErrorMessage("Please wait a minute!!!");

        const response = await ForgotPasswordgetEmail(email);

        if (response.status === 200) {
            setErrorMessage(response.mess);
            if (response.mess === "Email doesn't exist") {
                setColorMess("text-red-700");
            } else {
                setIsValid(true);
            }
        } else {
            setColorMess("text-red-700");
            setErrorMessage("sever Error!!!");
        }
    }

    return (
        <div className="py-20 px-10 lg:px-[150px]">
            <form onSubmit={handleFormSubmit}>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="floating_email"
                        id="floating_email"
                        onChange={handleEmailChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        value={email}
                        style={{color: "black"}}
                    />
                    <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Email
                    </label>
                </div>
                <br />
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

export default EmailInput;