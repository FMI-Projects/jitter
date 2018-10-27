import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProfileSearch from "./ProfileSearch/ProfileSearch";

const toolbarItems = props =>
  props.isAuthenticated ? <ProfileSearch /> : null;

toolbarItems.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.getIn(["auth", "authenticated"])
  };
};

export default connect(mapStateToProps)(toolbarItems);
