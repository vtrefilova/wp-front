import request from "./request";
import { toast } from 'react-toastify';

const API_getHelpLeads = async (
    page,
    pageSize
) => {
    try {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("pageSize", pageSize);

        const req = await request.get(`help/page/?` + params.toString());

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении обращений.");
        return null;
    }
    
}

export default API_getHelpLeads;