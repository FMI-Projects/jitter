import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import * as actions from "../../store/actions";
import RegisterForm from "../../components/Register/RegisterForm";

const register = props => {
  const { handleSubmit } = props;
  const submit = handleSubmit(actions.register);

  return (
    <RegisterForm
      onSubmit={submit}
      error={props.error}
      submitting={props.submitting}
    />
  );
};

register.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({ form: "register" })(register);
