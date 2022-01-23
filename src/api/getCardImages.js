import request from "./request";
import { toast } from 'react-toastify';

const API_getCardImages = async () => {
    try {
        const req = await request.get("image/tag/CARD_IMAGE/");

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении изображений карт.");
        return null;
    }
    
}

export default API_getCardImages;