import request from "./request";
import { toast } from 'react-toastify';

const API_createSubscriptionVariant = async (
    name,
    desc,
    price,
    newPrice,
    expiration
) => {
    try {
        const req = await request.post("subscription-variant/", {
            name,
            description: desc,
            price,
            newPrice,
            expiration
        });

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при создании вариата подписки.");
        return null;
    }
    
}

export default API_createSubscriptionVariant;