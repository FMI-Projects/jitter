import React, { Component } from "react";
import PropTypes from "prop-types";

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

import * as formatDate from "utilities/formatters/formatDate";
import defaultUserImage from "assets/images/defaultUser.png";
import DeleteComment from "../DeleteComment/DeleteComment";

class CommentListItem extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string
  };

  state = {
    menuOpen: null,
    deleteDialogOpen: false
  };

  handleDeleteDialogClick = () => {
    this.setState({
      deleteDialogOpen: !this.state.deleteDialogOpen,
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
    const { comment, postId } = this.props;
    const formattedDate = formatDate.getFullDate(comment.createdAt);
    const secondaryText = `${comment.author.firstName} ${
      comment.author.lastName
    },  ${formattedDate}`;

    return (
      <ListItem key={comment._id}>
        {comment.author.profilePictureUrl ? (
          <Avatar src={comment.author.profilePictureUrl} />
        ) : (
          <Avatar src={defaultUserImage} />
        )}
        <ListItemText primary={comment.content} secondary={secondaryText} />
        <ListItemSecondaryAction>
          <IconButton onClick={this.handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={this.state.menuOpen}
            open={Boolean(this.state.menuOpen)}
            onClose={this.handleMenuClose}
          >
            <MenuItem>
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
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default CommentListItem;
