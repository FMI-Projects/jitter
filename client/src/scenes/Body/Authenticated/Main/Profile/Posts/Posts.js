import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PostsList from "components/Posts/PostsList/PostsList";

const posts = props => {
  const { postIds, currentUserId, profileId } = props;

  return <PostsList posts={postIds} canAddPost={currentUserId === profileId} />;
};

posts.propTypes = {
  profileId: PropTypes.string.isRequired,
  currentUserId: PropTypes.string.isRequired,
  postIds: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const postIds = state.getIn(["posts", "posts", "allIds"]);

  return {
    postIds,
    currentUserId: state.getIn(["auth", "userId"]),
    profileId: state.getIn(["profile", "profileId"])
  };
};

export default connect(mapStateToProps)(posts);
