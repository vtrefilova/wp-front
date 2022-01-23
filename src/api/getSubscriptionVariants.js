import request from "./request";
import { toast } from 'react-toastify';

const API_getSubscriptionVariants = async () => {
    try {
        const req = await request.get("subscription-variant/");

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении вариантов подписки.");
        return null;
    }
    
}

export default API_getSubscriptionVariants;