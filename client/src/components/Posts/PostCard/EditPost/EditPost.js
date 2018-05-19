import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";
import { MenuItem } from "material-ui/Menu";
import { withStyles } from "material-ui/styles";

import styles from "./EditPost.styles";
import PostForm from "../../PostForm/PostForm";

class EditPost extends Component {
  static propTypes = {
    classes: PropTypes.object,
    title: PropTypes.string,
    content: PropTypes.string,
    _id: PropTypes.string,
    closeMenu: PropTypes.func,
    imageUrl: PropTypes.string
  };

  state = {
    dialogOpen: false
  };

  openDialog = () => {
    this.setState({ dialogOpen: true });
  };

  closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  closeDialogWithMenu = () => {
    this.closeDialog();
    this.props.closeMenu();
  };

  render() {
    const { _id, title, content, imageUrl } = this.props;

    return (
      <MenuItem onClick={this.openDialog}>
        Edit post
        <Dialog
          fullWidth={true}
          open={this.state.dialogOpen}
          onClose={this.closeDialogWithMenu}
          aria-labelledby="post-form-dialog"
        >
          <PostForm
            _id={_id}
            formName="updatePost"
            title={title}
            content={content}
            imageUrl={imageUrl}
            formTitle="Edit post"
            onSubmitted={this.closeDialogWithMenu}
          />
        </Dialog>
      </MenuItem>
    );
  }
}

export default withStyles(styles)(EditPost);
