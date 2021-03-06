import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";

import CommentForm from "components/Comments/CommentForm/CommentForm";

const EditComment = props => {
  const { open, _id, content, onClose } = props;
  return (
    <Fragment>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={onClose}
        aria-labelledby="comment-form-dialog"
      >
        <CommentForm
          _id={_id}
          formName={`editComment-${_id}`}
          content={content}
          formTitle="Edit comment"
          onSubmitted={onClose}
          annotation="Edit comment"
        />
      </Dialog>
    </Fragment>
  );
};

EditComment.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  content: PropTypes.string
};

export default EditComment;
