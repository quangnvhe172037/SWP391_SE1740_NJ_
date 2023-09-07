import LoginSlidebar from "./loginslidebar";
import {RegisterApi} from "../../api/Account/account";
import { useState } from "react";
import { Link } from "react-router-dom";
function Register() {
    // const [email,setEmail] = useState('')
    // const [password,setPassword] = useState('')
    // const [confirmPassword, setConfirmPassword] = useState('')
    // const [name,setName] = useState('')
    // const [phone ,setphone] = useState('')
    // const [address ,setAddress] = useState('')
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        phone: "",
        address: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [colorMess, setColorMess] = useState("text-red-600")
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }
    function handleSubmit(event) {
        event.preventDefault();
        var regex = /^(?=.*[A-Za-z])(?=.*\d)(?!.*\s).{8,20}$/;
        var isValidPassword = regex.test(formValues.password);

        if (isValidPassword) {
            if ((formValues.password === formValues.confirmPassword)) {
                const account ={
                    email: formValues.email,
                    password:formValues.password,
                    name: formValues.name,
                    phone: formValues.phone,
                    address: formValues.address
                }
                const res = RegisterApi(account);
                res
                    .then((response) => {
                        if (response.status === 200) {
                            setErrorMessage(response.message);
                            if(errorMessage.length === 24){
                                setColorMess('text-green-600')
                            }
                        } else setErrorMessage("Sever Error!!!");
                    })
                    .catch(e => console.log(e));
            } else {
                setErrorMessage("Mật khẩu không khớp. Vui lòng nhập lại.");
                setFormValues((prevValues) => ({
                    ...prevValues,
                    password: "",
                    confirmPassword: "",
                }));
                document.querySelector("#password").focus();
            }
        } else {
            setFormValues((prevValues) => ({
                ...prevValues,
                password: "",
                confirmPassword: "",
            }));
            document.querySelector("#password").focus();
            setErrorMessage(
                "Password must be between 8 and 20 characters, include at least 1 letter and 1 number and do not include spaces."
            );
        }
    }

    return (
        <LoginSlidebar>
            <div className="py-5">
                <div className="text-center">
                    <h1 className="text-black text-[32px] font-bold">SIGN UP</h1>
                </div>
                <div className="px-10 lg:px-[150px]">
                    <form onSubmit={handleSubmit}>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={formValues.email}
                                style={{color: "black"}}
                            />
                            <label
                                htmlFor="email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Email
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={handleInputChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={formValues.password}
                                style={{color: "black"}}
                            />
                            <label
                                htmlFor="password"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Password
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                onChange={handleInputChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={formValues.confirmPassword}
                                style={{color: "black"}}
                            />
                            <label
                                htmlFor="confirmPassword"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Confirm Password
                            </label>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={handleInputChange}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                    value={formValues.name}
                                    style={{color: "black"}}
                                />
                                <label
                                    htmlFor="name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Full Name
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    type="text"
                                    pattern="[0-9]{10}"
                                    name="phone"
                                    id="phone"
                                    onChange={handleInputChange}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                    value={formValues.phone}
                                    style={{color: "black"}}
                                />
                                <label
                                    htmlFor="phone"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Phone Number
                                </label>
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="address"
                                id="address"
                                onChange={handleInputChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={formValues.address}
                                style={{color: "black"}}
                            />
                            <label
                                htmlFor="address"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Address
                            </label>
                        </div>
                        {errorMessage && <p className={`${colorMess} py-1`}>{errorMessage}</p>}
                        <div className="mt-5">
                            <button
                                type="submit"
                                className="focus:outline-none w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <div className="  text-center">
                        <div className="flex items-center">
                            <h2 className="text-gray-400">Adready have an account? </h2>
                            <Link
                                to="/login"
                                className="text-yellow-300 hover:cursor-pointer font-bold"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </LoginSlidebar>
    );
}

export default Register;