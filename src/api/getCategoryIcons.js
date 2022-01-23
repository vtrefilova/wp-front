import request from "./request";
import { toast } from 'react-toastify';

const API_getCategoryIcons = async () => {
    try {
        const req = await request.get("image/tag/CATEGORY_ICON/");

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении иконок категорий.");
        return null;
    }
    
}

export default API_getCategoryIcons;