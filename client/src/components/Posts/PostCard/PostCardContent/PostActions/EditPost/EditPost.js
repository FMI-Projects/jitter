import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";
import { withStyles } from "material-ui/styles";

import PostForm from "../../../../PostForm/PostForm";

import styles from "../../../../PostsList/PostsList.styles";

const editPost = props => {
  const { _id, title, content, imageUrl, open, onClose, classes } = props;

  return (
    <Fragment>
      <Dialog
        classes={{ paper: classes.dialog }}
        fullWidth={true}
        open={open}
        onClose={onClose}
        aria-labelledby="post-form-dialog"
      >
        <PostForm
          _id={_id}
          formName="updatePost"
          title={title}
          content={content}
          imageUrl={imageUrl}
          formTitle="Edit post"
          onSubmitted={onClose}
        />
      </Dialog>
    </Fragment>
  );
};

editPost.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  content: PropTypes.string,
  _id: PropTypes.string,
  imageUrl: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(editPost);
