import axios from "axios";

const AUTH_TOKEN = "24370619-9679c13b7b313e4f61ec3203f";
axios.defaults.baseURL = 'https://pixabay.com/api/';


export const getImages = async (value) => {
    
    const response = await axios.get(`?key=${AUTH_TOKEN}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`);
    console.log(response.data);

    return response.data.hits;
    
}


export default { getImages }


