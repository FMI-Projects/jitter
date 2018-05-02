import React from "react";
import PropTypes from "prop-types";
import {Field, reduxForm} from "redux-form";

import ValidatedField from "../Form/ValidatedField";
import {required, email} from "../../utilities/validation";

const loginForm = props => {
  let errorMessage;

  if (props.errorMessage) {
    errorMessage = <div className="info-red">{props.errorMessage}</div>;
  }

  return (
    <div className="form">
      <div className="container">
        <h2>Sign in</h2>
        {errorMessage}
        <form onSubmit={props.handleSubmit}>
          <Field
            name="email"
            component={ValidatedField}
            type="text"
            placeholder="Email"
            label="Email"
            validate={[required, email]}
          />
          <Field
            name="password"
            component={ValidatedField}
            type="password"
            label="Password"
            placeholder="Password"
            validate={[required]}
          />
          <button type="submit" className="blue">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

loginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default reduxForm({form: "login"})(loginForm);
