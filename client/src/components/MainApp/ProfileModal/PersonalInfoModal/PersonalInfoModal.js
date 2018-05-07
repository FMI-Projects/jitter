import React, { Fragment } from "react";
// import PropTypes from "prop-types";
import { DialogTitle } from "material-ui/Dialog";

import PersonalInfoForm from "./PersonalInfoForm/PersonalInfoForm";
// import Spinner from "../../../UI/Spinner/Spinner";

const personalInfoModal = props => {
  return (
    <Fragment>
      <DialogTitle id="profile-dialog-title">
        Tell us more about you...
      </DialogTitle>
      <PersonalInfoForm />
    </Fragment>
  );
};

export default personalInfoModal;
