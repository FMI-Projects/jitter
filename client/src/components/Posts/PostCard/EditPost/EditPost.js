import React, {Fragment, Component} from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";
import Button from "material-ui/Button";
import {withStyles} from "material-ui/styles";

import styles from "./EditPost.styles";
import PostForm from "../../PostForm/PostForm";

class EditPost extends Component {
  static propTypes = {
    classes: PropTypes.object,
    title: PropTypes.string,
    content: PropTypes.string,
    imageUrl: PropTypes.string,
    dialogOpen: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    closeMenu: PropTypes.func
  };

  state = {
    dialogOpen: false
  };

  openDialog = () => {
    this.setState({dialogOpen: true});
  };

  closeDialog = () => {
    this.setState({dialogOpen: false});
  };

  render() {
    const {title, content, classes} = this.props;

    return (
      <Fragment>
        <Button
          variant="flat"
          className={classes.button}
          onClick={this.openDialog}>
          Edit post
        </Button>
        <Dialog
          fullWidth={true}
          open={this.state.dialogOpen}
          onClose={e => {
            this.closeDialog(e);
            if (this.props.closeMenu) {
              this.props.closeMenu(e);
            }
          }}
          aria-labelledby="post-form-dialog">
          <PostForm
            title={title}
            content={content}
            formTitle="Edit post"
            onSubmitted={this.closeDialog}
          />
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(EditPost);
