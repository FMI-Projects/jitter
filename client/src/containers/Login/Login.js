import React, { Component } from "react";
import PropTypes from "prop-types";

import { authUser, authResetError } from "../../store/actions/authActions";
import { connect } from "react-redux";

import LoginForm from "../../components/Login/LoginForm";
import Spinner from "../../components/UI/Spinner/Spinner";

class Login extends Component {
  static propTypes = {
    authUser: PropTypes.func.isRequired,
    error: PropTypes.string,
    resetAuthError: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  componentWillUnmount() {
    this.props.resetAuthError();
  }

  submit = values => {
    const { email, password } = values;
    this.props.authUser(email, password);
  };

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return <LoginForm onSubmit={this.submit} errorMessage={this.props.error} />;
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authUser: (email, password) => dispatch(authUser(email, password)),
    resetAuthError: () => dispatch(authResetError())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
