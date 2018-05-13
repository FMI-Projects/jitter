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

import { formatDate } from "../../../../../utilities/formatters/formatDate";

import { withStyles } from "material-ui/styles";

const CommentsList = ({ comments, classes }) => {
  return (
    <div className={classes.root}>
      <List>
        {comments.map(comment => {
          const formattedDate = formatDate(comment.createdAt);
          const secondaryText = `${comment.author.firstName} ${
            comment.author.lastName
          },  ${formattedDate}`;
          return (
            <ListItem key={comment._id}>
              {comment.author.profilePictureUrl ? (
                <Avatar src={comment.author.profilePictureUrl} />
              ) : (
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  R
                </Avatar>
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
      </List>
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentsList);
