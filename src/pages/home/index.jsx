import React, { Component } from 'react';
import './index.less'; // 引入样式文件



class Home extends Component {

  jump = () => {
    this.props.history.push('/login')
  }

  toke = ()=>{
    localStorage.setItem("token",123);
    console.log('登陆')
    this.jump()
  }

  exit =()=>{
    localStorage.removeItem("token");
    console.log('退出')
  }

  error= ()=> {
    console.log(xll)
  }

  render() {
    return (
      <div className="main">
        <div>我是首页2</div>
        <div onClick={this.jump}>跳转</div>
        <div onClick={this.toke}>登陆</div>
        <div onClick={this.exit}>退出</div>
        <div onClick={this.error}>报错</div>
      </div>
    );
  }
}
export default Home;