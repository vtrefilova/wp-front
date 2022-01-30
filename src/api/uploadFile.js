import request from "./request";
import { toast } from 'react-toastify';

const API_uploadFile = async (
    file,
    tag
) => {
    try {
        const data = new FormData();

        data.append("file", file);
        data.append("tag", tag);

        const req = await request.post("image/", data);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при загрузке файла.");
        return null;
    }
    
}

export default API_uploadFile;