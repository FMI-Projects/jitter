import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Dialog, { DialogTitle, DialogActions } from "material-ui/Dialog";
import Button from "material-ui/Button";

const confirmationDialog = props => {
  const { open, onClose, handleCancel, handleOk } = props;
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="confirmation-dialog-title"
      >
        <DialogTitle>Are you sure you want to delete this comment?</DialogTitle>
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

confirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleOk: PropTypes.func.isRequired
};

export default confirmationDialog;
