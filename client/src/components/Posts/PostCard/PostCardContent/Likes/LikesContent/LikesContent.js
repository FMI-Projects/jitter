import React from "react";
import PropTypes from "prop-types";

import IconButton from "material-ui/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { withStyles } from "material-ui/styles";

import styles from "./LikesContent.styles";

const likesContent = props => {
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
        <ThumbUpIcon color={userReaction === "Like" ? "primary" : "default"} />
      </IconButton>
      {likesCount}
      <IconButton onClick={e => handleLikeClick("Dislike")} aria-label="Like">
        <ThumbDownIcon
          color={userReaction === "Dislike" ? "secondary" : "default"}
        />
      </IconButton>
      {dislikesCount}
    </div>
  );
};

likesContent.propTypes = {
  handleLikeClick: PropTypes.func.isRequired,
  likesCount: PropTypes.number.isRequired,
  dislikesCount: PropTypes.number.isRequired,
  userReaction: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(likesContent);
