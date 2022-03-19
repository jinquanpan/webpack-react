import React, { Component } from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../home/index.jsx';
import Login from '../login/index.jsx';

class App extends Component {
  state = {
    location: {
        pathname: window.location.hash.slice(1), // #/user
        state:window.history.state
    }
  }
  //组件挂载完成之后，根据hash改变pathname的值
  componentDidMount(){
    let that = this
    window.addEventListener('hashchange',event =>{
      that.setState({
        ...that.state,
        location: {
            ...that.state.location,
            pathname:window.location.hash.slice(1) 
        }
      })
      console.log('跳转',window.location.hash || '/')
    })
  }
  render() {
    const token = localStorage.getItem("token")
    console.log({token})
    return (
      <HashRouter>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          {
            token ?
            (<Route path='/login' exact component={Login}></Route>) :
             null
          }
          <Redirect from="*" to='/' />
        </Switch>
      </HashRouter>
    )
  }
}

export default App;