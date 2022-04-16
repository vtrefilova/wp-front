import request from "./request";
import { toast } from 'react-toastify';

const API_createSubscriptionVariantGroup = async (
    name,
    variantIds
) => {
    try {
        const req = await request.post("subscription-variant/group", {
            name,
            variantIds
        });

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при создании вариата подписки.");
        return null;
    }
    
}

export default API_createSubscriptionVariantGroup;