import request from "./request";
import { toast } from 'react-toastify';

const API_getBaseCategories = async () => {
    try {
        const req = await request.get("base-category/");

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении базовых категорий.");
        return null;
    }
    
}

export default API_getBaseCategories;