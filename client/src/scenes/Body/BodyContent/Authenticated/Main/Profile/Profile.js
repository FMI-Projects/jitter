import React, {Component} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import * as actions from "../../../../../../store/actions";
import PostsList from "../../../../../../components/Posts/PostsList";
import Spinner from "../../../../../../components/UI/Spinner/Spinner";

class Profile extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    posts: PropTypes.array,
    profileId: PropTypes.string,
    postsGet: PropTypes.func.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    profilePictureUrl: PropTypes.string
  };

  componentDidMount() {
    this.props.postsGet(this.props.profileId);
  }

  render() {
    let postsList = <Spinner />;

    if (!this.props.loading) {
      const {posts, firstName, lastName, profilePictureUrl} = this.props;

      const postsWithAuthor = posts.map(post => {
        return {...post, author: {firstName, lastName, profilePictureUrl}};
      });

      postsList = <PostsList posts={postsWithAuthor} />;
    }

    return <div>{postsList}</div>;
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    loading: state.posts.loading,
    profileId: state.auth.userId,
    firstName: state.userProfile.firstName,
    lastName: state.userProfile.lastName,
    profilePictureUrl: state.userProfile.profilePictureUrl
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postsGet: profileId => dispatch(actions.postsGet(profileId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
