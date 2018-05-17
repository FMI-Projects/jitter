import React, {Fragment, Component} from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";

import styles from "./EditPost.styles";
import PostForm from "../../PostForm/PostForm";

class EditPost extends Component {
  static propTypes = {
    classes: PropTypes.object,
    title: PropTypes.string,
    content: PropTypes.string,
    imageUrl: PropTypes.string,
    dialogOpen: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired
  };

  render() {
    const {dialogOpen, title, content, imageUrl, closeDialog} = this.props;

    return (
      <Fragment>
        <Dialog
          fullWidth={true}
          open={dialogOpen}
          onClose={closeDialog}
          aria-labelledby="post-form-dialog">
          <PostForm
            title={title}
            content={content}
            imageUrl={imageUrl}
            formTitle="Edit post"
            onSubmitted={closeDialog}
          />
        </Dialog>
      </Fragment>
    );
  }
}

export default EditPost;
