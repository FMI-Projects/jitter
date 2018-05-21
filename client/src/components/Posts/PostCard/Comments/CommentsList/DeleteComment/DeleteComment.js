import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "store/actions";
import ConfirmationDialog from "components/UI/Dialogs/ConfirmationDialog/ConfirmationDialog";

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
    const { open, onClose } = this.props;
    return (
      <Fragment>
        <ConfirmationDialog
          open={open}
          onClose={onClose}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
        />
      </Fragment>
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
