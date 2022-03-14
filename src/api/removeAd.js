import request from "./request";
import { toast } from 'react-toastify';

const API_removeAd = async (
    id
) => {
    try {
        const req = await request.delete(`advertising/` + id);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при удалении объявления.");
        return null;
    }
    
}

export default API_removeAd;