import request from "./request";
import { toast } from 'react-toastify';

const API_createLoyaltyBlank = async (
    name,
    description,
    imageId
) => {
    try {
        const req = await request.post("loyalty-blank/", imageId ? {
            name,
            description,
            imageId
        } : {
            name,
            description
        });

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при создании бланка лояльности.");
        return null;
    }
    
}

export default API_createLoyaltyBlank;