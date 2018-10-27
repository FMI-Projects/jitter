import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import OnlineFriendContent from "./OnlineFriendContent/OnlineFriendContent";

const onlineFriend = props => (
  <OnlineFriendContent
    firstName={props.firstName}
    lastName={props.lastName}
    profilePictureUrl={props.profilePictureUrl}
  />
);

onlineFriend.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  profilePictureUrl: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  const onlineFriend = state.getIn([
    "onlineFriends",
    "onlineFriends",
    ownProps.id
  ]);

  return {
    firstName: onlineFriend.get("firstName"),
    lastName: onlineFriend.get("lastName"),
    profilePictureUrl: onlineFriend.get("profilePictureUrl")
  };
};

export default connect(mapStateToProps)(onlineFriend);
