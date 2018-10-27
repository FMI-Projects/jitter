import React, { Fragment } from "react";
import PropTypes from "prop-types";

import {
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from "material-ui/List";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import DeleteComment from "./DeleteComment/DeleteComment";
import EditComment from "./EditComment/EditComment";

const commentActions = props => {
  return (
    <Fragment>
      <ListItemSecondaryAction>
        <IconButton onClick={props.handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={props.menuOpen}
          open={Boolean(props.menuOpen)}
          onClose={props.handleMenuClose}
        >
          <MenuItem onClick={props.handleEditDialogClick}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText inset primary="Edit" />
          </MenuItem>
          <MenuItem onClick={props.handleDeleteDialogClick}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText inset primary="Delete" />
          </MenuItem>
        </Menu>
        <DeleteComment
          onClose={props.handleDeleteDialogClick}
          open={props.deleteDialogOpen}
          commentId={props.comment._id}
          postId={props.comment.post}
        />
        <EditComment
          _id={props.comment._id}
          content={props.comment.content}
          open={props.editDialogOpen}
          onClose={props.handleEditDialogClick}
        />
      </ListItemSecondaryAction>
    </Fragment>
  );
};

commentActions.propTypes = {
  handleMenuClose: PropTypes.func.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
  menuOpen: PropTypes.object,
  handleEditDialogClick: PropTypes.func.isRequired,
  handleDeleteDialogClick: PropTypes.func.isRequired,
  deleteDialogOpen: PropTypes.bool.isRequired,
  editDialogOpen: PropTypes.bool.isRequired,
  comment: PropTypes.object.isRequired
};

export default commentActions;
