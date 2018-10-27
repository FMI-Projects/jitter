import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import OnlineFriendsList from "./OnlineFriendsList/OnlineFriendsList";

class OnlineFriends extends Component {
  static propTypes = {
    onlineFriends: PropTypes.object.isRequired
  };

  render() {
    return <OnlineFriendsList friends={this.props.onlineFriends} />;
  }
}

const mapStateToProps = state => {
  return {
    onlineFriends: state.getIn(["onlineFriends", "onlineFriendsList"])
  };
};

export default connect(mapStateToProps)(OnlineFriends);
