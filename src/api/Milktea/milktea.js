const api = "http://6th.onrender.com";

async function SearchMilktea(searchkey) {
    try {
        const replacedKey = searchkey.split(" ").join("+");
        const response = await fetch(`${api}/search/${replacedKey}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const data = await response.json();
            return { success: true, data };
        } else if (response.status === 404) {
            return { success: false, message: "No data found" };
        } else {
            return { success: false, message: "Unexpected error" };
        }
    } catch (error) {
        return { success: false, message: "Error: " + error.message };
    }
}

async function listMilktea() {
    try {
        const response = await fetch(`${api}/all-milk-teas`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            return response.json();
        } else return "Failed to connect to Server!!";
    } catch (err) {
        return "Server Error!!!";
    }
}

async function findMilkteaById(id) {
    try {
        const response = await fetch(`${api}/get-milk-tea/${id}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const data = await response.json();
            return { success: true, data };
        } else if (response.status === 404) {
            return { success: false, message: "No data found" };
        } else {
            return { success: false, message: "Unexpected error" };
        }
    } catch (error) {
        return { success: false, message: "Error: " + error.message };
    }
}

export { SearchMilktea, findMilkteaById, listMilktea };