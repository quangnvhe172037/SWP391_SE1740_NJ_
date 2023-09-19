import axios from "axios";
import authHeader from "./authheader";
import jwtDecode from "jwt-decode";

const API_URL = "http://localhost:8080/api/test";
const token = localStorage.getItem("token");
console.log(token);
const decodedToken = jwtDecode(token, process.env.JWT_SECRECT);
console.log(decodedToken);
if(decodedToken.exp < new Date()){
    console.log("token het han");
}
const getPublishContent = () => {
    return axios.get(API_URL + "/all",);
};

const getCustomerBoard = () => {
    console.log(token);
    const decodedToken = jwtDecode(token, process.env.JWT_SECRECT);
    console.log(decodedToken);
    return axios.get(API_URL + "/customer", {
        headers: {
            "Content-Type": "application/json", // Đặt Content-Type là application/json
            Authorization: `Bearer ${token}`,
        },
    });
}

const getAdminBoard = () => {
    return axios.get(API_URL + "/admin", {
        headers: {
            "Content-Type": "application/json", // Đặt Content-Type là application/json
            Authorization: `Bearer ${token}`,
        },
    });
}
const getExpertBoard = () => {
    return axios.get(API_URL + "/expert", {
        headers: {
            "Content-Type": "application/json", // Đặt Content-Type là application/json
            Authorization: `Bearer ${token}`,
        },
    });
};

const userapi = {
    getPublishContent, getAdminBoard, getExpertBoard, getCustomerBoard
};

export default userapi;