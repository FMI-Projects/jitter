import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./PostActions.styles";
import { withStyles } from "material-ui/styles";

import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import EditPost from "../EditPost/EditPost";
import DeletePost from "../DeletePost/DeletePost";

const postActions = props => {
  return (
    <Fragment>
      <IconButton onClick={props.handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={props.menuOpen}
        open={Boolean(props.menuOpen)}
        onClose={props.handleMenuClose}
        PaperProps={{ style: props.classes.menu }}
      >
        <MenuItem onClick={props.handleEditDialogClick}>Edit post</MenuItem>
        <MenuItem onClick={props.handleDeleteDialogClick}>Delete post</MenuItem>
      </Menu>
      <EditPost
        onClose={props.handleEditDialogClick}
        open={props.editDialogOpen}
        _id={props.post._id}
        closeMenu={props.handleMenuClose}
        title={props.post.title}
        content={props.post.content}
        imageUrl={props.post.imageUrl}
      />
      <DeletePost
        onClose={props.handleDeleteDialogClick}
        open={props.deleteDialogOpen}
        postId={props.post._id}
      />
    </Fragment>
  );
};

postActions.propTypes = {
  handleMenuClick: PropTypes.func.isRequired,
  handleMenuClose: PropTypes.func.isRequired,
  menuOpen: PropTypes.object,
  handleEditDialogClick: PropTypes.func.isRequired,
  handleDeleteDialogClick: PropTypes.func.isRequired,
  editDialogOpen: PropTypes.bool.isRequired,
  deleteDialogOpen: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(postActions);
