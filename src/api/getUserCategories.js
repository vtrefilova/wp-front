import request from "./request";
import { toast } from 'react-toastify';

const API_getUserCategories = async (
    id
) => {
    try {
        const req = await request.get(`/admin/user/categories/` + id);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении категорий.");
        return null;
    }
    
}

export default API_getUserCategories;