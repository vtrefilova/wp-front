import request from "./request";
import { toast } from 'react-toastify';

const API_getUserSubscription = async (
    id
) => {
    try {
        const req = await request.get(`subscription/user/${id}/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении подписки.");
        return null;
    }
    
}

export default API_getUserSubscription;