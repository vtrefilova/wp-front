import request from "./request";
import { toast } from 'react-toastify';

const API_getUserLoyaltyCards = async (
    id
) => {
    try {
        const req = await request.get(`/admin/user/loyalty-cards/` + id);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении карт лояльности.");
        return null;
    }
    
}

export default API_getUserLoyaltyCards;