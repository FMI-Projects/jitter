import React, {Component} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import * as actions from "../../store/actions";
import PostsList from "../../components/Posts/PostsList";

class Posts extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.object),
    profileId: PropTypes.string,
    userPostsGet: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    if (prevProps.profileId !== this.props.profileId) {
      this.props.userPostsGet(this.props.profileId);
    }
  }

  render() {
    const {posts} = this.props;

    return (
      <div>{this.props.profileId ? <PostsList posts={posts} /> : null}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    profileId: state.profile.profileId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userPostsGet: profileId => dispatch(actions.userPostsGet(profileId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
