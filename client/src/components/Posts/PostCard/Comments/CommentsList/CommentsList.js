import React from "react";
import PropTypes from "prop-types";
import styles from "./CommentsList.styles";
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "material-ui/styles";

import * as formatDate from "utilities/formatters/formatDate";
import defaultUserImage from "assets/images/defaultUser.png";
import CommentForm from "../CommentForm/CommentForm";

const commentsList = ({ comments, classes, postId }) => {
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
                <IconButton aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="Icon">
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
        <CommentForm postId={postId} formName={`createComment-${postId}`} />
      </List>
    </div>
  );
};

commentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

export default withStyles(styles)(commentsList);
