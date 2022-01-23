import request from "./request";
import { toast } from 'react-toastify';

const API_getRoles = async () => {
    try {
        const req = await request.get(`user-role/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении ролей.");
        return null;
    }
    
}

export default API_getRoles;