import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form/immutable";

import * as actions from "store/actions";
import LoginForm from "./LoginForm";

const Login = props => {
  const { handleSubmit } = props;
  const submit = handleSubmit(actions.login);

  return (
    <LoginForm
      onSubmit={submit}
      error={props.error}
      submitting={props.submitting}
    />
  );
};

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({ form: "login" })(Login);
