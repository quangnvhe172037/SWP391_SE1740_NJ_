import { useState } from "react";
import {SearchMilktea, listMilktea} from "../api/Milktea/milktea";

function Searchbar({ sendDataSearch }) {
    const [searchkey, setSearchKey] = useState("");
    function handleSearch(e) {
        setSearchKey(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (searchkey !== "") {
            const fetchData = async () => {
                const resuilt = await SearchMilktea(searchkey);
                if(resuilt.success){
                    sendDataSearch(resuilt.data)
                }
                else{
                    alert(resuilt.message)
                    sendDataSearch([]);
                }
            };
            fetchData();
        } else {
            const fetchData = async () => {
                const response = await listMilktea();
                sendDataSearch(response);
            };
            fetchData();
        }
    }
    return (
        <div className="w-full grid justify-center ">
            <form
                className="lg:w-[700px] md:w-[700px] w-[300px]"
                onSubmit={handleSubmit}
            >
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="none"
                            strokeWidth="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="search"
                        onChange={handleSearch}
                        id="default-search"
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-400 focus:border-green-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-400 dark:focus:border-green-400"
                        placeholder="Search milktea, tea..."
                        value={searchkey}
                    />
                    <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-600 dark:focus:ring-green-700"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
}
export default Searchbar;