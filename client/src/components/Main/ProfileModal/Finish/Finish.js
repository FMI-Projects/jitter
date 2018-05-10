import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import {
  DialogContentText,
  DialogTitle,
  DialogContent,
  DialogActions
} from "material-ui/Dialog";

const finish = props => (
  <Fragment>
    <DialogTitle id="profile-dialog-title">That&#39;s all for now!</DialogTitle>
    <DialogContent>
      <DialogContentText variant="body1">
        We hope you have a great time connecting with people all around the
        world using Jitter.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="default" onClick={props.onCancel}>
        Close
      </Button>
    </DialogActions>
  </Fragment>
);

finish.propTypes = {
  onCancel: PropTypes.func.isRequired
};

export default finish;
