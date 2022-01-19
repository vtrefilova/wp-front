import request from "./request";
import { toast } from 'react-toastify';
import base64 from 'base-64';

const API_authUser = async (username, password) => {
    try {
        const req = await request.post("auth/", {
            username,
            password: base64.encode(password)
        });

        return req.data.data;
    } catch(e) {
        toast.error("Проверьте правильность данных.");

        return null;
    }
    
}

export default API_authUser;