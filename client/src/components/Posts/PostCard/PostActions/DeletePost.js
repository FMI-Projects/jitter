import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "store/actions";
import ConfirmationDialog from "components/UI/Dialogs/ConfirmationDialog/ConfirmationDialog";

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
    const { open, onClose } = this.props;
    return (
      <Fragment>
        <ConfirmationDialog
          open={open}
          onClose={onClose}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
          text="Are you sure you want to delete this post?"
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postsDelete: postId => dispatch(actions.postsDelete(postId))
  };
};

export default connect(null, mapDispatchToProps)(DeletePost);
