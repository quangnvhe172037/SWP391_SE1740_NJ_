import axios from "axios";
import authHeader from "./authheader";

const API_URL = "http://localhost:8080/api/test";

const getPublishContent = () => {
    return axios.get(API_URL + "/all");
};

const getUsserBoard = () => {
    return axios.get(API_URL + "user", {
        headers: authHeader()
    });
}

const getAdminBoard = () => {
    return axios.get(API_URL + "adimn", {
        headers: authHeader()
    });
}

const userapi = {
    getPublishContent, getAdminBoard, getUsserBoard
};

export default userapi;