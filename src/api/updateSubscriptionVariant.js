import request from "./request";
import { toast } from 'react-toastify';

const API_updateSubscriptionVariant = async (
    name,
    desc,
    price,
    newPrice,
    expiration,
    id
) => {
    try {
        const req = await request.patch(`subscription-variant/${id}/`, {
            name,
            description: desc,
            price,
            newPrice,
            expiration
        });

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при обновлении вариата подписки.");
        return null;
    }
    
}

export default API_updateSubscriptionVariant;