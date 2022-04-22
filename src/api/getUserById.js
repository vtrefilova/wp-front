import request from "./request";
import { toast } from 'react-toastify';

const API_getUserById = async (id) => {
    try {
        const req = await request.get(`/admin/user/${id}/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении пользователя.");
        return null;
    }
    
}

export default API_getUserById;