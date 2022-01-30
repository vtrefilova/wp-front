import request from "./request";
import { toast } from 'react-toastify';

const API_getUserTransactions = async (
    id,
    page,
    pageSize
) => {
    try {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("pageSize", pageSize);

        const req = await request.get(`transaction/user/${id}/?` + params.toString());

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении транзакций.");
        return null;
    }
    
}

export default API_getUserTransactions;