import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "store/actions";
import FriendRequestBadge from "./FriendRequestBadge/FriendRequestBadge";
import FriendRequestsList from "./FriendRequestsList/FriendRequestsList";
import * as friendshipSelectors from "store/reducers/selectors/friendshipSelectors";

class FriendRequests extends Component {
  static propTypes = {
    markFriendRequestsAsSeen: PropTypes.func.isRequired,
    unseenFriendshipsCount: PropTypes.number.isRequired,
    pendingFriendshipsWith: PropTypes.object.isRequired,
    acceptFriendRequest: PropTypes.func.isRequired,
    declineFriendRequest: PropTypes.func.isRequired
  };

  state = {
    menuAnchor: null
  };

  openFriendRequestsList = event => {
    this.props.markFriendRequestsAsSeen();
    this.setState({ menuAnchor: event.currentTarget });
  };

  closeFriendRequestsList = () => {
    this.setState({ menuAnchor: null });
  };

  render() {
    return (
      <Fragment>
        <FriendRequestBadge
          unseenFriendshipsCount={this.props.unseenFriendshipsCount}
          onClick={this.openFriendRequestsList}
        />
        <FriendRequestsList
          anchorElement={this.state.menuAnchor}
          onClose={this.closeFriendRequestsList}
          friendRequests={this.props.pendingFriendshipsWith}
          onAccept={this.props.acceptFriendRequest}
          onDecline={this.props.declineFriendRequest}
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    markFriendRequestsAsSeen: () =>
      dispatch(actions.userProfileMarkFriendshipsSeen()),
    acceptFriendRequest: profileId =>
      dispatch(actions.userProfileUpdateFriendRequest(profileId, "Accept")),
    declineFriendRequest: profileId =>
      dispatch(actions.userProfileUpdateFriendRequest(profileId, "Decline"))
  };
};

const mapStateToProps = state => {
  const pendingFriendshipsWith = friendshipSelectors.pendingFriendshipsWithSelector(
    state
  );
  const unseenFriendshipsCount = friendshipSelectors.unseenFriendshipsCountSelector(
    state
  );

  return {
    pendingFriendshipsWith,
    unseenFriendshipsCount
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendRequests);
