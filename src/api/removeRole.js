import request from "./request";
import { toast } from 'react-toastify';

const API_removeRole = async (id) => {
    try {
        const req = await request.delete(`user-role/${id}/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при удалении роли.");
        return null;
    }
    
}

export default API_removeRole;