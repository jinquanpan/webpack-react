import React, { Component } from 'react';
import './index.less';  // 引入样式文件

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aa:111
    };
  }
  render() {
    return (
      <div className="main">
        <div>我是首页</div>
        <div>{this.state.aa}</div>
      </div>
    );
  }
}
export default App;