import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dialog, { DialogTitle, DialogActions } from "material-ui/Dialog";
import Button from "material-ui/Button";

import * as actions from "store/actions";

class DeleteComment extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    commentsDelete: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    postId: PropTypes.string,
    commentId: PropTypes.string,
    open: PropTypes.bool
  };

  handleCancel = () => {
    this.props.onClose();
  };

  handleOk = () => {
    this.props.commentsDelete(this.props.postId, this.props.commentId);
    this.props.onClose();
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="confirmation-dialog-title"
      >
        <DialogTitle>Are you sure you want to delete this comment?</DialogTitle>
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
    commentsDelete: (postId, commentId) =>
      dispatch(actions.commentsDelete(postId, commentId))
  };
};

export default connect(null, mapDispatchToProps)(DeleteComment);
