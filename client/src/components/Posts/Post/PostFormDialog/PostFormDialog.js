import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import styles from "./PostFormDialog.styles";

import {withStyles} from "material-ui/styles";
import Dialog from "material-ui/Dialog";
import PostForm from "./PostForm/PostForm";
import Button from "material-ui/Button";

class PostFormDialog extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    error: PropTypes.string,
    submitting: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired
  };

  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  closeDialog = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <Fragment>
        <Button
          className={this.props.classes.button}
          variant="raised"
          color="primary"
          type="button"
          onClick={this.handleClickOpen}>
          Add Post
        </Button>
        <Dialog
          fullWidth={true}
          open={this.state.open}
          onClose={this.closeDialog}
          aria-labelledby="post-form-dialog">
          <PostForm
            onSubmit={this.props.submit}
            error={this.props.error}
            submitting={this.props.submitting}
          />
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(PostFormDialog);
