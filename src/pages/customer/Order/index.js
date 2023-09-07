import { useEffect, useState } from "react";
import {getCart} from "../../../api/Order/order";
import Price from "../../../items/Price";
export default function OrderPage() {
    const [cart, setCart] = useState([]);
    const [Subtotal, setSubtotal] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const result = await getCart();
            if (result.success) {
                setCart(result.message);
            } else {
                setErrorMessage(result.message);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const totalPrice = cart.reduce((accumulator, item) => {
            const milkTeaPrice = item.milkTea.price;
            const quantity = item.quantity;

            const addOnTotalPrice = item.addOn.reduce((addOnAccumulator, addOn) => {
                return addOnAccumulator + addOn.price;
            }, 0);

            const itemTotalPrice = (milkTeaPrice + addOnTotalPrice) * quantity;
            return accumulator + itemTotalPrice;
        }, 0);
        setSubtotal(totalPrice);
    }, [cart]);
    function getTopping(addons) {
        if (addons.length === 0) return "";
        const names = addons.map((item) => item.name);
        const result = names.join(", ");
        return result;
    }
    if(cart.length ===0) return(<h2 className="text-yellow-300 text-[24px] font-bold my-6">
        Your Cart Is Empty
    </h2>)
    return (
        <div className="bg-gray-100 h-auto flex justify-center">
            {errorMessage && (
                <h2 className="text-red-700 text-[24px] font-bold my-6">
                    {errorMessage}
                </h2>
            )}
            {!errorMessage && !cart.length === 0 && (
                <div className="flex justify-center mt-[50px] rounded-xl w-[1000px] h-full bg-white">
                    <div>
                        <h1 className="text-green-600 font-bold text-[40px] justify-center flex mt-8 mb-4">
                            Finish Your Order
                        </h1>
                        <table className="mx-[36px]">
                            <tbody className="divide-y divide-palette-lighter">
                            {cart.map((item) => (
                                <tr
                                    key={item.custom_milk_tea_id}
                                    className="text-sm sm:text-base text-gray-600 text-center"
                                >
                                    <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center ">
                                        <img
                                            src={item?.milkTea?.image_url}
                                            alt={item?.milkTea?.name}
                                            height={64}
                                            width={64}
                                            className={`hidden sm:inline-flex`}
                                        />
                                        <div className="ml-3 pt-1 hover:text-palette-dark">
                                            {item?.milkTea?.name}, {item.size}, ice:
                                            {item.ice_amount}
                                            %, sugar:{item.sugar_amount}%
                                        </div>
                                    </td>
                                    <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                                        <span>{getTopping(item.addOn)}</span>
                                    </td>
                                    <td>
                                        <p className="font-primary font-medium px-4 sm:px-6 py-4">
                                            {item.quantity}
                                        </p>
                                    </td>

                                    <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                                        <Price
                                            currency="VND"
                                            num={item.total_price}
                                            numSize="text-lg"
                                        />
                                    </td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                        {Subtotal === 0 ? null : (
                            <div className="flex m-[48px] justify-end">
                                <div className="font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4 justify-between">
                                    Subtotal:
                                </div>
                                <div className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
                                    <Price currency="VND" num={Subtotal} numSize="text-xl" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}