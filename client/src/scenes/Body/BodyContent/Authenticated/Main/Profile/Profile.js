import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Grid from "material-ui/Grid";
import { connect } from "react-redux";

import * as actions from "store/actions";
import Posts from "./Posts/Posts";
import Spinner from "components/UI/Spinner/Spinner";
import PersonalInfo from "./PersonalInfo/PersonalInfo";

class Profile extends Component {
  static propTypes = {
    profileGet: PropTypes.func.isRequired,
    postsGet: PropTypes.func.isRequired,
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

    return (
      <Grid container>
        <Grid item sm={3}>
          <PersonalInfo />
        </Grid>
        <Grid item sm={9}>
          <Posts />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.posts.loading || state.profile.loading
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
