import request from "./request";
import { toast } from 'react-toastify';

const API_getRoleById = async (id) => {
    try {
        const req = await request.get(`user-role/${id}/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении роли.");
        return null;
    }
    
}

export default API_getRoleById;