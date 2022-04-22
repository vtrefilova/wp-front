import request from "./request";
import { toast } from 'react-toastify';

const API_removeUser = async (id) => {
    try {
        const req = await request.delete(`/admin/user/${id}/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при удалении пользователя.");
        return null;
    }
    
}

export default API_removeUser;