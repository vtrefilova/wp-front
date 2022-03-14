import request from "./request";
import { toast } from 'react-toastify';

const API_createAd = async (
    title,
    subTitle,
    content
) => {
    try {
        const req = await request.post(`advertising/`, {
            title,
            subTitle,
            content
        });

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при создании объявления.");
        return null;
    }
    
}

export default API_createAd;