import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProfileSearchItemContent from "./ProfileSearchItemContent";

const ProfileSearchItem = props => (
  <ProfileSearchItemContent profile={props.profile} />
);

ProfileSearchItem.propTypes = {
  profileId: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.getIn(["search", "profiles", ownProps.profileId])
  };
};

export default connect(mapStateToProps)(ProfileSearchItem);
