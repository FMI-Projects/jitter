import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  authRegisterInit,
  authResetError
} from "../../store/actions/authActions";
import RegisterForm from "../../components/Register/RegisterForm";
import Spinner from "../../components/UI/Spinner/Spinner";

class Register extends PureComponent {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    error: PropTypes.string,
    resetAuthError: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  componentWillUnmount() {
    this.props.resetAuthError();
  }

  handleRegister = values => {
    const { email, password, firstName, lastName } = values;
    this.props.registerUser(email, password, firstName, lastName);
  };

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return (
      <RegisterForm
        errorMessage={this.props.error}
        onSubmit={this.handleRegister}
      />
    );
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
    registerUser: (email, password, firstName, lastName) =>
      dispatch(authRegisterInit(email, password, firstName, lastName)),
    resetAuthError: () => dispatch(authResetError())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
