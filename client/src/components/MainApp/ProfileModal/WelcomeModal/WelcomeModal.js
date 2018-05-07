import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import {
  DialogContentText,
  DialogTitle,
  DialogContent,
  DialogActions
} from "material-ui/Dialog";

const welcomeModal = props => (
  <Fragment>
    <DialogTitle id="profile-dialog-title">Welcome to Jitter!</DialogTitle>
    <DialogContent>
      <DialogContentText variant="body1">
        Please take a couple of minutes to set up your account. It will help
        others find out more about you easily.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="default" onClick={props.onCancel}>
        Close
      </Button>
      <Button color="primary" onClick={props.onContinue}>Continue</Button>
    </DialogActions>
  </Fragment>
);

welcomeModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired
};

export default welcomeModal;
