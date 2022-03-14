import request from "./request";
import { toast } from 'react-toastify';

const API_updateAd = async (
    id,
    title,
    subTitle,
    content
) => {
    try {
        const req = await request.patch(`advertising/` + id, {
            title,
            subTitle,
            content
        });

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при обновлении объявления.");
        return null;
    }
    
}

export default API_updateAd;