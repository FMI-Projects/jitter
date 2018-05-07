import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { DialogTitle } from "material-ui/Dialog";

import PersonalInfoForm from "./PersonalInfoForm/PersonalInfoForm";

const personalInfoModal = props => {
  return (
    <Fragment>
      <DialogTitle id="profile-dialog-title">
        Tell us more about you...
      </DialogTitle>
      <PersonalInfoForm errorMessage={props.error} onCancel={props.onCancel} onSubmit={props.onContinue} />
    </Fragment>
  );
};

personalInfoModal.propTypes = {
  error: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired
};

export default personalInfoModal;
