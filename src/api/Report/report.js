import getRole from "../../role";
export default async function sendReport(report){
    try{
        const role = await getRole()
        const response = await fetch('http://6th.onrender.com/home/report/', {
            method: "post",
            headers: {
                'Content-type': 'application/json',
                authorization: role?.token? `Bearer ${role.token}` : '',
            },

            body:JSON.stringify(report)
        });
        if (response.status === 200) {
            const data = await response.json();
            return { success: true, message: data.message };
        } else if (response.status === 401) {
            return { success: false, message: response.message };
        } else {
            return { success: false, message: "Unexpected error" };
        }
    } catch (error) {
        return { success: false, message: "Error: " + error.message };
    }
}