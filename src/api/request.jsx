import axios from 'axios';

const request = axios.create({
    baseURL: "https://wallet-box-app.ru:8888/api/v1/"
});

if(localStorage.getItem("token") != null)
    request.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

export default request;