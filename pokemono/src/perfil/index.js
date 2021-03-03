import {Button, Form, Col} from 'react-bootstrap'
import React, {useState} from 'react'
import {StyleSheet, css} from 'aphrodite';

const pageStyle = StyleSheet.create({
	Page:{
		width: '100%'
    },

    container:{
        display: 'flex',
	    flexDirection: 'column',
	    alignItems: 'center',
	    height: '100%',
        width: '97%',
        marginLeft: '3%',
    },

    form:{
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

    cadParc:{
        fontSize: '24px',
	    padding: '5px 0px 10px',
	    textAlign: 'center',
    }
})


export default function Login(){
    const [treinador, setTreinador] = useState('');
    const [pokemon1, setPokemon1] = useState('');
    const [pokemon2, setPokemon2] = useState('');
    const [pokemon3, setPokemon3] = useState('');


    function handleSubmit(event) {
		event.preventDefault();
	}
    return(
        <div className={css(pageStyle.Page)}>
            <div  className={css(pageStyle.container)}></div>
            <div className= {css(pageStyle.form)} onSubmit={handleSubmit}> 
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Digite Seu Email" 
                        aria-describedby="basic-addon1"
		        	    value={treinador}
		        	    onChange={(e) => setPokemon1(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Digite Sua Senha"
                        ria-describedby="basic-addon1"
		        	    value={pokemon1}
		        	    onChange={(e) => setPokemon1(e.target.value)}             
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Logar
                  </Button>
                </Form>
            </div>
        </div>
    )
}
