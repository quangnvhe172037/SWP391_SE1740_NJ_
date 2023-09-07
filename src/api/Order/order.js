import getRole from "../../role";

const api = "http://6th.onrender.com/customer";

async function saveToCart(mTeaId, topping, order) {
    try {
        const role = getRole();
        const response = await fetch(`${api}/save-to-cart/${mTeaId}/${topping}`, {
            method: "post",
            headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${role.token}`,
            },

            body: JSON.stringify(order),
        });

        if (response.status === 200) {
            const data = await response.json();
            return { success: true, message: data.message };
        } else if (response.status === 401) {
            return { success: false, message: "You must login as a customer" };
        } else if (response.status === 400) {
            return {
                success: false,
                message: "token has wrong or expired, please login again",
            };
        } else {
            return { success: false, message: "Unexpected error" };
        }
    } catch (error) {
        return { success: false, message: "Error: " + error.message };
    }
}

async function getCart(){
    try {
        const role = getRole();
        const response = await fetch(
            `${api}/my-cart`,
            {
                method: "get",
                headers: {
                    "Content-type": "application/json",
                    authorization: role?.token ? `Bearer ${role.token}` : "",
                },
            }
        );
        if (response.status === 200) {
            const data = await response.json();
            return { success: true, message:data };
        } else if (response.status === 401) {
            return {
                success: false,
                message: "token has wrong or expired, please login again",
            };
        } else {
            return { success: false, message: "Unexpected error" };
        }
    } catch (error) {
        return { success: false, message: "Error: " + error.message };
    }
}

async function deleteMilkteaInCart(mteaId){
    try {
        const role = getRole();
        const response = await fetch(
            `${api}/my-cart/delete/${mteaId}`,
            {
                method: "delete",
                headers: {
                    "Content-type": "application/json",
                    authorization: role?.token ? `Bearer ${role.token}` : "",
                },
            }
        );
        if (response.status === 200) {
            const data = await response.json();
            return { success: true, message:data };
        } else if (response.status === 401) {
            return {
                success: false,
                message: "token has wrong or expired, please login again",
            };
        } else {
            return { success: false, message: "Unexpected error" };
        }
    } catch (error) {
        return { success: false, message: "Error: " + error.message };
    }
}

async function updateMilkteaInCart(mtea){
    try {
        console.log('hi')
        const role = getRole();
        const response = await fetch(
            `${api}/my-cart/update/${mtea.custom_milk_tea_id}`,
            {
                method: "put",
                headers: {
                    "Content-type": "application/json",
                    authorization: role?.token ? `Bearer ${role.token}` : "",
                },
                body: mtea
            }
        );
        if (response.status === 200) {
            const data = await response.json();
            return { success: true, message:data };
        } else if (response.status === 401) {
            return {
                success: false,
                message: "token has wrong or expired, please login again",
            };
        } else {
            return { success: false, message: "Unexpected error" };
        }
    } catch (error) {
        return { success: false, message: "Error: " + error.message };
    }
}

export { saveToCart,getCart,deleteMilkteaInCart,updateMilkteaInCart };
