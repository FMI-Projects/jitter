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
    likeColor,
    dislikeColor,
    likesCount,
    dislikesCount,
    classes
  } = props;

  return (
    <div className={classes.base}>
      <IconButton onClick={e => handleLikeClick("Like")} aria-label="Like">
        <ThumbUpIcon color={likeColor} />
      </IconButton>
      {likesCount}
      <IconButton onClick={e => handleLikeClick("Dislike")} aria-label="Like">
        <ThumbDownIcon color={dislikeColor} />
      </IconButton>
      {dislikesCount}
    </div>
  );
};

likesContent.propTypes = {
  handleLikeClick: PropTypes.func.isRequired,
  likeColor: PropTypes.string,
  dislikeColor: PropTypes.string,
  likesCount: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  dislikesCount: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(likesContent);
