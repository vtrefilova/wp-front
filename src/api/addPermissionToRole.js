import request from "./request";
import { toast } from 'react-toastify';

const API_addPermissionToRole = async (
    id,
    permission
) => {
    try {
        const req = await request.post(`user-role/permission/${id}/`, {
            systemName: permission
        });

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при добавлении доступа к роли.");
        return null;
    }
    
}

export default API_addPermissionToRole;