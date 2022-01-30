import request from "./request";
import { toast } from 'react-toastify';
import base64 from 'base-64';

const API_createUser = async (
    username,
    email,
    type,
    password,
    walletType,
    roleName
) => {
    try {
        const req = await request.post("user/", {
            username,
            email: email ? email.length ? email : null : null,
            type,
            password: base64.encode(password),
            walletType,
            roleName
        });

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при создании пользователя.");
        return null;
    }
    
}

export default API_createUser;