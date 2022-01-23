import request from "./request";
import { toast } from 'react-toastify';

const API_getPermissionVariants = async () => {
    try {
        const req = await request.get(`user-role/permission/variants/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении доступов.");
        return null;
    }
    
}

export default API_getPermissionVariants;