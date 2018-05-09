import React, {Fragment} from "react";
import {connect} from "react-redux";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
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
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Fragment>
    );
  }

  return navigationItems;
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(navigationItems);
