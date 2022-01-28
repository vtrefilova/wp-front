import request from "./request";
import { toast } from 'react-toastify';

const API_findUsers = async (
    phone = null
) => {
    try {
        const params = new URLSearchParams();
        params.append("phone", phone);

        const req = await request.get(`user/find?` + params.toString());

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении пользователей.");
        return null;
    }
    
}

export default API_findUsers;