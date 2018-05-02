import React, {Component} from "react";
import PropTypes from "prop-types";

import {authUser} from "../../store/actions/authActions";
import {connect} from "react-redux";

import LoginForm from "../../components/Login/LoginForm";

class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    authUser: PropTypes.func.isRequired,
    error: PropTypes.string,
  };

  submit = values => {
    const {email, password} = values;
    this.props.authUser(email, password);
  };

  errorMessage() {
    if (this.props.error) {
      return <div className="info-red">{this.props.error}</div>;
    }
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <LoginForm
        handleSubmit={handleSubmit}
        submit={this.submit}
        errorMessage={this.errorMessage}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authUser: (email, password) => dispatch(authUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
