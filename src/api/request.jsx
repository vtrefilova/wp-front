import axios from 'axios';

const request = axios.create({
    baseURL: "http://46.30.41.45/api/v1/"
});

if(localStorage.getItem("token") != null)
    request.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

export default request;