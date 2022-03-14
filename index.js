var a = 3;
console.log(a+2)
const b = () => (a + 4)
const arr = [1,2,3,4]
console.log(b(),...arr)
import './index.scss'

import React from "react";
import ReactDOM from "react-dom";
import App from "./src/app.jsx";
ReactDOM.render(<App />, document.getElementById("root"));