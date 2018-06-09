import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostCardContent from "./PostCardContent/PostCardContent";

const postCard = props => (
  <PostCardContent
    post={props.post}
    canModify={props.canModify}
  />
);

postCard.propTypes = {
  post: PropTypes.object.isRequired,
  canModify: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const post = state
    .getIn(["posts", "posts", "byId", ownProps.post])
    .set(
      "author",
      state.getIn([
        "posts",
        "authors",
        state.getIn(["posts", "posts", "byId", ownProps.post, "author"])
      ])
    );

  return {
    post,
    canModify: state.getIn(["auth", "userId"]) === post.getIn(["author", "_id"])
  };
};

export default connect(mapStateToProps)(postCard);
