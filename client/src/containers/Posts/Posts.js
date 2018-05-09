import React, {Component} from "react";
import PropTypes from "prop-types";
// import styles from "./Posts.css";

import {connect} from "react-redux";
import * as actions from "../../store/actions";
import PostsList from "../../components/Posts/PostsList";

class Posts extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.object,
    userPostsGet: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.userPostsGet();
  }

  render() {
    const {posts, user} = this.props;
    return <PostsList posts={posts} user={user} />;
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    user: {
      firstName: state.profile.firstName,
      lastName: state.profile.lastName,
      avatar: state.profile.profilePictureUrl
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userPostsGet: () => dispatch(actions.userPostsGet())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
