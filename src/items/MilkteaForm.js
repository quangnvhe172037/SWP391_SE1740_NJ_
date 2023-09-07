import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import getRole from "../role";
import { useNavigate } from "react-router-dom";
import {saveToCart} from "../api/Order/order";
import Price from "./Price";

function MilkteaForm({ MTea }) {
    const [quantity, setQuantity] = useState(1);
    const addOn = MTea.allAddOns;
    const price = MTea.milkTea.price;
    const [total, setTotal] = useState(price);
    const Size = ["M", "L"];
    const Sugar = [0, 10, 20, 50, 75, 100];
    const Ice = [0, 10, 20, 50, 75, 100];
    const [size, setSize] = useState(Size[0]);
    const [sugar, setSugar] = useState(Sugar[0]);
    const [ice, setIce] = useState(Ice[0]);
    const [topping, setTopping] = useState([]);
    const [showToppings, setShowToppings] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const history = useNavigate();
    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            const selectedAddon = addOn.find((item) => item.add_on_id === value);
            if (selectedAddon) {
                setTopping([...topping, selectedAddon]);
            }
        } else {
            setTopping(topping.filter((item) => item.add_on_id !== value));
        }
    };

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    const handleSugarChange = (e) => {
        setSugar(e.target.value);
    };

    const handleIceChange = (e) => {
        setIce(e.target.value);
    };

    const handleAddToCart = async () => {
        const role = getRole();
        if (role.role === "Customer") {
            const topping_url = await concatenateAddOnIds(topping);
            const order = {
                ice_amount: ice,
                sugar_amount: sugar,
                size: size,
                total_cost: 0,
                total_price: 0,
                quantity: quantity,
            };
            const resuilt = await saveToCart(
                MTea.milkTea.milk_tea_id,
                topping_url,
                order
            );
            setErrorMessage(resuilt.message);
            if(resuilt.success){
                toCart()
            }
            if (resuilt.message === "You must login as a customer") {
                toLogin();
            }
        } else {
            setErrorMessage("You must login as a customer");
            toLogin();
        }
        function toLogin() {
            setTimeout(() => {
                history("/login");
                localStorage.clear();
            }, 3000);
        }
        function toCart() {
            setTimeout(() => {
                history("/customer/cart");
            }, 3000);
        }
    };
    function concatenateAddOnIds(objArray) {
        var addOnIds = objArray.map((obj) => obj.add_on_id);

        var result = addOnIds.join("+");

        return result;
    }
    const updateQuantity = (e) => {
        if (e === "") {
            setQuantity("");
        } else {
            setQuantity(Math.floor(e));
        }
    };

    const handleToppingsClick = () => {
        setShowToppings(!showToppings);
    };

    useEffect(() => {
        const selectedItemsPrice = topping.reduce(
            (acc, curr) => acc + curr.price,
            0
        );
        setTotal(price + selectedItemsPrice);
    }, [topping]);

    return (
        <div>
            <div className="w-full">
                <div className="flex justify-start space-x-2 w-full">
                    <div className="flex flex-col items-start space-y-1 flex-grow-0">
                        <label className="text-gray-500 text-base">Qty.</label>
                        <input
                            type="number"
                            inputMode="numeric"
                            id="quantity"
                            name="quantity"
                            min="1"
                            step="1"
                            value={quantity}
                            onChange={(e) => updateQuantity(e.target.value)}
                            className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
                        />
                    </div>
                    <div className="flex flex-col items-start space-y-1 flex-grow">
                        <label className="text-gray-500 text-base">Size</label>
                        <select
                            id="size-selector"
                            name="size-selector"
                            onChange={handleSizeChange}
                            value={size}
                            className="form-select border border-gray-300 rounded-sm w-full text-gray-900 focus:border-palette-light focus:ring-palette-light"
                        >
                            {Size.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex justify-start space-x-2 w-full">
                    <div className="flex flex-col items-start space-y-1 flex-grow">
                        <label className="text-gray-500 text-base">Sugar</label>
                        <select
                            id="sugar-selector"
                            name="sugar-selector"
                            onChange={handleSugarChange}
                            value={sugar}
                            className="form-select border border-gray-300 rounded-sm w-full text-gray-900 focus:border-palette-light focus:ring-palette-light"
                        >
                            {Sugar.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}%
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col items-start space-y-1 flex-grow">
                        <label className="text-gray-500 text-base">Ice</label>
                        <select
                            id="ice-selector"
                            name="ice-selector"
                            onChange={handleIceChange}
                            value={ice}
                            className="form-select border border-gray-300 rounded-sm w-full text-gray-900 focus:border-palette-light focus:ring-palette-light"
                        >
                            {Ice.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}%
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="w-full ">
                    <div className="flex flex-col">
                        <button
                            className="text-gray-500 text-base box-border cursor-pointer"
                            onClick={handleToppingsClick}
                        >
                            Topping
                        </button>
                        {showToppings && (
                            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                {addOn
                                    ?.filter((addon) => addon.enabled === true)
                                    ?.map((item) => (
                                        <li
                                            key={item.add_on_id}
                                            className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                                        >
                                            <div className="flex items-center pl-3">
                                                <input
                                                    id={item.add_on_id}
                                                    type="checkbox"
                                                    value={item.add_on_id}
                                                    checked={topping.some(
                                                        (top) => top.add_on_id === item.add_on_id
                                                    )}
                                                    onChange={handleCheckboxChange}
                                                    className="form-checkbox focus:outline-none focus:ring-2 focus:ring-palette-primary h-4 w-4 text-palette-primary"
                                                />
                                                <label
                                                    htmlFor={item.add_on_id}
                                                    className="ml-2 text-gray-700 dark:text-white cursor-pointer"
                                                >
                                                    {item.name} (+{item.price})
                                                </label>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-[10px]">
                <div className="flex items-start font-sans text-lg">
                    <p>
                        Total: <Price currency="VND" num={total} numSize="text-2xl"></Price>
                    </p>
                </div>
                {errorMessage && <p className="py-1">{errorMessage}</p>}
                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="focus:outline-none w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Add To Cart
                    <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="w-5 ml-2 background"
                    />
                </button>
            </div>
        </div>
    );
}

export default MilkteaForm;