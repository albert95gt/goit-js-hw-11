import axios from "axios";

const AUTH_TOKEN = "24370619-9679c13b7b313e4f61ec3203f";
axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class PixabayApiServices {
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    }

    async getImages(){
        const urlOptions = `?key=${AUTH_TOKEN}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
        
        const response = await axios.get(urlOptions)
        
        
        
        
        
        
        
        return response.data;
    }
    
    incrementPage(){
        this.page += 1;
    }

    resetPage(){
        this.page = 1;
    }

    get Query(){
       return this.searchQuery;
    }

    set Query(newQuery){
        this.searchQuery = newQuery;
    }
}