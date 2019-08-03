import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import Dialog from "material-ui/Dialog";

import PostForm from "components/Posts/PostForm/PostForm";
import styles from "./AddPost.styles";
import listStyles from "./PostsList.styles";

class AddPost extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
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

  render() {
    return (
      <Fragment>
        <Button
          className={this.props.classes.button}
          variant="raised"
          color="primary"
          type="button"
          onClick={this.openDialog}
        >
          Add Post
        </Button>
        <Dialog
          classes={{ paper: this.props.classes.dialog }}
          fullWidth={true}
          open={this.state.dialogOpen}
          onClose={this.closeDialog}
          aria-labelledby="post-form-dialog"
        >
          <PostForm
            formName="createPost"
            formTitle="Add post"
            onSubmitted={this.closeDialog}
          />
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles({ ...styles, ...listStyles })(AddPost);
