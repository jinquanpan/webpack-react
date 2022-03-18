import React, { Component } from 'react';
import { Route,HashRouter } from 'react-router-dom';
import Home from '../home/index.jsx';
import Login from '../login/index.jsx';

class App extends Component {
  render() {
    return (
      <HashRouter>
          <Route path='/' exact component={Home}></Route>
          <Route path='/login' exact component={Login}></Route>
      </HashRouter>
    )
  }
}

export default App;