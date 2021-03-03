import mainApi from "../services/mainApi";
import pokeApiConfig from "../services/pokeApi";
import {getPokemonFromUser} from './batalhaController'
async function getPokemons(){
    const response = await pokeApiConfig.get('/pokemon');
    return response.data.results;
}

async function getPokemonIdByName(pokemon){
    const response = await pokeApiConfig.get(`/pokemon/${pokemon}`);
    return response.data;
}
  
async function postPokemons(idTreinador, idPokemon){
    console.log(idTreinador, idPokemon)
    const response = await mainApi.post('/pokemon', {idTreinador, idPokemon} )
    return response;
}
export {getPokemons, postPokemons, getPokemonIdByName};
