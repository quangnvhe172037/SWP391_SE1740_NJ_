import { useState, useEffect } from "react";
import {getCart} from "../../../api/Order/order";
import CartTable from "../../../items/CartTable";
import PageTitle from "../../../items/PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
export default function Cart() {
    const [cart, setCart] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [haveData, setHaveData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCart();
            if (result.success) {
                setCart(result.message);
                setHaveData(true);
            } else {
                setErrorMessage(result.message);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            {haveData && cart.length > 0 && (
                <div className="container mx-auto mb-20 min-h-screen">
                    <PageTitle text="Your Cart" />
                    <CartTable cart={cart} />
                </div>
            )}
            {haveData && cart.length === 0 && (
                <div className="container mx-auto mb-20 min-h-screen grid justify-center text-[26px] text-orange-500 font-bold mt-[300px]">
                    <h1>
                        There are no orders in your cart, let's go shopping
                        <FontAwesomeIcon icon={faCartArrowDown} />
                    </h1>
                </div>
            )}
            {!haveData && <p>{errorMessage}</p>}
        </div>
    );
}