import request from "./request";
import { toast } from 'react-toastify';

const API_getUserTochkaCards = async (
    id
) => {
    try {
        const req = await request.get(`/admin/user/tochka-cards/` + id);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении карт точки.");
        return null;
    }
    
}

export default API_getUserTochkaCards;