import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Dialog, { DialogTitle, DialogActions } from "material-ui/Dialog";
import Button from "material-ui/Button";

const ConfirmationDialog = props => {
  const { open, onClose, handleCancel, handleOk, text } = props;
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="confirmation-dialog-title"
      >
        <DialogTitle>{text}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleOk: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default ConfirmationDialog;
