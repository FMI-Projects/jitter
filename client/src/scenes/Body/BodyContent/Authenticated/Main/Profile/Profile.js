import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Grid from "material-ui/Grid";

import { connect } from "react-redux";
import * as actions from "store/actions";
import PostsList from "components/Posts/PostsList/PostsList";
import Spinner from "components/UI/Spinner/Spinner";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

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
    currentUserId: PropTypes.string,
    match: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const profileId = this.props.match.params.id;
    this.props.profileGet(profileId);
    this.props.postsGet(profileId);
  }

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    const {
      posts,
      firstName,
      lastName,
      profilePictureUrl,
      birthday,
      gender,
      bio,
      profileId,
      currentUserId
    } = this.props;

    const profileInfo = (
      <ProfileInfo
        firstName={firstName}
        lastName={lastName}
        profilePictureUrl={profilePictureUrl}
        birthday={birthday}
        gender={gender}
        bio={bio}
        profileId={profileId}
        currentUserId={currentUserId}
        isCurrentUser={currentUserId === profileId}
      />
    );

    const postsWithAuthor = posts.map(post => {
      return {
        ...post,
        author: { firstName, lastName, profilePictureUrl, profileId }
      };
    });

    const postsList = (
      <PostsList
        posts={postsWithAuthor}
        canAddPost={currentUserId === profileId}
      />
    );

    return (
      <Grid container>
        <Grid item sm={3}>
          {profileInfo}
        </Grid>
        <Grid item sm={9}>
          {postsList}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    loading: state.posts.loading || state.profile.loading,
    currentUserId: state.auth.userId,
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
