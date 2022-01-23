import request from "./request";
import { toast } from 'react-toastify';

const API_createRole = async (
    name
) => {
    try {
        const req = await request.post("user-role/", {
            name,
            autoApply: false,
            isAdmin: false,
            roleAfterBuy: false,
            roleAfterBuyExpiration: false
        });

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при создании роли.");
        return null;
    }
    
}

export default API_createRole;