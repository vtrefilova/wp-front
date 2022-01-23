import request from "./request";
import { toast } from 'react-toastify';

const API_getFile = async (tag) => {
    try {
        const req = await request.get(`image/tag/${tag}/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении файлов.");
        return null;
    }
    
}

export default API_getFile;