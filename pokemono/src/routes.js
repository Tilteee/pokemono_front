import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './login/login'
import Perfil from './perfil/index'
export default function Routes(){
    return (
        <Router>
            <Switch>
                <Route exact path='/' component ={Login}/>
                <Route exact path='/perfil' component ={Perfil}/>
            </Switch>
        </Router>
    )
}