import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProfileSearch from "./ProfileSearch/ProfileSearch";

const ToolbarItems = props =>
  props.isAuthenticated ? <ProfileSearch /> : null;

ToolbarItems.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.getIn(["auth", "authenticated"])
  };
};

export default connect(mapStateToProps)(ToolbarItems);
