import request from "./request";
import { toast } from 'react-toastify';

const API_adRemoveFile = async (
    adId,
    id
) => {
    try {
        const req = await request.delete(`advertising/file/` + adId, {
            data: JSON.stringify({
                id: id
            })
        });

        return req.data.data;
    } catch(e) {
        console.log(e.request);
        console.log(e.response);
        toast.error("Ошибка при удалении файла.");
        return null;
    }
    
}

export default API_adRemoveFile;