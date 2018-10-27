import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PostsList from "components/Posts/PostsList/PostsList";

const newsFeed = props => {
  const { postIds } = props;

  return <PostsList posts={postIds} />;
};

newsFeed.propTypes = {
  postIds: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const postIds = state.getIn(["posts", "posts", "allIds"]);

  return {
    postIds
  };
};

export default connect(mapStateToProps)(newsFeed);
