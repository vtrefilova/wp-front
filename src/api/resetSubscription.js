import request from "./request";
import { toast } from 'react-toastify';
import base64 from 'base-64';

const API_resetSubscription = async (
    id
) => {
    try {
        const req = await request.get(`/admin/user/subscription/reset/${id}/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при аннулировании подписки.");
        return null;
    }
    
}

export default API_resetSubscription;