import React, { Component } from 'react';

import './index.less';  // 引入样式文件


class Home extends Component {

  jump = () => {
    console.log('跳转')
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="main">
        <div>我是首页2</div>
        <div onClick={this.jump}>跳转</div>
      </div>
    );
  }
}
export default Home;