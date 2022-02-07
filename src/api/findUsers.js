import request from "./request";
import { toast } from 'react-toastify';

const API_findUsers = async (
    phone = null,
    email = null,
    type = null,
    startDate = null,
    endDate = null
) => {
    try {
        const params = new URLSearchParams();

        if(phone)
            params.append("phone", phone);
        
        if(email)
            params.append("email", email);
        
        if(type)
            params.append("type", type);
        
        if(startDate)
            params.append("startDate", startDate);
        
        if(endDate)
            params.append("endDate", endDate);

        const req = await request.get(`user/find?` + params.toString());

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при получении пользователей.");
        return null;
    }
    
}

export default API_findUsers;