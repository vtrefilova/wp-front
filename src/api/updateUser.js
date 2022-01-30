import request from "./request";
import { toast } from 'react-toastify';
import base64 from 'base-64';

const API_updateUser = async (
    id,
    username = null,
    email = null,
    plannedIncome = null,
    walletType = null,
    password = null,
    roleName = null
) => {
    try {
        const req = await request.patch(`user/${id}/`, {
            username,
            email,
            plannedIncome,
            walletType,
            password: password ? password.length > 0 ? base64.encode(password) : null : null,
            roleName
        });

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при изменении пользователя.");
        return null;
    }
    
}

export default API_updateUser;