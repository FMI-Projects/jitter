import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import {
  DialogContentText,
  DialogTitle,
  DialogContent,
  DialogActions
} from "material-ui/Dialog";
import { withStyles } from "material-ui/styles";

import styles from "../ProfileModal.styles";

const welcome = props => (
  <Fragment>
    <DialogTitle className={props.classes.title} id="profile-dialog-title">
      Welcome to Jitter!
    </DialogTitle>
    <DialogContent className={props.classes.content}>
      <DialogContentText variant="body1">
        Please take a couple of minutes to set up your account. It will help
        others find out more about you easily.
      </DialogContentText>
    </DialogContent>
    <DialogActions className={props.classes.centered}>
      <Button color="default" onClick={props.onCancel}>
        Close
      </Button>
      <Button color="primary" onClick={props.onContinue}>
        Continue
      </Button>
    </DialogActions>
  </Fragment>
);

welcome.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(welcome);
