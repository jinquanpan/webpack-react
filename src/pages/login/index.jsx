import React, { Component } from 'react';
import './index.less'; // 引入样式文件

class Login extends Component {

  jump=()=> {
    console.log('跳转',sss)
    this.props.history.push('/')
  }
  render() {
    return (
      <div className="main">
        <div>标题</div>
        <img src={require('@/img/phone.png')} alt="" />
        <div onClick={this.jump}>跳转</div>
      </div>
    );
  }
}
export default Login;