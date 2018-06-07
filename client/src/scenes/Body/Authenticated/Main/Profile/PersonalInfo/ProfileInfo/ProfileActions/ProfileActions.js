import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "store/actions";
import CurrentUserActions from "./CurrentUserActions/CurrentUserActions";
import StrangerActions from "./StrangerActions/StrangerActions";
import RequestAcceptedActions from "./RequestAcceptedActions/RequestAcceptedActions";
import RequestRequestedActions from "./RequestRequestedActions/RequestRequestedActions";
import RequestDeclinedActions from "./RequestDeclinedActions/RequestDeclinedActions";
import RequestPendingActions from "./RequestPendingActions/RequestPendingActions";

class PorfileActions extends Component {
  static propTypes = {
    friendship: PropTypes.object,
    currentUserId: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    sendFriendRequest: PropTypes.func.isRequired,
    acceptFriendRequest: PropTypes.func.isRequired,
    declineFriendRequest: PropTypes.func.isRequired,
    deleteFriend: PropTypes.func.isRequired
  };

  sendFriendRequest = () => {
    this.props.sendFriendRequest(this.props.profileId);
  };

  acceptFriendRequest = () => {
    this.props.acceptFriendRequest(this.props.profileId);
  };

  declineFriendRequest = () => {
    this.props.declineFriendRequest(this.props.profileId);
  };

  deleteFriend = () => {
    this.props.deleteFriend(this.props.profileId);
  };

  render() {
    let profileActions = null;

    if (this.props.currentUserId === this.props.profileId) {
      profileActions = <CurrentUserActions />;
    } else {
      if (!this.props.friendship) {
        profileActions = <StrangerActions addFriend={this.sendFriendRequest} />;
      } else {
        switch (this.props.friendship.get("status")) {
          case "Accepted":
            profileActions = (
              <RequestAcceptedActions removeFriend={this.deleteFriend} />
            );
            break;

          case "Requested":
            profileActions = (
              <RequestRequestedActions cancelRequest={this.deleteFriend} />
            );
            break;

          case "Declined":
            profileActions = <RequestDeclinedActions />;
            break;

          case "Pending":
            profileActions = (
              <RequestPendingActions
                acceptFriend={this.acceptFriendRequest}
                declineFriend={this.declineFriendRequest}
              />
            );
            break;

          default:
            profileActions = null;
        }
      }
    }

    return profileActions;
  }
}

const mapStateToProps = state => {
  const profileId = state.getIn(["profile", "profileId"]);
  const currentUserId = state.getIn(["auth", "userId"]);
  const friendship = state.getIn([
    "userProfile",
    "friendships",
    "byId",
    profileId
  ]);

  return {
    friendship,
    profileId,
    currentUserId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendFriendRequest: profileId =>
      dispatch(actions.userProfileSendFriendRequest(profileId)),
    acceptFriendRequest: profileId =>
      dispatch(actions.userProfileUpdateFriendRequest(profileId, "Accept")),
    declineFriendRequest: profileId =>
      dispatch(actions.userProfileUpdateFriendRequest(profileId, "Decline")),
    deleteFriend: profileId =>
      dispatch(actions.userProfileDeleteFriendRequest(profileId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PorfileActions);
