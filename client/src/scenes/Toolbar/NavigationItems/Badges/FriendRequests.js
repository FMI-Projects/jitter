import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "store/actions";

class FriendRequests extends Component {
  static propTypes = {
    markFriendRequestsAsSeen: PropTypes.func.isRequired
  };

  render() {
    return (
      <button onClick={this.props.markFriendRequestsAsSeen}>CLICK ME</button>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    markFriendRequestsAsSeen: () =>
      dispatch(actions.userProfileMarkFriendshipsSeen())
  };
};

const mapStateToProps = state => {
  const pendingFriendships = state.userProfile.friendships.filter(
    f => f.status === "Pending"
  );
  const unseenFriendshipsCount = pendingFriendships.filter(
    f => f.seen === false
  ).length;

  return {
    pendingFriendships,
    unseenFriendshipsCount
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequests);
