import request from "./request";
import { toast } from 'react-toastify';

const API_getUserBills = async (
    id
) => {
    const params = new URLSearchParams();

    params.append("userId", id);

    try {
        const req = await request.get(`bill/?` + params.toString());

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении счетов.");
        return null;
    }
    
}

export default API_getUserBills;