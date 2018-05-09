import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as actions from "../../store/actions";
import PostsList from "../../components/Posts/PostsList";

class Posts extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.object),
    profileId: PropTypes.string,
    profilePostsGet: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.profilePostsGet(this.props.profileId);
  }

  render() {
    const { posts } = this.props;

    return (
      <div>{this.props.profileId ? <PostsList posts={posts} /> : null}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.profile.posts,
    profileId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    profilePostsGet: profileId => dispatch(actions.profilePostsGet(profileId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
