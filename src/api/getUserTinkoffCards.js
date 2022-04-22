import request from "./request";
import { toast } from 'react-toastify';

const API_getUserTinkoffCards = async (
    id
) => {
    try {
        const req = await request.get(`/admin/user/tinkoff-cards/` + id);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении карт тинькофф.");
        return null;
    }
    
}

export default API_getUserTinkoffCards;