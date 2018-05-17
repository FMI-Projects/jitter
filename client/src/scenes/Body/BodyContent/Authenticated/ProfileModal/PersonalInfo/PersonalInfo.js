import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import * as actions from "store/actions";
import PersonalInfoForm from "./PersonalInfoForm/PersonalInfoForm";

const personalInfo = props => {
  const { handleSubmit } = props;
  const submit = handleSubmit(actions.userProfilePatch);

  return (
    <PersonalInfoForm
      onSubmit={submit}
      onCancel={props.onCancel}
      error={props.error}
      submitting={props.submitting}
    />
  );
};

personalInfo.propTypes = {
  onCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({ form: "personalInfo" })(personalInfo);
