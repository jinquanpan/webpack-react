import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Home from './pages/home/index.jsx'
import Login from './pages/login/index.jsx'


const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;