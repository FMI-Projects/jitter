import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";

import styles from "./DeletePost.styles";
import * as actions from "store/actions";

class DeletePost extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    classes: PropTypes.object,
    postsDelete: PropTypes.func.isRequired,
    postId: PropTypes.string
  };

  handleDeleteClick = () => {
    this.props.postsDelete(this.props.postId);
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Button
          onClick={this.handleDeleteClick}
          variant="flat"
          className={classes.button}
        >
          Delete Post
        </Button>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postsDelete: postId => dispatch(actions.postsDelete(postId))
  };
};

export default connect(null, mapDispatchToProps)(
  withStyles(styles)(DeletePost)
);
