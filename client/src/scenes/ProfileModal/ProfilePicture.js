import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form/immutable";

import * as actions from "store/actions";
import ProfilePictureForm from "./ProfilePictureForm";

const ProfilePicture = props => {
  const { handleSubmit } = props;
  const submit = handleSubmit(actions.userProfilePicture);

  return (
    <ProfilePictureForm
      onSubmit={submit}
      onCancel={props.onCancel}
      error={props.error}
      submitting={props.submitting}
    />
  );
};

ProfilePicture.propTypes = {
  onCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({ form: "profilePicture" })(ProfilePicture);
