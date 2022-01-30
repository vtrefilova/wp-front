import request from "./request";
import { toast } from 'react-toastify';

const API_getWalletTypes = async () => {
    try {
        const req = await request.get(`wallet/`);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении типов валют.");
        return null;
    }
    
}

export default API_getWalletTypes;