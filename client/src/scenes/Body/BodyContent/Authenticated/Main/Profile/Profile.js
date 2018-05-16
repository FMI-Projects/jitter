import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

import {connect} from "react-redux";
import * as actions from "../../../../../../store/actions";
import PostsList from "../../../../../../components/Posts/PostsList";
import Spinner from "../../../../../../components/UI/Spinner/Spinner";

class Profile extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    profileGet: PropTypes.func.isRequired,
    postsGet: PropTypes.func.isRequired,
    posts: PropTypes.array,
    profileId: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    profilePictureUrl: PropTypes.string,
    birthday: PropTypes.string,
    gender: PropTypes.string,
    bio: PropTypes.string,
    match: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const profileId = this.props.match.params.id;
    this.props.profileGet(profileId);
    this.props.postsGet(profileId);
  }

  render() {
    let postsList = <Spinner />;

    if (!this.props.loading) {
      const {
        posts,
        firstName,
        lastName,
        profilePictureUrl,
        profileId
      } = this.props;

      const postsWithAuthor = posts.map(post => {
        return {
          ...post,
          author: {firstName, lastName, profilePictureUrl, profileId}
        };
      });

      postsList = <PostsList posts={postsWithAuthor} />;
    }

    return <div>{postsList}</div>;
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    loading: state.posts.loading && state.profile.loading,
    profileId: state.profile.profileId,
    firstName: state.profile.firstName,
    lastName: state.profile.lastName,
    bio: state.profile.bio,
    birthday: state.profile.birthday,
    gender: state.profile.gender,
    profilePictureUrl: state.userProfile.profilePictureUrl
  };
};

const mapDispatchToProps = dispatch => {
  return {
    profileGet: profileId => dispatch(actions.profileGet(profileId)),
    postsGet: profileId => dispatch(actions.postsGet(profileId))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
