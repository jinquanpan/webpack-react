import React from 'react';
import './index.scss'

class Login extends React.Component {
  btnfn = () => {
      console.log('跳转',process.env.NODE_ENV)
    this.props.history.push('/')
  }

  render() {
      return (
          <div onClick={this.btnfn} class="login">
              <a >回到login</a>
              <div>771112</div>
          </div>
      )
  }
}

export default Login
