import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "material-ui/styles";

import styles from "./CommentListItem.styles";
import * as formatDate from "utilities/formatters/formatDate";
import defaultUserImage from "assets/images/defaultUser.png";
import DeleteComment from "../DeleteComment/DeleteComment";
import EditComment from "../EditComment/EditComment";

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
        <Link to={`/profile/${comment.author._id}`}>
          {comment.author.profilePictureUrl ? (
            <Avatar src={comment.author.profilePictureUrl} />
          ) : (
            <Avatar src={defaultUserImage} />
          )}
        </Link>
        <ListItemText primary={comment.content} secondary={link} />
        {canModify ? (
          <Fragment>
            <ListItemSecondaryAction>
              <IconButton onClick={this.handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={this.state.menuOpen}
                open={Boolean(this.state.menuOpen)}
                onClose={this.handleMenuClose}
              >
                <MenuItem onClick={this.handleEditDialogClick}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Edit" />
                </MenuItem>
                <MenuItem onClick={this.handleDeleteDialogClick}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Delete" />
                </MenuItem>
              </Menu>
              <DeleteComment
                onClose={this.handleDeleteDialogClick}
                open={this.state.deleteDialogOpen}
                commentId={comment._id}
                postId={postId}
              />
              <EditComment
                _id={comment._id}
                content={comment.content}
                open={this.state.editDialogOpen}
                onClose={this.handleEditDialogClick}
              />
            </ListItemSecondaryAction>
          </Fragment>
        ) : null}
      </ListItem>
    );
  }
}

export default withStyles(styles)(CommentListItem);
