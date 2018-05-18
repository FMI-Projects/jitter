import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PostsList from "components/Posts/PostsList/PostsList";

const posts = props => {
  const {
    posts,
    firstName,
    lastName,
    profilePictureUrl,
    currentUserId,
    profileId
  } = props;

  const postsWithAuthor = posts.map(post => {
    return {
      ...post,
      author: { firstName, lastName, profilePictureUrl, _id: profileId }
    };
  });

  return (
    <PostsList
      posts={postsWithAuthor}
      canAddPost={currentUserId === profileId}
      currentUserId={currentUserId}
    />
  );
};

posts.propTypes = {
  profileId: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  profilePictureUrl: PropTypes.string,
  currentUserId: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    firstName: state.profile.firstName,
    lastName: state.profile.lastName,
    profilePictureUrl: state.profile.profilePictureUrl,
    currentUserId: state.auth.userId,
    profileId: state.profile.profileId
  };
};

export default connect(mapStateToProps)(posts);
