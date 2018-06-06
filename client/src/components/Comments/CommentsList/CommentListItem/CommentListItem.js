import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { ListItem, ListItemText } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import { withStyles } from "material-ui/styles";

import styles from "./CommentListItem.styles";
import * as formatDate from "utilities/formatters/formatDate";
import defaultUserImage from "assets/images/defaultUser.png";
import CommentActions from "./CommentActions/CommentActions";

class CommentListItem extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string,
    canModify: PropTypes.bool,
    classes: PropTypes.object
  };

  state = {
    menuOpen: null,
    deleteDialogOpen: false,
    editDialogOpen: false
  };

  handleDeleteDialogClick = () => {
    this.setState({
      deleteDialogOpen: !this.state.deleteDialogOpen,
      menuOpen: null
    });
  };

  handleEditDialogClick = () => {
    this.setState({
      editDialogOpen: !this.state.editDialogOpen,
      menuOpen: null
    });
  };

  handleMenuClick = e => {
    this.setState({ menuOpen: e.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ menuOpen: null });
  };

  render() {
    const { comment, postId, canModify, classes } = this.props;
    const formattedDate = formatDate.getFullDate(comment.createdAt);
    const link = (
      <Fragment>
        <Link to={`/profile/${comment.author._id}`} className={classes.link}>
          {comment.author.firstName} {comment.author.lastName}
        </Link>{" "}
        {formattedDate}
      </Fragment>
    );

    return (
      <ListItem key={comment._id}>
        {comment.author.profilePictureUrl ? (
          <Avatar src={comment.author.profilePictureUrl} />
        ) : (
          <Avatar src={defaultUserImage} />
        )}
        <ListItemText primary={comment.content} secondary={link} />
        {canModify ? (
          <CommentActions
            handleMenuClose={this.handleMenuClose}
            handleMenuClick={this.handleMenuClick}
            menuOpen={this.state.menuOpen}
            handleEditDialogClick={this.handleEditDialogClick}
            handleDeleteDialogClick={this.handleDeleteDialogClick}
            deleteDialogOpen={this.state.deleteDialogOpen}
            editDialogOpen={this.state.editDialogOpen}
            comment={comment}
            postId={postId}
          />
        ) : null}
      </ListItem>
    );
  }
}

export default withStyles(styles)(CommentListItem);
