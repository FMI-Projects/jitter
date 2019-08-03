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

import styles from "./ProfileModal.styles";

const Finish = props => (
  <Fragment>
    <DialogTitle className={props.classes.title} id="profile-dialog-title">
      That&#39;s all for now!
    </DialogTitle>
    <DialogContent className={props.classes.content}>
      <DialogContentText variant="body1">
        We hope you have a great time connecting with people all around the
        world using Jitter.
      </DialogContentText>
    </DialogContent>
    <DialogActions className={props.classes.centered}>
      <Button color="default" onClick={props.onCancel}>
        Close
      </Button>
    </DialogActions>
  </Fragment>
);

Finish.propTypes = {
  onCancel: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Finish);
