import request from "./request";
import { toast } from 'react-toastify';
import base64 from 'base-64';

const API_extendSubscription = async (
    id,
    days
) => {
    try {
        const req = await request.patch(`subscription/extend/${id}/`, {
            days
        });

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при продлении подписки.");
        return null;
    }
    
}

export default API_extendSubscription;