import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Batalha from './Components/batalha/batalha';
import Login from './Components/login/login'
import Perfil from './Components/perfil/index'
export default function Routes(){
    return (
        <Router>
            <Switch>
                <Route exact path='/' component ={Login}/>
                <Route exact path='/perfil' component ={Perfil}/>
                <Route exact path='/batalha' component ={Batalha}/>
            </Switch>
        </Router>
    )
}