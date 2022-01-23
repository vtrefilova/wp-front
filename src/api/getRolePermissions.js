import request from "./request";
import { toast } from 'react-toastify';

const API_getRolePermissions = async (id) => {
    try {
        const req = await request.get(`user-role/permission/role/${id}/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении доступов роли.");
        return null;
    }
    
}

export default API_getRolePermissions;