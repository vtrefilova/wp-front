import request from "./request";
import { toast } from 'react-toastify';

const API_getUserBills = async (
    id
) => {
    try {
        const req = await request.get(`/admin/user/bills/` + id);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении счетов.");
        return null;
    }
    
}

export default API_getUserBills;