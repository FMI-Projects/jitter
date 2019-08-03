import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProfileInfo from "./ProfileInfo";

const PersonalInfo = props => {
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

PersonalInfo.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  bio: PropTypes.string,
  birthday: PropTypes.string,
  gender: PropTypes.string,
  profilePictureUrl: PropTypes.string
};

const mapStateToProps = state => {
  return {
    firstName: state.getIn(["profile", "firstName"]),
    lastName: state.getIn(["profile", "lastName"]),
    bio: state.getIn(["profile", "bio"]),
    birthday: state.getIn(["profile", "birthday"]),
    gender: state.getIn(["profile", "gender"]),
    profilePictureUrl: state.getIn(["profile", "profilePictureUrl"])
  };
};

export default connect(mapStateToProps)(PersonalInfo);
