import request from "./request";
import { toast } from 'react-toastify';

const API_getUserTochkaTransactions = async (
    id,
    page,
    pageSize
) => {
    try {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("pageSize", pageSize);

        const req = await request.get(`/admin/user/tochka-transactions/${id}?` + params.toString());

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении транзакций.");
        return null;
    }
    
}

export default API_getUserTochkaTransactions;