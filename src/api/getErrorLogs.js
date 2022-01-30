import request from "./request";
import { toast } from 'react-toastify';

const API_getErrorLogs = async (
    page,
    pageSize
) => {
    try {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("pageSize", pageSize);

        const req = await request.get(`error-log/page/?` + params.toString());

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении логов.");
        return null;
    }
    
}

export default API_getErrorLogs;