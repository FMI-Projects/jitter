import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";

import PostForm from "../../PostForm/PostForm";

const editPost = props => {
  const { _id, title, content, imageUrl, open, onClose } = props;

  return (
    <Fragment>
      <Dialog
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

export default editPost;
