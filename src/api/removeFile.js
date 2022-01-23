import request from "./request";
import { toast } from 'react-toastify';

const API_getFile = async (id) => {
    try {
        const req = await request.delete(`image/${id}/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при удалении файла.");
        return null;
    }
    
}

export default API_getFile;