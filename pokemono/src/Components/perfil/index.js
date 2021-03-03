import { Button, Form, Col, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { StyleSheet, css } from "aphrodite";

import { getPokemonFromUser } from "../../controller/batalhaController";

import {
  getPokemons,
  postPokemons,
  getPokemonIdByName,
} from "../../controller/perfilController";

const pageStyle = StyleSheet.create({
  Page: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50,
    marginRight: 50
  },

  container: {
    display: "flex",
    width: '100%',
    flexDirection: "column",
    justifyContent: "center",
    textAlign: 'center'
  },

  form: {
    width: "100%",
    height: "auto",
    maxWidth: "800px",
    padding: "10px 20px 3%",
    margin: "0",
    border: "1px solid black",
    borderRadius: "10px",
    backgroundColor: "rgb(255, 255, 255)",
    margin: 50
  },

  myPokemons: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    maxWidth: "100%",
  },

  cadParc: {
    fontSize: "24px",
    padding: "5px 0px 10px",
    textAlign: "center",
  },
});

function Perfil(props) {
  const [myPokemon, setMyPokemon] = useState([]);
  const [pokemon1, setPokemon1] = useState("");
  const [pokeArray, setPokeArray] = useState([]);
  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    async function get() {
      const response = await getPokemons();
      if (response) {
        setPokeArray(response);
      }
    }

    async function getMyPokemon() {
      try {
        await getPokemonFromUser({ id: userId }, setMyPokemon);
      } catch (error) {
        console.log(error);
      }
    }
    console.log({ myPokemon });

    getMyPokemon();
    get();
  }, []);

  function changePokemon(e) {
    setPokemon1(e.target.value);
    console.log(pokemon1);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const treinadorId = localStorage.getItem("user_id");
    const pokemonoRetorna = await getPokemonIdByName(pokemon1);
    await postPokemons(treinadorId, pokemonoRetorna.id);
  }

  return (
    <>
      {console.log(pokemon1)}
      <div className={css(pageStyle.Page)}>
        <div className={css(pageStyle.container)}>
          <h1>Meus Pokemon's</h1>
        </div>
        <div className={css(pageStyle.myPokemons)}>
          {myPokemon.map((poke, index) => (
            <Card key={index} style={{ width: "10rem", marginTop: 10, marginBottom: 10 }}>
              <Card.Img variant="top" src={poke.img} />
              <Card.Body>
                <Card.Title>{poke.pokeName}</Card.Title>
                <Card.Text>EXP: {poke.xp}xp</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className={css(pageStyle.form)}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              {/* <Form.Label>{treinador}</Form.Label> */}
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Treinar novo Pokemon</Form.Label>
              <Form.Control
                as="select"
                defaultValue={pokemon1}
                onChange={changePokemon}
              >
                {pokeArray.map((pokemon, index) => {
                  return (
                    <option onChange={(e) => changePokemon(e)} key={index}>
                      {pokemon.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
            <Button variant="danger" type="button" onClick={() => props.history.push('/batalha')}>
              Batalha!
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default withRouter(Perfil);
