import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import OnlineFriendContent from "./OnlineFriendContent";

const OnlineFriend = props => (
  <OnlineFriendContent
    _id={props._id}
    firstName={props.firstName}
    lastName={props.lastName}
    profilePictureUrl={props.profilePictureUrl}
  />
);

OnlineFriend.propTypes = {
  _id: PropTypes.string.isRequired,
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
    _id: onlineFriend.get("_id"),
    firstName: onlineFriend.get("firstName"),
    lastName: onlineFriend.get("lastName"),
    profilePictureUrl: onlineFriend.get("profilePictureUrl")
  };
};

export default connect(mapStateToProps)(OnlineFriend);
