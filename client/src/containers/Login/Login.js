import React, {Component} from "react";
import PropTypes from "prop-types";

import {Field, reduxForm} from "redux-form";

import {authUser} from "../../store/actions/authActions";
import {connect} from "react-redux";

class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    authUser: PropTypes.func.isRequired,
    error: PropTypes.string,
  };

  submit = values => {
    this.props.authUser(values);
  };

  errorMessage() {
    if (this.props.error) {
      return <div className="info-red">{this.props.error}</div>;
    }
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div className="form">
        <div className="container">
          <h2>Sign in</h2>
          <form onSubmit={handleSubmit(this.submit)}>
            <Field
              name="email"
              component="input"
              type="text"
              placeholder="Email"
            />
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="Password"
            />
            <button type="submit" className="blue">
              Sign in
            </button>
          </form>
          {this.errorMessage()}
        </div>
      </div>
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
    authUser: values => dispatch(authUser(values)),
  };
};

const reduxFormLogin = reduxForm({form: "login"})(Login);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormLogin);
