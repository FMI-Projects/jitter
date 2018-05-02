import React from "react";
import PropTypes from "prop-types";

import { Field, reduxForm } from "redux-form";

import ValidatedField from "../Form/ValidatedField";
import { required, email } from "../../utilities/validation";

const loginForm = props => {
  let errorMessage;

  if (this.props.error) {
    errorMessage = <div className="info-red">{this.props.error}</div>;
  }

  return (
    <div className="form">
      <div className="container">
        <h2>Sign in</h2>
        <form onSubmit={this.props.handleSubmit}>
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
        {errorMessage}
      </div>
    </div>
  );
};

loginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({ form: "login" })(loginForm);
