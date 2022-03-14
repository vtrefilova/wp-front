import request from "./request";
import { toast } from 'react-toastify';

const API_getAds = async (
) => {
    try {
        const req = await request.get(`advertising/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении объявлений.");
        return null;
    }
    
}

export default API_getAds;