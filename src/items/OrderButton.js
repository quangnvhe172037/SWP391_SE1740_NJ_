import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function OrderButton() {
    return (
        <Link to="/customer/order">
            <button
                aria-label="checkout-products" className="text-yellow-400 md:w-60 lg:w-80
        hover:text-white border border-yellow-400 hover:bg-yellow-500
        focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium
        rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2
        dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white
        dark:hover:bg-yellow-400 dark:focus:ring-yellow-900" >Order
                <FontAwesomeIcon icon={faCreditCard} className="w-4 ml-2 inline-flex" />
            </button>
        </Link>
    );
}

export default OrderButton;