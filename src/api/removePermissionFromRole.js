import request from "./request";
import { toast } from 'react-toastify';

const API_removePermissionFromRole = async (
    id
) => {
    try {
        const req = await request.delete(`user-role/permission/${id}/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при удалении доступа из роли.");
        return null;
    }
    
}

export default API_removePermissionFromRole;