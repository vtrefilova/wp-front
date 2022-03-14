import request from "./request";
import { toast } from 'react-toastify';

const API_adUploadFile = async (
    file,
    id
) => {
    try {
        const data = new FormData();

        data.append("file", file);

        const req = await request.patch("advertising/file/" + id + "/", data);

        return req.data.data;
    } catch(e) {
        toast.error("Ошибка при загрузке файла.");
        return null;
    }
    
}

export default API_adUploadFile;