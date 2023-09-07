import {faCheck} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {deleteMilkteaInCart, updateMilkteaInCart} from "../api/Order/order";
import OrderButton from "./OrderButton";
import Price from "./Price";

function CartTable({ cart }) {
    const [orders, setOrders] = useState(cart);
    const [Subtotal, setSubtotal] = useState(0);
    const [deleteList, setDeleteList] = useState([]);
    const [updateList, setUpdateList] = useState([]);
    useEffect(() => {
        const totalPrice = orders.reduce((accumulator, item) => {
            const milkTeaPrice = item.milkTea.price;
            const quantity = item.quantity;

            const addOnTotalPrice = item.addOn.reduce((addOnAccumulator, addOn) => {
                return addOnAccumulator + addOn.price;
            }, 0);

            const itemTotalPrice = (milkTeaPrice + addOnTotalPrice) * quantity;
            return accumulator + itemTotalPrice;
        }, 0);
        setSubtotal(totalPrice);
    }, [orders]);
    function getTopping(addons) {
        if (addons.length === 0) return "";
        const names = addons.map((item) => item.name);
        const result = names.join(", ");
        return result;
    }
    function GetNewOrder(orders, event, item) {
        const updatedOrders = orders.map((order) => {
            if (order.custom_milk_tea_id === item.custom_milk_tea_id) {
                return {
                    ...order,
                    quantity: event.target.value,
                };
            }
            return order;
        });
        const existingItem = updatedOrders.find(
            (order) => order.custom_milk_tea_id === item.custom_milk_tea_id
        );
        if (!existingItem) {
            updatedOrders.push({
                ...item,
                quantity: event.target.value,
            });
        }

        return updatedOrders;
    }
    function handleOrdersChange(event, item) {
        setUpdateList(GetNewOrder(updateList, event, item));

        setOrders(GetNewOrder(orders, event, item));
    }

    function removeItem(event, item) {
        setDeleteList((prevDeleteList) => [
            ...prevDeleteList,
            item.custom_milk_tea_id,
        ]);
        const updatedOrders = orders.filter(
            (order) => order.custom_milk_tea_id !== item.custom_milk_tea_id
        );
        const newupdate = updateList.filter(
            (idmTea) => idmTea !== item.custom_milk_tea_id
        );
        setUpdateList(newupdate);
        setOrders(updatedOrders);
    }

    function DeleteItem() {
        if (deleteList.length > 0) {
            deleteList.forEach((item) => {
                const fetchData = async () => {
                    const result = await deleteMilkteaInCart(item);
                    if (!result.success) return false;
                };
                fetchData();
            });
        }
        return true;
    }
    function updateItem() {
        if (updateList.length > 0) {
            updateList.forEach((item) => {
                const fetchData = async () => {
                    const result = await updateMilkteaInCart(item);
                    if (!result.success) {
                        return false;
                    }
                };
                fetchData();
            });
        }
        return true;
    }
    function updateCart(e) {
        const deleteResult = DeleteItem();
        console.log(updateList)
        const updateResult = updateItem();
        if (!updateResult) alert(" Milktea Error!!!");
    }

    return (
        <div className="min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full">
            <table className="mx-auto">
                <thead>
                <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
                    <th className="font-primary font-normal px-6 py-4">Product</th>
                    <th className="font-primary font-normal px-6 py-4">Topping</th>
                    <th className="font-primary font-normal px-6 py-4">Quantity</th>
                    <th className="font-primary font-normal px-6 py-4 hidden sm:table-cell">
                        Price
                    </th>
                    <th className="font-primary font-normal px-6 py-4">Remove</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-palette-lighter">
                {orders.map((item) => (
                    <tr
                        key={item.custom_milk_tea_id}
                        className="text-sm sm:text-base text-gray-600 text-center"
                    >
                        <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                            <img
                                src={item?.milkTea?.image_url}
                                alt={item?.milkTea?.name}
                                height={64}
                                width={64}
                                className={`hidden sm:inline-flex`}
                            />
                            <Link to={`/milktea/${item?.milkTea?.milk_tea_id}`}>
                                <div className="pt-1 hover:text-palette-dark">
                                    {item?.milkTea?.name}, {item.size}, ice:{item.ice_amount}%,
                                    sugar:{item.sugar_amount}%
                                </div>
                            </Link>
                        </td>
                        <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                            <span>{getTopping(item.addOn)}</span>
                        </td>
                        <td className="font-primary font-medium px-4 sm:px-6 py-4">
                            <input
                                type="number"
                                inputMode="numeric"
                                id="quantity"
                                name="quantity"
                                min="1"
                                step="1"
                                onChange={(event) => handleOrdersChange(event, item)}
                                value={item.quantity}
                                className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
                            />
                        </td>

                        <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                            <Price
                                currency="VND"
                                num={item.total_price}
                                numSize="text-lg"
                            />
                        </td>
                        <td className="font-primary font-medium px-4 sm:px-6 py-4">
                            <button
                                aria-label="delete-item"
                                className=""
                                onClick={(event) => removeItem(event, item)}
                            >
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="w-8 h-8 text-palette-primary border border-palette-primary p-1 hover:bg-palette-lighter"
                                />
                            </button>
                        </td>
                    </tr>
                ))}
                {Subtotal === 0 ? null : (
                    <tr className="text-center">
                        <td></td>
                        <td className="font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">
                            Subtotal
                        </td>
                        <td className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
                            <Price currency="VND" num={Subtotal} numSize="text-xl" />
                        </td>
                        <td></td>
                    </tr>
                )}
                </tbody>
            </table>
            <div className="max-w-sm mt-5 mx-auto space-y-4 px-2 grid justify-center">
                <Link to="#">
                    <button
                        aria-label="back-to-products"
                        className="text-green-700 md:w-60 lg:w-80 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                        onClick={updateCart}
                    >
                        <FontAwesomeIcon icon={faCheck} className="w-4 mr-2 inline-flex" />
                        Update
                    </button>
                </Link>
                <OrderButton />
            </div>
        </div>
    );
}

export default CartTable;