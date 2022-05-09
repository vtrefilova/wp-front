import request from "./request";
import { toast } from 'react-toastify';

const API_updateBaseCategory = async (
    name,
    desc,
    color,
    icon,
    id,
    forEarn,
    forSpend
) => {
    try {
        const req = await request.patch(`base-category/${id}/`, {
            name,
            description: desc,
            color,
            icon,
            forEarn,
            forSpend
        });

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при изменении базовой категории.");
        return null;
    }
    
}

export default API_updateBaseCategory;