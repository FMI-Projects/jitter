import React, {Component} from "react";
import PropTypes from "prop-types";
import {Route, Switch, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import Layout from "./hoc/Layout/Layout";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

class App extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  render() {
    let routes = (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Dashboard} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated
  };
};

export default withRouter(connect(mapStateToProps)(App));
