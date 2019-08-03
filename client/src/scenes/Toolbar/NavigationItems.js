import React, { Fragment } from "react";
import { connect } from "react-redux";

import NavigationItem from "./NavigationItem";
import FriendRequests from "./Badges/FriendRequests/FriendRequests";

const NavigationItems = props => {
  let navigationItems = null;

  if (!props.isAuthenticated) {
    navigationItems = (
      <Fragment>
        <NavigationItem link="/login">Login</NavigationItem>
        <NavigationItem link="/register">Register</NavigationItem>
      </Fragment>
    );
  } else {
    navigationItems = (
      <Fragment>
        <FriendRequests />
        <NavigationItem link={`/profile/${props.userId}`}>
          My Profile
        </NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Fragment>
    );
  }

  return navigationItems;
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.getIn(["auth", "authenticated"]),
    userId: state.getIn(["auth", "userId"])
  };
};

export default connect(mapStateToProps)(NavigationItems);
