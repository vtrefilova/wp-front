import request from "./request";
import { toast } from 'react-toastify';

const API_removeLoyaltyBlank = async (
    id
) => {
    try {
        const req = await request.delete(`loyalty-blank/${id}/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при удалении бланка лояльности.");
        return null;
    }
    
}

export default API_removeLoyaltyBlank;