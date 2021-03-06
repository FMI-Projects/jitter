import React from "react";
import PropTypes from "prop-types";

import IconButton from "material-ui/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { withStyles } from "material-ui/styles";

import styles from "./LikesContent.styles";

const LikesContent = props => {
  const {
    handleLikeClick,
    userReaction,
    likesCount,
    dislikesCount,
    classes
  } = props;

  return (
    <div className={classes.base}>
      <IconButton onClick={e => handleLikeClick("Like")} aria-label="Like">
        <ThumbUpIcon color={userReaction === "Like" ? "primary" : "inherit"} />
      </IconButton>
      {likesCount}
      <IconButton onClick={e => handleLikeClick("Dislike")} aria-label="Like">
        <ThumbDownIcon
          color={userReaction === "Dislike" ? "secondary" : "inherit"}
        />
      </IconButton>
      {dislikesCount}
    </div>
  );
};

LikesContent.propTypes = {
  handleLikeClick: PropTypes.func.isRequired,
  likesCount: PropTypes.number.isRequired,
  dislikesCount: PropTypes.number.isRequired,
  userReaction: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LikesContent);
