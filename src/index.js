import './sass/main.scss';
import axios from "axios";

const AUTH_TOKEN = "24370619-9679c13b7b313e4f61ec3203f";
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

