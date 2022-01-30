import request from "./request";
import { toast } from 'react-toastify';

const API_getUserLoyaltyCards = async (
    id
) => {
    const params = new URLSearchParams();

    params.append("userId", id);

    try {
        const req = await request.get(`loyalty-card/user/?` + params.toString());

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении карт лояльности.");
        return null;
    }
    
}

export default API_getUserLoyaltyCards;