import React, {Component} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import * as actions from "../../../../../../store/actions";
import PostsList from "../../../../../../components/Posts/PostsList";

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
    const {posts, firstName, lastName, profilePictureUrl} = this.props;

    return (
      <div>
        {this.props.profileId ? (
          <PostsList
            posts={posts}
            firstName={firstName}
            lastName={lastName}
            profilePictureUrl={profilePictureUrl}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
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
