import { useState } from "react";
import sendReport from "../../../api/Report/report";
export default function Report() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] =useState('')
    const handleSendReport = async (e) => {
        e.preventDefault();
        const report = {
            sender_name: name,
            sender_email: email,
            sender_phone_no: phoneNo,
            message: message,
        };
        const resuilt = await sendReport(report);
        setErrorMessage(resuilt.message);
    };
    return (
        <div className="w-full h-[80vh] flex items-center justify-center">
            <form
                onSubmit={handleSendReport}
                className="bg-white flex flex-col px-[4vw] py-[2vw] w-[90%] max-w-[600px] rounded-[10px]"
            >
                <input
                    className="my-[10px] p-[20px] hover:outline-none bg-[#f5f5f5] text-[16px] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    required
                    type="text"
                    id="name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    placeholder="Your Name"
                    value={name}
                />
                <input
                    className="my-[10px] p-[20px] hover:outline-none bg-[#f5f5f5] text-[16px] focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    type="email"
                    id="email"
                    required
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    placeholder="Email id"
                    value={email}
                />
                <input
                    className="my-[10px] p-[20px] hover:outline-none bg-[#f5f5f5] text-[16px] focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    type="text"
                    id="phone"
                    onChange={(e) => {
                        setPhoneNo(e.target.value);
                    }}
                    placeholder="Phone no."
                    value={phoneNo}
                />
                <textarea
                    className="my-[10px] p-[20px] hover:outline-none bg-[#f5f5f5] text-[16px] focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    id="message"
                    required
                    rows="4"
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                    placeholder="How can we help you?"
                    value={message}
                ></textarea>
                {errorMessage && <p className="text-green-400 py-1">{errorMessage}</p>}
                <button
                    type="submit"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Send
                </button>
            </form>
        </div>
    );
}