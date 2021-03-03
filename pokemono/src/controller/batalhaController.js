import mainApi from "../services/mainApi";
import pokeApiConfig from "../services/pokeApi";

async function getPokemonFromUser(user, setPokemon) {
  if (user) {
    const pokemonUser = await mainApi.get(`/pokemon/treinador/${user.id}`);
    const { pokemonTreinador } = pokemonUser.data;
    const response = await Promise.all(
      pokemonTreinador.map(async (poke) => {
        const pokeResponse = await pokeApiConfig.get(
          `/pokemon/${poke.id_pokemon}`
        );
        const { forms, base_experience, sprites } = pokeResponse.data;
        return {
          pokeName: forms[0].name,
          xp: base_experience,
          img: sprites.front_default,
        };
      })
    );
    if(setPokemon !== null) setPokemon(response);
    else return response;
  } else alert("USUÁRIO NÃO TEM POKEMON VÁ PARA A PÁGINA DE COMPRAS");
}

async function getDesafiado(id_treinador) {
    const response = await mainApi.get("/treinadores");
    const { treinadores } = response.data;
    const possiveisDesafiados = treinadores.filter(elem => elem.id !== id_treinador)
    return possiveisDesafiados[Math.floor(Math.random() * possiveisDesafiados.length)];
}

async function getPokemonDesafiado(desafiado) {
    const pokemons = await getPokemonFromUser(desafiado, null);
    console.log({desafiado});
    return pokemons[Math.floor(Math.random() * pokemons.length)];
}

async function battle(id_treinador) {
  const desafiado = await getDesafiado(id_treinador);
    const pokemonDesafiado = await getPokemonDesafiado(desafiado);

    const response = await mainApi.post('/batalha', { id_desafiado: desafiado.id, id_desafiante: id_treinador })
    const {vencedor} = response.data;
    console.log({pokemonDesafiado});
    if(vencedor === id_treinador) alert('VOCÊ VENCEU!!');
    else alert(`${desafiado.nome} venceu seu pokemon com seu ${pokemonDesafiado.pokeName.charAt(0).toUpperCase() + pokemonDesafiado.pokeName.slice(1)}`);
}

export { getPokemonFromUser, battle };
