import request from "./request";
import { toast } from 'react-toastify';

const API_updateUserRole = async (
    name,
    autoApply,
    isAdmin,
    roleAfterBuy,
    roleAfterBuyExpiration,
    roleForBlocked,
    id
) => {
    try {
        const req = await request.patch(`user-role/${id}/`, {
            'name': name,
            'autoApply': autoApply,
            'isAdmin': isAdmin,
            'roleAfterBuy': roleAfterBuy,
            roleForBlocked,
            'roleAfterBuyExpiration': roleAfterBuyExpiration
        });

        return req.data.data;
    } catch(e) {
        console.log(e.request);
        toast.error("Ошибка при изменении роли.");
        return null;
    }
    
}

export default API_updateUserRole;