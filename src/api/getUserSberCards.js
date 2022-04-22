import request from "./request";
import { toast } from 'react-toastify';

const API_getUserSberCards = async (
    id
) => {
    try {
        const req = await request.get(`/admin/user/sber-cards/` + id);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении карт сбер.");
        return null;
    }
    
}

export default API_getUserSberCards;