import request from "./request";
import { toast } from 'react-toastify';

const API_getUsersByPage = async (page, pageSize) => {
    try {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("pageSize", pageSize);

        const req = await request.get(`user/page?page=${page}&pageSize=${pageSize}/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении пользователей.");
        return null;
    }
    
}

export default API_getUsersByPage;