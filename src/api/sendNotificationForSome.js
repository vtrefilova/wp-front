import request from "./request";
import { toast } from 'react-toastify';

const API_sendNotificationForSome = async (
    header,
    body,
    userId
) => {
    try {
        const req = await request.post(`notification/firebase/user/some/`, {
            header,
            body,
            userId
        });

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при отправке уведомления.");
        return null;
    }
    
}

export default API_sendNotificationForSome;