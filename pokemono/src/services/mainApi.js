import axios  from 'axios';

const mainApi = axios.create({
    baseURL: 'http://localhost:3333',
});

export default mainApi;
