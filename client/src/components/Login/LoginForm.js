import React from "react";
import PropTypes from "prop-types";

import {Field, reduxForm} from "redux-form";

import ValidatedField from "../Form/ValidatedField";
import {required, email, passwordsMustMatch} from "../../utilities/validation";

const loginForm = props => {
  return (
    <div className="form">
      <div className="container">
        <h2>Sign in</h2>
        <form onSubmit={this.props.handleSubmit(this.props.submit)}>
          <Field
            name="email"
            component={ValidatedField}
            type="text"
            placeholder="Email"
            validate={[required, email]}
          />
          <Field
            name="password"
            component={ValidatedField}
            type="password"
            placeholder="Password"
            validate={[required]}
          />
          <button type="submit" className="blue">
            Sign in
          </button>
        </form>
        {this.props.errorMessage()}
      </div>
    </div>
  );
};

loginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({form: "login"})(loginForm);
