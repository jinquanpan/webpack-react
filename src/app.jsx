import React, { Component } from "react";
import './app.scss'
 
class App extends Component {
  // 切换登录模式
  changeLoginMode = (e) => {
    console.log(e);
    const body = document.getElementById("s")
    const dom = document.createElement("div")
    dom.innerText="666"
    dom.className="sss"
    body.appendChild(dom)
  }

    render() {
        return (
            <div class="ddd" id='s' onClick={this.changeLoginMode}>
                <h1> Hello 33</h1>
            </div>
        );
    }
}
 
export default App;