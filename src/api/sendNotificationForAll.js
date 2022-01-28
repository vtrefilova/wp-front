import request from "./request";
import { toast } from 'react-toastify';

const API_sendNotificationForAll = async (
    header,
    body
) => {
    try {
        const req = await request.post(`notification/firebase/user/all/`, {
            header,
            body
        });

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при отправке уведомлений.");
        return null;
    }
    
}

export default API_sendNotificationForAll;