import React, {Component} from "react";
import {Route} from "react-router-dom";

import "./App.css";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

class App extends Component {
  render() {
    return (
      <div>
        <Register />

        <Route exact path="/login" component={Login} />
      </div>
    );
  }
}

export default App;
