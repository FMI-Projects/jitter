import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import BodyContent from "./BodyContent";

const Body = props => (
  <BodyContent
    isAuthenticated={props.isAuthenticated}
    firstLogin={props.firstLogin}
  >
    {props.children}
  </BodyContent>
);

Body.propTypes = {
  children: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  firstLogin: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.getIn(["auth", "authenticated"]),
    firstLogin: state.getIn(["auth", "firstLogin"])
  };
};

export default connect(mapStateToProps)(Body);
