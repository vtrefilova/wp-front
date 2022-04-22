import request from "./request";
import { toast } from 'react-toastify';

const API_resetUserPin = async (id) => {
    try {
        const req = await request.post(`admin/user/reset-pin/${id}/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при сбросе PIN.");
        return null;
    }
    
}

export default API_resetUserPin;