import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import BodyContent from "./BodyContent";

const body = props => (
  <BodyContent
    isAuthenticated={props.isAuthenticated}
    firstLogin={props.firstLogin}
  >
    {props.children}
  </BodyContent>
);

body.propTypes = {
  children: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  firstLogin: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated,
    firstLogin: state.auth.firstLogin
  };
};

export default connect(mapStateToProps)(body);
