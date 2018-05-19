import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";
import { withStyles } from "material-ui/styles";

import styles from "./EditPost.styles";
import PostForm from "../../PostForm/PostForm";

class EditPost extends Component {
  static propTypes = {
    classes: PropTypes.object,
    title: PropTypes.string,
    content: PropTypes.string,
    _id: PropTypes.string,
    imageUrl: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  render() {
    const { _id, title, content, imageUrl } = this.props;

    return (
      <Fragment>
        <Dialog
          fullWidth={true}
          open={this.props.open}
          onClose={this.props.onClose}
          aria-labelledby="post-form-dialog"
        >
          <PostForm
            _id={_id}
            formName="updatePost"
            title={title}
            content={content}
            imageUrl={imageUrl}
            formTitle="Edit post"
            onSubmitted={this.props.onClose}
          />
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(EditPost);
