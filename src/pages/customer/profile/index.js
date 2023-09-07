import { useState, useEffect } from "react";
import {getUserProfile, updataAccountInfo} from "../../../api/Profile/profile";
import { useNavigate } from "react-router-dom";
export default function Profile() {
    const [errorMessage, setErrorMessage] = useState("");
    const [infor, setInfor] = useState({});
    const history = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserProfile();
            if (!data.success) setErrorMessage(data.message);
            else setInfor(data.message);
        };

        if (errorMessage) {
            setTimeout(() => {
                alert(errorMessage);
                history("/login");
                localStorage.clear();
            }, 3000);
        }

        fetchData();
    }, []);

    async function handleChangeInfo(e) {
        e.preventDefault();
        const resuilt = await updataAccountInfo(infor);
        if (resuilt.success) alert("Update Successfully");
        else alert("Fail to Update");
    }

    function handleDataInfo(event) {
        const { name, value } = event.target;
        setInfor((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }
    return (
        <div>
            {infor && (
                <form onSubmit={handleChangeInfo} className="px-[200px] py-[50px]">
                    <h1 className="mb-4 text-[40px] text-green-700 font-medium leading-none grid justify-center  dark:text-white">
                        Customer Profile
                    </h1>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="username"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="username"
                                onChange={handleDataInfo}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={infor.name}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="address"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                address
                            </label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                onChange={handleDataInfo}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={infor.address}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="phone"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Phone
                            </label>
                            <input
                                type="number"
                                name="phone"
                                id="phone"
                                onChange={handleDataInfo}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={infor.phone}
                            />
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => {
                                    history("/changepassword");
                                }}
                                className="focus:outline-none w-full mt-[28px] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                    <div className="grid justify-center">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 w-[338px] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Accept Change
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}