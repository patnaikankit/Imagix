// sending api calls to the backend from the data recieved in the frontend
import axios from "../utils/axios";

// for generating an image
const generateImage = async (data: { prompt: string; size: string }) => {
    try{
        const response = await axios.post("/image/generate", data);
        return response;
    }
    catch(error){
        throw error;
    }
}


// for retreving all images
const fetchImages = async (page: number, limit = 8) => {
    return axios.get(`/image/all?page=${page}&limit=${limit}`).then((res) => {
        return res;
    }).catch((error) => {
        throw error;
    })
}

const imageService = {
    generateImage,
    fetchImages
}

export default imageService;