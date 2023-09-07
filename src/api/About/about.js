export default async function allContact(){
    try {
        const response = await fetch("http://6th.onrender.com/home/all-contacts", {
            method: "get",
        });
        return await response.json();
    } catch (e) {
        return console.log("allContact: " + e);
    }
}

