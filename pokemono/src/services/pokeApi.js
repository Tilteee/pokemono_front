import axios  from 'axios';

const pokeApiConfig = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
});

export default pokeApiConfig;
