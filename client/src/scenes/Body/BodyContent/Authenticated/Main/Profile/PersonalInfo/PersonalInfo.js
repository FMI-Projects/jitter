import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProfileInfo from "./ProfileInfo/ProfileInfo";

const personalInfo = props => {
  const {
    firstName,
    lastName,
    profilePictureUrl,
    birthday,
    gender,
    bio
  } = props;

  return (
    <ProfileInfo
      firstName={firstName}
      lastName={lastName}
      profilePictureUrl={profilePictureUrl}
      birthday={birthday}
      gender={gender}
      bio={bio}
    />
  );
};

personalInfo.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  bio: PropTypes.string,
  birthday: PropTypes.string,
  gender: PropTypes.string,
  profilePictureUrl: PropTypes.string
};

const mapStateToProps = state => {
  return {
    firstName: state.profile.firstName,
    lastName: state.profile.lastName,
    bio: state.profile.bio,
    birthday: state.profile.birthday,
    gender: state.profile.gender,
    profilePictureUrl: state.profile.profilePictureUrl
  };
};

export default connect(mapStateToProps)(personalInfo);
