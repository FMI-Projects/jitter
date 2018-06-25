import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "store/actions";

class Logout extends Component {
  static propTypes = {
    onLogout: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/login" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.authLogout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
