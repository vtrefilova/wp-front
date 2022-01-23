import request from "./request";
import { toast } from 'react-toastify';

const API_getLoyaltyBlanks = async () => {
    try {
        const req = await request.get(`loyalty-blank/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении бланков лояльности.");
        return null;
    }
    
}

export default API_getLoyaltyBlanks;