import request from "./request";
import { toast } from 'react-toastify';

const API_getAdById = async (
    id
) => {
    try {
        const req = await request.get(`advertising/` + id);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении объявления.");
        return null;
    }
    
}

export default API_getAds;