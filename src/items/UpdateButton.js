import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function UpdateButton() {
    return (
        <Link to="#">
            <button
                aria-label="back-to-products"
                className="text-green-700 md:w-60 lg:w-80 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
                <FontAwesomeIcon icon={faCheck} className="w-4 mr-2 inline-flex" />
                Update
            </button>
        </Link>
    );
}

export default UpdateButton;