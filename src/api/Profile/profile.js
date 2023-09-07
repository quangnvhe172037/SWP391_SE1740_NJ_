import getRole from "../../role";

async function getUserProfile() {
    try {
        const role = getRole();
        const response = await fetch(
            "http://6th.onrender.me/customer/my-account-info",
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
            return { success: true, message: data };
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

async function updataAccountInfo(account) {
    try {
        const role = getRole();
        const response = await fetch(
            "http://6th.onrender.me/customer/my-account-info/update",
            {
                method: "put",
                headers: {
                    "Content-type": "application/json",
                    authorization: role?.token ? `Bearer ${role.token}` : "",
                },
                body: JSON.stringify(account)
            }
        );
        if (response.status === 200) {
            const data = await response.json();
            return { success: true, message: data };
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

export { getUserProfile, updataAccountInfo };