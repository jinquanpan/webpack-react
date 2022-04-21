import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';
import React, { Component } from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../home/index.jsx';
import Login from '../login/index.jsx';

Sentry.init({
  dsn: 'https://72552f7940e7478ea49ebb0a8fd705de@sentry.isjike.com/11', // c4e5aad16fc942bbaec0dd3ef3903a72由每个项目唯一生成。localhost:9000/5对应的是sentry的dns地址。
  integrations: [
    new Integrations.BrowserTracing()
  ],
  tracesSampleRate: 1.0,
  tracesSampler: 1.0,
  release: "1.1.6",
  environment:"production"
});

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