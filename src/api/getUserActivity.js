import request from "./request";
import { toast } from 'react-toastify';

const API_getUserActivity = async (
    id,
    startTime,
    endTime
) => {
    try {
        const params = new URLSearchParams();

        params.append("startTime", startTime);
        params.append("endTime", endTime);

        const req = await request.get(`/admin/user/activity/`+ id + "?" + params.toString());

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении активности пользователя.");
        return null;
    }
    
}

export default API_getUserActivity;