import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./store/actions";
import Layout from "./hoc/Layout/Layout";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Logout from "./containers/Logout/Logout";
import Welcome from "./containers/Welcome/Welcome";
import Home from "./containers/Home/Home";

class App extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onAuthenticated: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.onAuthenticated();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isAuthenticated && this.props.isAuthenticated) {
      this.props.onAuthenticated();
    }
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Welcome} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/" component={Home} />
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

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticated: () => dispatch(actions.userProfileGetInfo())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
