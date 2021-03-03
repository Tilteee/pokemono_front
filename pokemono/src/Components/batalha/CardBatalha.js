import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import { battle, getPokemonFromUser } from "../../controller/batalhaController";


function CardBatalha({ user }) {
    const pageStyle = StyleSheet.create({
        Page: {
            margin: 25,
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap'
        }
    })


  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    getPokemonFromUser(user, setPokemon);
  }, [user]);

  return (
    <>
        <h1>Escolha seu pokemon para batalha!</h1>
        <div className={css(pageStyle.Page)}>
        {pokemon.lenght > 0 ? pokemon.map((poke, index) => (
            <Card key={index}>
            <Card style={{ width: "18rem", margin: 10 }}>
                <Card.Img variant="top" src={poke.img} />
                <Card.Body>
                <Card.Title>{poke.pokeName.charAt(0).toUpperCase() + poke.pokeName.slice(1)}</Card.Title>
                <Card.Text>Experiência: {poke.xp}xp</Card.Text>
                <Button variant="primary" onClick={() => battle(user.id)} >Usar na batalha!</Button>
                </Card.Body>
            </Card>
            </Card>
        )) : <h2>Você ainda não tem pokemon! </h2>}
        </div>
    </>
  );
}

export default CardBatalha;
