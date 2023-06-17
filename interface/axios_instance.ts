import axios from "axios";

axios.defaults.withCredentials = true;

const requestSender = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:7777",
});

export default requestSender;

