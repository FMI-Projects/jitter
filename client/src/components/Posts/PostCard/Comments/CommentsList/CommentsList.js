import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./CommentsList.styles";
import List, {
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

import * as formatDate from "utilities/formatters/formatDate";
import defaultUserImage from "assets/images/defaultUser.png";
import CommentForm from "../CommentForm/CommentForm";

class CommentsList extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
  };

  state = {
    menuOpen: null
  };

  handleMenuClick = e => {
    this.setState({ menuOpen: e.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ menuOpen: null });
  };

  render() {
    const { comments, classes, postId } = this.props;
    return (
      <div className={classes.root}>
        <List>
          {comments.map(comment => {
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
                <ListItemText
                  primary={comment.content}
                  secondary={secondaryText}
                />
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
                    <MenuItem>
                      <ListItemIcon>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Delete" />
                    </MenuItem>
                  </Menu>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
          <CommentForm postId={postId} formName={`createComment-${postId}`} />
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(CommentsList);
