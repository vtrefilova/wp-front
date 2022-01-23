import request from "./request";
import { toast } from 'react-toastify';

const API_updateLoyaltyBlank = async (
    name,
    description,
    imageId,
    id
) => {
    try {
        const req = await request.patch(`loyalty-blank/${id}/`, imageId ? {
            name,
            description,
            imageId
        } : {
            name,
            description
        });

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при изменении бланка лояльности.");
        return null;
    }
    
}

export default API_updateLoyaltyBlank;