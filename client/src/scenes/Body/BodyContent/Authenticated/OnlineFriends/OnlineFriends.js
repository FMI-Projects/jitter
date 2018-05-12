import React, { Component } from "react";

import OnlineFriendsList from "./OnlineFriendsList/OnlineFriendsList";

class OnlineFriends extends Component {
  render() {
    const testOnlineFriends = [
      {
        firstName: "Test",
        lastName: "LastName"
      },
      {
        firstName: "Test2",
        lastName: "LastName2"
      }
    ];

    return <OnlineFriendsList friends={testOnlineFriends} />;
  }
}

export default OnlineFriends;
