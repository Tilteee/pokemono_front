import { Button, Form, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { StyleSheet, css } from 'aphrodite';
import mainApi from '../../services/mainApi'
import pokeApiConfig from '../../services/pokeApi'
// import axios from 'axios'
import { getPokemons, postPokemons, getPokemonIdByName } from '../../controller/perfilController'
const pageStyle = StyleSheet.create({
  Page: {
    width: '100%'
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: '97%',
    marginLeft: '3%',
  },

  form: {
    width: '100%',
    height: 'auto',
    maxWidth: '800px',
    padding: '10px 20px 3%',
    margin: '0',
    border: '1px solid black',
    borderRadius: '10px',
    backgroundColor: 'rgb(255, 255, 255)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translateX(-50%)'
  },

  cadParc: {
    fontSize: '24px',
    padding: '5px 0px 10px',
    textAlign: 'center',
  }
})


export default function Login() {
  const [treinador, setTreinador] = useState('');
  const [pokemon1, setPokemon1] = useState('');
  const [pokeArray, setPokeArray] = useState([]);
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    
    async function get() {
      const response = await getPokemons();
      console.log(response)
      if (response) {
        setPokeArray(response)
      }
    }
    get();


  }, [])
  function changePokemon(e) {
    setPokemon1(e.target.value);
    console.log(pokemon1)
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const treinadorId = localStorage.getItem('user_id')
    console.log(treinadorId)
    const pokemonoRetorna = await getPokemonIdByName(pokemon1);
    console.log(pokemonoRetorna)
    const response = await postPokemons(treinadorId, pokemonoRetorna.id)
  }
  return (
    <>
      {console.log(pokemon1)}
      <div className={css(pageStyle.Page)}>
        <div className={css(pageStyle.container)}></div>
        <div className={css(pageStyle.form)} >
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              {/* <Form.Label>{treinador}</Form.Label> */}
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Pokemon 1</Form.Label>
              <Form.Control as="select" defaultValue={pokemon1} onChange={changePokemon}>
                {pokeArray.map((pokemon, index) => {
                  return <option onChange={e => changePokemon(e)} key={index}>{pokemon.name}</option>
                })}

              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Salvar
                  </Button>
          </Form>
        </div>
      </div>
    </>
  )
}
