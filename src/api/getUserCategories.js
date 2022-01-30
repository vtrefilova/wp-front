import request from "./request";
import { toast } from 'react-toastify';

const API_getUserCategories = async (
    id
) => {
    const params = new URLSearchParams();

    params.append("userId", id);

    try {
        const req = await request.get(`category/?` + params.toString());

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении категорий.");
        return null;
    }
    
}

export default API_getUserCategories;