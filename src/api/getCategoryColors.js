import request from "./request";
import { toast } from 'react-toastify';

const API_getCategoryColors = async () => {
    try {
        const req = await request.get("category/colors");

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении цветов категорий.");
        return null;
    }
    
}

export default API_getCategoryColors;