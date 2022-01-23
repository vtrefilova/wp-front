import request from "./request";
import { toast } from 'react-toastify';

const API_updateBaseCategory = async (
    name,
    desc,
    color,
    icon,
    id
) => {
    try {
        const req = await request.patch(`base-category/${id}/`, {
            name,
            description: desc,
            color,
            icon
        });

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при изменении базовой категории.");
        return null;
    }
    
}

export default API_updateBaseCategory;