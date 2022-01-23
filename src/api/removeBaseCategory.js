import request from "./request";
import { toast } from 'react-toastify';

const API_removeBaseCategory = async (id) => {
    try {
        const req = await request.delete(`base-category/${id}`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при удалении базовой категорий.");
        return null;
    }
    
}

export default API_removeBaseCategory;