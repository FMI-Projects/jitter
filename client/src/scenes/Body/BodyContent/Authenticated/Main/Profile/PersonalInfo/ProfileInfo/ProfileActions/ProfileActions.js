import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CurrentUserActions from "./CurrentUserActions/CurrentUserActions";
import StrangerActions from "./StrangerActions/StrangerActions";
import RequestAcceptedActions from "./RequestAcceptedActions/RequestAcceptedActions";
import RequestRequestedActions from "./RequestRequestedActions/RequestRequestedActions";
import RequestDeclinedActions from "./RequestDeclinedActions/RequestDeclinedActions";
import RequestPendingActions from "./RequestPendingActions/RequestPendingActions";

const profileActions = props => {
  let profileActions = null;

  if (props.currentUserId === props.profileId) {
    profileActions = <CurrentUserActions />;
  } else {
    if (!props.friendship) {
      profileActions = <StrangerActions />;
    } else {
      switch (props.friendship.status) {
        case "Accepted":
          profileActions = <RequestAcceptedActions />;
          break;

        case "Requested":
          profileActions = <RequestRequestedActions />;
          break;

        case "Declined":
          profileActions = <RequestDeclinedActions />;
          break;

        case "Pending":
          profileActions = <RequestPendingActions />;
          break;

        default:
          profileActions = null;
      }
    }
  }

  return profileActions;
};

profileActions.propTypes = {
  friendship: PropTypes.object,
  currentUserId: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const profileId = state.profile.profileId;
  const currentUserId = state.auth.userId;
  const friendship = state.userProfile.friendships.find(
    f => f.with._id === profileId
  );

  return {
    friendship,
    profileId,
    currentUserId
  };
};

export default connect(mapStateToProps)(profileActions);
