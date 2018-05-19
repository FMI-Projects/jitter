import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dialog, { DialogTitle, DialogActions } from "material-ui/Dialog";
import Button from "material-ui/Button";

import * as actions from "store/actions";

class DeletePost extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    classes: PropTypes.object,
    postsDelete: PropTypes.func.isRequired,
    postId: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  handleCancel = () => {
    this.props.onClose();
  };

  handleOk = () => {
    this.props.postsDelete(this.props.postId);
    this.props.onClose();
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="confirmation-dialog-title"
      >
        <DialogTitle>Are you sure you want to delete post?</DialogTitle>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postsDelete: postId => dispatch(actions.postsDelete(postId))
  };
};

export default connect(null, mapDispatchToProps)(DeletePost);
